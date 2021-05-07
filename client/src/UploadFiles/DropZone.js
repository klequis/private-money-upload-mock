import { useRef } from 'react'
import { DropDiv, DropMsgDiv, OnlyCSVMsgDiv } from './uploadFilesStyles'

export const DropZone = ({ getRootProps, getInputProps, account }) => {
  const _dropRef = useRef()
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{account.acctName}</h5>
        <h6>x{account.acctNumber}</h6>
        <DropDiv id="DropDiv1" {...getRootProps()} ref={_dropRef}>
          <input {...getInputProps()} />
          <DropMsgDiv>
            <div>
              Add files for {account.acctName} ({account.acctNumber})
            </div>
            <OnlyCSVMsgDiv>
              <i>Only CSV files are accepted.</i>
            </OnlyCSVMsgDiv>
          </DropMsgDiv>
        </DropDiv>
      </div>
    </div>
  )
}
