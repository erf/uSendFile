import { test } from 'node:test';
import { strict as assert } from 'node:assert';

import uWS from 'uWebSockets.js'

test('do a simple request and assert 200', (t, done) => {
  const port = 3000
  const app = uWS.App()

  app.get('/test', (res, req) => {
    res.writeStatus('200')
    res.end('hello world')
  })

  app.listen(port, async (listenSocket) => {
    const res = await fetch(new Request(`http://localhost:${port}/test`))
    const responseText = await res.text()
    assert.strictEqual(res.status, 200)
    assert.strictEqual(responseText, 'hello world')
    console.log('assert text file OK')
    app.close()
    done()
  })
})