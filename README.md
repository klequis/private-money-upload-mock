# Formidable React Dropzone Example

An example of using [Formidable](https://github.com/node-formidable/formidable), [React](https://reactjs.org/) & [React Dropzone](https://react-dropzone.js.org/), to upload files to an [Express](https://expressjs.com/) ([REST API](https://restfulapi.net/)).

## Packages of note

- [cors](https://www.npmjs.com/package/cors)
- [express](https://www.npmjs.com/package/express)
- [ramda](https://www.npmjs.com/package/ramda)
- [react-dropzone](https://www.npmjs.com/package/react-dropzone)
- [styled-components](https://www.npmjs.com/package/styled-components)

## Usage

```
git clone ...
cd server
npm i
npm start
```

In a new terminal

```
cd .../server
npm i
npm start
```

## Files shape on client

```js
const File = {
  lastModified: timestamp,
  lastModifiedDate: Date {},
  name: string,
  size: number,
  type: string, // mimetype
  webkitRelativePath: string, // usually empty
  accepted: bool, // did the client accept the file
  acctId: string, // ID for related bank account. E.g., 1234.chk.diablo-bank-sf
  duplicate: bool,
  extension: string, // file extension
  hasCSVExtension: bool,
  wasUploaded: bool, // did the server accept the file for upload
};
```

## File shape returned from server

```js
const File = {
  filepath: string, // "/home/klequis/dev-pm/private-money-upload-mock/server/uploads/416caf493ac61d1c869ab3b03"
  mimetype: string, // "text/csv"
  mtime: string, // "2021-06-15T20:43:37.781Z"
  newFilename: string, // "416caf493ac61d1c869ab3b03"
  originalFilename: string, // "file1.csv"
  size: number, // 19745
};
```
