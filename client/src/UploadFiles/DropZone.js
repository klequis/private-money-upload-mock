import { DropDiv, DropMsgDiv, OnlyCSVMsgDiv } from './uploadFilesStyles'

export const DropZone = ({ dropRef, getRootProps, getInputProps, account }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{account.acctName}</h5>
        <h6>x{account.acctNumber}</h6>
        <DropDiv id="DropDiv1" {...getRootProps()} ref={dropRef}>
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
