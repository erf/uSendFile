import { test } from 'node:test'
import { strict as assert } from 'assert'

import uWS from 'uWebSockets.js'
import sendFile from '../index.js'

test('Run server and do a ping request', (t, done) => {
  const port = 3000
  const app = uWS.App()

  app.get('/text', (res, req) => sendFile('./test/files/testfile.txt', res))

  app.get('/binary', (res, req) => sendFile('./test/files/favicon.ico', res))

  app.listen(port, async (listenSocket) => {
    const res = await fetch(new Request(`http://localhost:${port}/text`))
    const responseText = await res.text()
    assert.strictEqual(res.status, 200)
    assert.strictEqual(responseText, 'hello world')
    console.log('assert text file OK')

    const res2 = await fetch(new Request(`http://localhost:${port}/binary`))
    assert.strictEqual(res2.status, 200)
    console.log('assert binary file OK')

    done()
  })
})