import fs from 'node:fs/promises'
import mime from 'mime-types'
import isBinaryPath from 'is-binary-path';

function sendFile(filePath, res) {
	res.onAborted(() => {
		res.aborted = true;
	});
	console.log(`send file -> ${filePath}`)

	const encoding = isBinaryPath(filePath) ? 'binary' : 'utf8';

	fs.readFile(filePath, encoding).then(data => {
		if (!res.aborted) {
			res.cork(() => {
				res.writeStatus('200')
				res.writeHeader('Content-Type', mime.lookup(filePath))
				res.end(data)
			})
		}
	}).catch(err => {
		console.log(err);
		if (!res.aborted) {
			res.cork(() => {
				res.writeStatus('404')
				res.end()
			})
		}
	})
}

export default sendFile