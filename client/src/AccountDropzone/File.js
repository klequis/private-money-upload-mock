import styled from 'styled-components'
// import { CheckSquareFill, XSquareFill } from 'react-bootstrap-icons'
import { RedX } from './RedX'
import { GreenCheck } from './GreenCheck'
import { getFileBaseName } from 'lib/getFileBaseName'

const FileContainerDiv = styled.div`
  display: flex;
`

const FileName = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
`

const FileNameBase = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 0 1px 5px;
`

const FileNameExtension = styled.span`
  flex-shrink: 0;
  padding: 0 0 1px 0;
`

const FileAccepted = ({ file }) => {
  const { name, extension } = file
  const baseFileName = getFileBaseName(name)
  return (
    <FileContainerDiv id="Container">
      <FileName id="FileName">
        <GreenCheck />
        <FileNameBase id="FileNameBase">{baseFileName}</FileNameBase>
        <FileNameExtension id="FileNameExtension">
          .{extension}
        </FileNameExtension>
      </FileName>
    </FileContainerDiv>
  )
}

const RejectMsgSpan = styled.span`
  padding-left: 21px;
  color: red;
`

const RejectMessage = ({ file }) => {
  const { duplicate, hasCSVExtension } = file
  if (!hasCSVExtension) {
    return 'File must have a .csv extension'
  } else if (duplicate) {
    return 'Duplicate file.'
  } else {
    return 'Unknown file error.'
  }
}

const FileRejected = ({ file }) => {
  const { name, extension } = file
  const baseFileName = getFileBaseName(name)
  return (
    <div>
      <FileContainerDiv id="Container">
        <FileName id="FileName">
          <RedX />
          <FileNameBase id="FileNameBase">{baseFileName}</FileNameBase>
          <FileNameExtension id="FileNameExtension">
            .{extension}
          </FileNameExtension>
        </FileName>
      </FileContainerDiv>
      <RejectMsgSpan>
        <RejectMessage file={file} />
      </RejectMsgSpan>
    </div>
  )
}

export const File = ({ file }) => {
  const { accepted } = file
  return accepted ? <FileAccepted file={file} /> : <FileRejected file={file} />
}
