import React from 'react'
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
export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: [],
      _progress: {}
    }
  }

  _addFiles = (file) => {
    this.setState({ fileList: R.concat(file, this.state.fileList) })
  }

  // _acceptedLength = this.state.fileList.length

  onProgress = (filename, progressNum) => {
    this.setState({
      _progress: R.merge(this.state._progress, { filename, progressNum })
    })
  }

  _uploadClick = async () => {
    if (this.state.fileList.length === 0) return

    const allAcceptedFiles = this.state.fileList.filter((f) => f.accepted)
    // options

    // promise.all
    const result = await Promise.all(
      allAcceptedFiles.map((f) => {
        const options = {
          onUploadProgress: ({ total, loaded }) =>
            this.onProgress(
              f.name,
              Math.round((loaded / total) * 100).toFixed(2)
            )
        }
        const formData = new FormData()
        formData.append('uploadedFiles', f)
        formData.append(f.name, f.name)
        formData.append(f.name, f.acctId)
        return axios.post('http://localhost:3030/api/upload', formData, options)
      })
    )

    const uploadedFileNames = result.map((x) => x.data.result)
    console.log('uploadedFileNames', uploadedFileNames)

    const newFileList = R.map(
      (f) => setWasUploaded(f, uploadedFileNames),
      this.state.fileList
    )
    this.setState({ fileList: newFileList })
  }

  render() {
    console.log('_progress', this.state._progress)
    return (
      <div>
        <button onClick={this._uploadClick}>Upload</button>
        <Grid>
          {accounts.map((a) => (
            <AccountDropzone
              key={a.acctId}
              account={a}
              files={this.fileList}
              addFiles={this._addFiles}
            />
          ))}
        </Grid>
      </div>
    )
  }
}

export default App
