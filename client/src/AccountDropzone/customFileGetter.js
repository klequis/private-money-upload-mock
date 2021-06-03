import * as R from 'ramda'
import { getFileExtension } from 'lib/getFileExtension'

const addDefinedProperty = (propName, propValue, obj) => {
  Object.defineProperty(obj, propName, {
    value: propValue
  })
  return obj
}

const isDuplicate = (fileName, currentFileNames) =>
  R.any(R.equals(R.__, fileName), currentFileNames)

/**
 *
 * @param {event} event fileDrop event
 * @param {string} acctId the account id the files were added to
 * @param {Array} currentFiles list of files from all previous drops
 * @returns {Array} array of accepted files
 */
export async function customFileGetter(event, acctId, currentFiles) {
  console.log('event', event)
  console.log('files', currentFiles)
  const currentFileNames = currentFiles.map((f) => f.name)

  const addProps = (file) => {
    const { name } = file
    const extension = getFileExtension(name)
    addDefinedProperty('extension', extension, file)
    const isCSVExtension = extension.toLowerCase() === 'csv'
    addDefinedProperty('hasCSVExtension', isCSVExtension, file)
    addDefinedProperty('acctId', acctId, file)
    const isDup = isDuplicate(name, currentFileNames)
    addDefinedProperty('duplicate', isDup, file)
    addDefinedProperty('accepted', isCSVExtension && !isDup, file)
    return file
  }

  const fileList = event.dataTransfer
    ? event.dataTransfer.files
    : event.target.files
  return R.map(addProps)(fileList)
}
