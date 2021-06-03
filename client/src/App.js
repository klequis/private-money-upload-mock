import { useState } from 'react'
import { Grid } from 'components/Grid'
import { accounts } from './accounts'
import { AccountDropzone } from 'AccountDropzone'
import { upload } from './upload'
import * as R from 'ramda'

export const App = () => {
  const [_fileList, _setFileList] = useState([])
  const _acceptedLength = _fileList.length
  const _addFiles = (file) => {
    _setFileList(R.concat(file, _fileList))
  }
  const _uploadClick = async () => {
    if (_acceptedLength > 0) {
      const files = _fileList.filter((f) => f.accepted)
      const r = await upload(files)
    }
  }
  console.log('_fileList', _fileList)
  return (
    <Grid>
      <button onClick={_uploadClick}>Upload</button>
      {accounts.map((a) => (
        <AccountDropzone
          key={a.acctId}
          account={a}
          files={_fileList}
          addFiles={_addFiles}
        />
      ))}
    </Grid>
  )
}

export default App
