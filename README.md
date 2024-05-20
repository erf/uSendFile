# uSendFile

A minimal static file handler for [uWebSocket](https://github.com/uNetworking/uWebSockets.js)

## Usage

```
// index.html
app.get('/', async (res, req) => sendFile('./public/index.html', res))

// static files
app.get('/*', async (res, req) => sendFile(`./public${req.getUrl()}`, res))
```
