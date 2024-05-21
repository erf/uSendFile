import { test } from 'node:test'
import { strict as assert } from 'assert'

import uWS from 'uWebSockets.js'
import sendFile from '../index.js'

test('Run server and do a ping request', (t, done) => {
  const port = 3001
  const app = uWS.App()

  app.get('/text', (res, req) => sendFile('./test/testfile.txt', res))

  app.get('/binary', (res, req) => sendFile('./test/favicon.ico', res))

  app.listen(port, async (listenSocket) => {
    const res = await fetch(new Request(`http://localhost:${port}/text`))
    const responseText = await res.text()
    assert.strictEqual(res.status, 200)
    assert.strictEqual(responseText, 'hello world')

    const res2 = await fetch(new Request(`http://localhost:${port}/binary`))
    assert.strictEqual(res2.status, 200)

    app.close()
    done()
  })
})