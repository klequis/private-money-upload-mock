import axios from 'axios'
import * as R from 'ramda'

// const onProgress = ({ percent }, fileName) => {
//   console.log('onProgress', `${percent}%`, fileName)
// }

const onSuccess = (res, file) => {
  console.log('onSuccess', res /*, file.name*/)
}
const onError = (e) => {
  console.log('ERROR', e)
}

/* using async */
export const upload = async (files, progress, setProgress) => {
  console.log('setProgress', setProgress)
  const a = await axios.all(
    files.map((f) => {
      const options = {
        // withCredentials,
        // headers,
        onUploadProgress: ({ total, loaded }) => {
          // setProgress(f.name, Math.round((loaded / total) * 100).toFixed(2))
          const filename = f.name
          const progressNum = Math.round((loaded / total) * 100).toFixed(2)
          setProgress(R.merge(progress, { filename, progressNum }))
        }
      }
      const formData = new FormData()
      formData.append('uploadedFiles', f)
      formData.append(f.name, f.name)
      formData.append(f.name, f.acctId)
      return axios.post('http://localhost:3030/api/upload', formData, options)
    })
  )
  console.log('a', a)
  return a.map((x) => x.data.result)
}

/* using then */
// export const upload = (files) => {
//   axios
//     .all(
//       files.map((f) => {
//         const options = {
//           // withCredentials,
//           // headers,
//           onUploadProgress: ({ total, loaded }) => {
//             onProgress(
//               { percent: Math.round((loaded / total) * 100).toFixed(2) },
//               f
//             )
//           }
//         }
//         const formData = new FormData()
//         formData.append('uploadedFiles', f)
//         formData.append(f.name, f.name)
//         formData.append(f.name, f.acctId)
//         return axios.post('http://localhost:3030/api/upload', formData, options)
//       })
//     )
//     .then((x) => {
//       onSuccess(x)
//     })
//     .catch(onError)
// }

/**
 *
 * @param {Array} files of File objects
 * @returns {object} { accepted: [], rejected: [] }
 * @description Takes a single array of File objects and divides them into groups based on File.accept = true || false.
 */
