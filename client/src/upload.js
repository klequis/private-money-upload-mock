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

export const xx_upload = (files) => {
  files.forEach((f) => {
    // uploadNew(f)
  })
}

/*
const uploadNew = (file) => {
  const formData = new FormData()
  formData.append('uploadedFiles', file)
  formData.append(file.name, file.name)
  formData.append(file.name, file.acctId)
  axios
    .post('http://localhost:3030/api/upload', formData, {
      // withCredentials,
      // headers,
      onUploadProgress: ({ total, loaded }) => {
        onProgress(
          { percent: Math.round((loaded / total) * 100).toFixed(2) },
          file
        )
      }
    })
    .then(({ data: response }) => {
      onSuccess(response, file)
    })
    .catch(onError)
}
*/

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
/*
export const upload_prev = async (files) => {
  const formData = new FormData()

  files.forEach((f) => {
    formData.append('uploadedFiles', f)
    formData.append(f.name, f.name)
    formData.append(f.name, f.acctId)
  })

  // console.log('formData', formData.getAll('uploadedFiles')) // logs out all the File objects

  // for (var pair of formData.entries()) {
  //   console.log(pair[0] + ', ' + pair[1])
  // } // logs out "uploadedFiles, [object File]" 8 times

  // for (var key of formData.keys()) {
  //   console.log(key)
  // } // logs "uploadedFiles" 8 times

  const r = await fetch('http://localhost:3030/api/upload', {
    method: 'POST',
    body: formData
  })

  const j = await r.json()
  console.log('j', j)
  return j
}
*/
