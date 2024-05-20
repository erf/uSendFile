import fs from 'node:fs/promises';
import mime from 'mime-types';

export function(filePath, res) {
	res.onAborted(() => {
		res.aborted = true;
	});
	console.log(`send file -> ${filePath}`)
	fs.readFile(filePath).then(data => {
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
