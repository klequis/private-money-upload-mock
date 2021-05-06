import styled from 'styled-components'
import { theme } from 'style/theme'

export const Box = styled.div`
  height: 100px;
  ${'' /* width: 100px; */}
  background-color: blue;
  margin: 10px;
`

export const UploadFilesDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 50%;
  @media (max-width: ${theme.breakpoints.sm}) {
    color: green;
  }
`
// min-width: 500px;
export const DropDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 30px 30px;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  background-color: var(--primary);
  ${'' /* width: 50%; */}
  width: 100%;
`
// border-color: #c7d1db;

export const DropMsgDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  width: 100%;
`

export const OnlyCSVMsgDiv = styled.div`
  background-color: blue;
  padding-top: 4px;
`

export const AccountsDiv = styled.div`
  display: flex;
`

// export const Card = styled.div`

// `

// export const PleaseSelectFilesDiv = styled.div`
//   background-color: var(--warning);
//   margin-top: 20px;
// `
