import React, { useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import * as R from 'ramda'
import { Button } from 'components'
import { upload } from './upload'
import { ResultTable } from './ResultTable'
import {
  AccountsDiv,
  UploadFilesDiv,
  DropDiv,
  DropMsgDiv,
  ButtonDiv,
  OnlyCSVMsgDiv,
  Box
} from './uploadFilesStyles'
import { FileLists } from './FileLists'
import { accounts } from './accounts'

import { RejectedFilesWarning } from './RejectedFilesWarning'

const _l = console.log

const groupFiles = (files) => {
  const g = R.groupBy((f) => (f.accept ? 'accepted' : 'rejected'))(files)
  // const { accepted, rejected } = g
  // console.group('groupFiles')
  // // _l('g', g)
  // _l(`accepted (${R.type(accepted)})`, accepted)
  // _l(`accepted[0] (${R.type(accepted)})`, accepted[0])
  // _l(`accepted[0].length (${R.type(accepted)})`, accepted[0].length)
  // _l(`accepted[1] (${R.type(accepted)})`, accepted[1])
  // _l(`rejected (${R.type(rejected)})`, rejected)

  // console.groupEnd()

  return {
    accepted: R.has('accepted')(g) ? g.accepted : [],
    rejected: R.has('rejected')(g) ? g.rejected : []
  }
}

export const UploadFiles = () => {
  const [_files, _setFiles] = useState({ accepted: [], rejected: [] })
  const [_results, _setResults] = useState([])
  const [_showPleaseSelectFiles, _setShowPleaseSelectFiles] = useState(false)

  const _dropRef = useRef()
  const _acceptedLength = _files.accepted.length
  const _rejectedLength = _files.rejected.length
  const _totalSelected = _acceptedLength + _rejectedLength
  const _resultsLength = _results.length

  const _uploadClick = async () => {
    if (_acceptedLength > 0) {
      const r = await upload(_files.accepted)
      _setResults(r)
    }
    _setShowPleaseSelectFiles(_totalSelected === 0)
  }

  /**
   *
   * @param {*} acceptedFiles
   */
  const _onDrop = (acceptedFiles) => {
    // one -->
    // _setFiles(groupFiles(acceptedFiles))
    // <--

    const { accepted, rejected } = groupFiles(acceptedFiles)
    // console.log('accepted', accepted)
    // console.log('_files.accepted', _files.accepted)
    _setFiles({
      accepted: R.flatten([accepted, _files.accepted]),
      rejected: R.flatten([rejected, _files.rejected])
    })
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: _onDrop,
    getFilesFromEvent: (event) => customFileGetter(event)
  })

  // console.log('_files', _files)

  return (
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        <div class="col">
          <Box>1</Box>
        </div>
        <div class="col">
          <Box>2</Box>
        </div>
        <div class="col">
          <Box>3</Box>
        </div>
        <div class="col">
          <Box>4</Box>
        </div>
      </div>
    </div>
  )
}

/**
 *
 * @param {object} file a File object
 * @returns {object} a File object
 */
const updateAcceptProp = (file) => {
  const filename = file.name
  const ext = filename.substr(filename.lastIndexOf('.') + 1)

  Object.defineProperty(file, 'accept', {
    value: ext === 'csv' ? true : false
  })
  return file
}

/**
 *
 * @param {event} event fileDrop event
 * @returns {Array} array of accepted files
 */
async function customFileGetter(event) {
  // console.log('event', event)
  const fileList = event.dataTransfer
    ? event.dataTransfer.files
    : event.target.files
  console.log('fileList', fileList)
  return R.map(updateAcceptProp, fileList)
}

/*
{accounts.map((a) => (
        <>
          <div class="row">
            <div class="col-md-8">
              <Box>1</Box>
            </div>
            <div class="col-6 col-md-4">
              <Box>2</Box>
            </div>
          </div>

          <div class="row">
            <div class="col-6 col-md-8">
              <Box>5</Box>
            </div>
            <div class="col-6 col-md-8">
              <Box>6</Box>
            </div>
            <div class="col-6 col-md-8">
              <Box>7</Box>
            </div>
          </div>

          <div class="row">
            <div class="col-md-8">
              <Box>8</Box>
            </div>
            <div class="col-md-8">
              <Box>9</Box>
            </div>
          </div>
        </>
      ))}
*/
