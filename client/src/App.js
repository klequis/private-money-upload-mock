import { useState } from 'react'
import axios from 'axios'
import { Grid } from 'components/Grid'
import { accounts } from './accounts'
import { AccountDropzone } from 'AccountDropzone'
import * as R from 'ramda'

const setWasUploaded = (file, names) => {
  const { name } = file
  const a = R.any((n) => n === name)(names)
  file.wasUploaded = a
  return file
}

/*
    progress: { filename: String, progressNum: Number }
*/
export const App = () => {
  const [_fileList, _setFileList] = useState([])
  const [_progress, _setProgress] = useState({})

  const _addFiles = (file) => {
    _setFileList(R.concat(file, _fileList))
  }

  const _acceptedLength = _fileList.length

  const onProgress = (filename, progressNum) => {
    // console.log('***** _progress', _progress)
    // _setProgress(R.merge(_progress, { filename, progressNum }))
    _setProgress({ filename, progressNum })
  }

  const options = (file) => {
    return {
      onUploadProgress: ({ total, loaded }) =>
        onProgress(file.name, Math.round((loaded / total) * 100).toFixed(2))
    }
  }

  const _uploadClick = async () => {
    if (_acceptedLength === 0) return

    const allAcceptedFiles = _fileList.filter((f) => f.accepted)
    // options

    // promise.all
    const result = await Promise.all(
      allAcceptedFiles.map((f) => {
        const options = {
          onUploadProgress: ({ total, loaded }) => {
            // console.log('----------------------------------------------')
            return onProgress(
              f.name,
              Math.round((loaded / total) * 100).toFixed(2)
            )
          }
        }

        const formData = new FormData()
        formData.append('uploadedFiles', f)
        formData.append(f.name, f.name)
        formData.append(f.name, f.acctId)
        return axios.post('http://localhost:3030/api/upload', formData, options)
      })
    )

    const uploadedFileNames = result.map((x) => x.data.result)
    // console.log('uploadedFileNames', uploadedFileNames)

    const newFileList = R.map(
      (f) => setWasUploaded(f, uploadedFileNames),
      _fileList
    )
    _setFileList(newFileList)
  }

  // console.log('_fileList', _fileList)
  console.log('1. App: _progress', _progress)
  // console.log('_uploadedFiles', _uploadedFiles)
  return (
    <div>
      <button onClick={_uploadClick}>Upload</button>
      <Grid>
        {accounts.map((a) => (
          <AccountDropzone
            key={a.acctId}
            account={a}
            files={_fileList}
            addFiles={_addFiles}
            progress={_progress}
          />
        ))}
      </Grid>
    </div>
  )
}

export default App
