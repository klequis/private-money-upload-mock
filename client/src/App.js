import { useState } from 'react'
import { Grid } from 'components/Grid'
import { accounts } from './accounts'
import { AccountDropzone } from 'AccountDropzone'
import { upload } from './upload'
import * as R from 'ramda'

// const _addWasUploadedProp = (allFiles, uploadedFiles) => {
//   const acceptedFiles = R.filter((x) => x.accepted, files)
//   const names = R.map((x) => x.name, acceptedFiles)
// }

const p = (file, names) => {
  const { name } = file
  const a = R.any((n) => n === name)(names)
  file.wasUploaded = a
  return file
}

export const App = () => {
  const [_fileList, _setFileList] = useState([])
  // const [_uploadedFiles, _setUploadedFiles] = useState([])

  const _addFiles = (file) => {
    _setFileList(R.concat(file, _fileList))
  }

  const _acceptedLength = _fileList.length

  const _uploadClick = async () => {
    if (_acceptedLength > 0) {
      const files = _fileList.filter((f) => f.accepted)
      const r = await upload(files)
      const acceptedFiles = R.filter((x) => x.accepted, files)
      const names = R.map((x) => x.name, acceptedFiles)
      const d = R.map((f) => p(f, names), _fileList)
      console.log('d', d)

      // _setUploadedFiles(a)
    }
  }
  console.log('_fileList', _fileList)
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
            // uploadedFiles={_uploadedFiles}
          />
        ))}
      </Grid>
    </div>
  )
}

export default App
