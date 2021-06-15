const getFileMeta = (f) => {
  return {
    name: f.name,
    acctId: f.acctId
  }
}

/**
 *
 * @param {Array} files of File objects
 * @returns {object} { accepted: [], rejected: [] }
 * @description Takes a single array of File objects and divides them into groups based on File.accept = true || false.
 */
export const upload = async (files) => {
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

  for (var key of formData.keys()) {
    console.log(key)
  } // logs "uploadedFiles" 8 times

  const r = await fetch('http://localhost:3030/api/upload', {
    method: 'POST',
    body: formData
  })

  const j = await r.json()
  return j.files.uploadedFiles
}
