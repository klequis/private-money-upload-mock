import axios from 'axios'

const onProgress = ({ percent }, file) => {
  console.log('onProgress', `${percent}%`, file.name)
}

const onSuccess = (res, file) => {
  console.log('onSuccess', res /*, file.name*/)
}
const onError = (e) => {
  console.log('ERROR', e)
}

export const upload = (files) => {
  axios
    .all(
      files.map((f) => {
        const options = {
          // withCredentials,
          // headers,
          onUploadProgress: ({ total, loaded }) => {
            onProgress(
              { percent: Math.round((loaded / total) * 100).toFixed(2) },
              f
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
    .then((x) => {
      onSuccess(x)
    })
    .catch(onError)
}

/**
 *
 * @param {Array} files of File objects
 * @returns {object} { accepted: [], rejected: [] }
 * @description Takes a single array of File objects and divides them into groups based on File.accept = true || false.
 */
