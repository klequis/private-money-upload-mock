import cors from 'cors'
import formidable from '../formidable/src'
import path from 'path'
import * as R from 'ramda'
import { logRequest, yellow, green, blue } from './logger'

const port = 3030

const app = require('express')()
app.use(cors())

/* original */
app.post('/api/upload', async function (req, res) {
  const uploadDir = path.join(__dirname, '../uploads')
  const form = formidable({
    filter: function ({ name, originalFilename, mimetype }) {
      return mimetype && mimetype.includes('text/csv')
    },
    multiples: true,
    uploadDir: uploadDir // - doesn't work :(
  })

  const a = await new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject(err)
        return
      }
      resolve({ fields, files, uploadDir })
    })
  })
  const { fields, files } = a
  const r = files.uploadedFiles.map((f) => {
    return {
      lastModifiedDate: f.lastModifiedDate,
      filePath: f.filepath,
      newFilename: f.newFilename,
      originalFilename: f.originalFilename,
      acctId: fields[f.originalFilename][1]
    }
  })
  res.json(r.map((f) => f.originalFilename))

  form.on('error', function (error) {
    console.log('err', err)
  })
})

/* From example
app.post('/api/upload', function (req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: `uploads`,
    keepExtensions: true,
    filter: function ({ name, originalFilename, mimetype }) {
      // keep only images
      return mimetype && mimetype.includes('image')
    }
  })

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err)
      res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' })
      res.end(String(err))
      return
    }
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ fields, files }, null, 2))
  })

  return
})
*/

/*
    Add for testing with Formidable example
*/

app.get('/', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(`
    <h2>With Node.js <code>"http"</code> module</h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `)
})

app.get('/api/test', async (req, res, next) => {
  res.json({ result: 'success' })
})

app.use(function (error, req, res, next) {
  res.json({ message: error.message })
})

app.listen(port, () => {
  console.log(`Events API is listening on port ${port}`)
})
