import { useState } from 'react'
import { Grid } from 'components/Grid'
import { accounts } from './accounts'
import { AccountDropzone } from 'AccountDropzone'
import { upload } from './upload'
import * as R from 'ramda'

const setWasUploaded = (file, names) => {
  const { name } = file
  const a = R.any((n) => n === name)(names)
  file.wasUploaded = a
  return file
}

export const App = () => {
  const [_fileList, _setFileList] = useState([])

  const _addFiles = (file) => {
    _setFileList(R.concat(file, _fileList))
  }

  const _acceptedLength = _fileList.length

  const _uploadClick = async () => {
    if (_acceptedLength > 0) {
      // get [] of all files where accepted === true, i.e., not rejected based on file extension
      const allAcceptedFiles = _fileList.filter((f) => f.accepted)
      // returns [] of only the files the server accepted. It checks mimetype.
      const uploadedFileNames = await upload(allAcceptedFiles)
      // console.log('uploadedFiles', uploadedFiles)
      // The returned object for each uploaded file has .originalFilename, not .name as a File object does.
      // const uploadedFileNames = R.map((x) => x.originalFilename, uploadedFiles)
      console.log('uploadedFileNames', uploadedFileNames)
      return
      const newFileList = R.map(
        (f) => setWasUploaded(f, uploadedFileNames),
        _fileList
      )
      _setFileList(newFileList)
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
          />
        ))}
      </Grid>
    </div>
  )
}

export default App
