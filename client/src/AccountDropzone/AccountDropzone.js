import { DropZone } from './DropZone'
import { useDropzone } from 'react-dropzone'
import { customFileGetter } from './customFileGetter'
import * as R from 'ramda'
import { Card } from 'components/Card'
import { CardBody } from 'components/CardBody'
import { Files } from './Files'
import { File } from './File'
import { nanoid } from 'nanoid'

const filterFiles = (files, acctId) => {
  return files.reduce((result, file) => {
    if (file.acctId === acctId) {
      return R.append(file, result)
    }
    return result
  }, [])
}

const _wasUploaded = (fileName, files) => {
  console.group('_wasUploaded')
  console.log('fileName', fileName)
  const acceptedFiles = R.filter((x) => x.accepted, files)
  const names = R.map((x) => x.name, acceptedFiles)

  console.log('names', names)
  const found = R.any((x) => x === fileName)(names)
  console.log('found', found)

  console.groupEnd()
  return found
}

export const AccountDropzone = ({ account, files = [], addFiles }) => {
  const _onDrop = (acceptedFiles) => {
    console.log('_onDrop: acceptedFiles', acceptedFiles)
    addFiles(acceptedFiles) // `addFiles` does a concat
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: _onDrop,

    getFilesFromEvent: (event) => customFileGetter(event, account.acctId, files)
  })

  return (
    <Card>
      <CardBody>
        <DropZone
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          account={account}
        />
        <Files>
          {filterFiles(files, account.acctId).map((file) => {
            {
              /* const uploaded = _wasUploaded(file.name, files)
            console.log('uploaded1', uploaded) */
            }
            return (
              <File
                key={file.duplicate ? nanoid() : file.name}
                file={file}
                uploaded="hi"
              />
            )
          })}
        </Files>
      </CardBody>
    </Card>
  )
}

// R.hasIn
//
