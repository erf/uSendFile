# uSendFile

A minimal static file handler for [uWebSocket.js](https://github.com/uNetworking/uWebSockets.js)

> NOTE: Only works for small files. Apps in production should use nginx or similar.

## Installation

Add the following to your `package.json` file:

```json
{
  "dependencies": {
	"uSendFile": "github:erf/uSendFile"
  }
}
```

Then run `npm install`.

## Usage

```javascript

// import the modules 
import uWS from 'uWebSockets.js'
import sendFile from 'uSendFile'

// create a new app
const app = uWS.App()

// index.html
app.get('/', (res, req) => sendFile('./public/index.html', res))

// static files
app.get('/*', (res, req) => sendFile(`./public${req.getUrl()}`, res))
```
