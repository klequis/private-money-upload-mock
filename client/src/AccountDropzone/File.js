import styled from 'styled-components'
// import { CheckSquareFill, XSquareFill } from 'react-bootstrap-icons'
import { RedX } from './RedX'
import { GreenCheck } from './GreenCheck'
import { getFileBaseName } from 'lib/getFileBaseName'
import { Circle } from './Circle'
import { FileEarmarkText } from './FileEarmarkText'

const Row = styled.div`
  display: flex;
  ${'' /* align-items: center; */}
  ${'' /* justify-content: space-between; */}
  flex-direction: column;
  align-items: stretch;
  border-top: 1px solid white;

  /* border-bottom needs to be last child */

  border-bottom: 1px solid white;
  padding: 5px 0;
`

const FileContainerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  width: 100%;
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

const FileAccepted = ({ file, uploaded }) => {
  const { name, extension } = file
  const baseFileName = getFileBaseName(name)
  return (
    <Row>
      <FileContainerDiv id="Container">
        <FileName id="FileName">
          {/* <GreenCheck /> */}
          <FileEarmarkText />
          <FileNameBase id="FileNameBase">{baseFileName}</FileNameBase>
          <FileNameExtension id="FileNameExtension">
            .{extension}
          </FileNameExtension>
        </FileName>
        <Circle />
        {/* {file.wasUploaded ? ' - yes' : ' - no'} */}
      </FileContainerDiv>
    </Row>
  )
}

const RejectMsgSpan = styled.span`
  padding-left: 21px;
  color: red;
  padding: 0 5px;
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
    <Row>
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
        <em>
          <RejectMessage file={file} />
        </em>
      </RejectMsgSpan>
    </Row>
  )
}

export const File = ({ file }) => {
  const { accepted } = file
  return accepted ? <FileAccepted file={file} /> : <FileRejected file={file} />
}
