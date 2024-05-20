# uSendFile

A minimal static file handler for [uWebSocket.js](https://github.com/uNetworking/uWebSockets.js)

## Usage

```
// index.html
app.get('/', (res, req) => sendFile('./public/index.html', res))

// static files
app.get('/*', (res, req) => sendFile(`./public${req.getUrl()}`, res))
```
