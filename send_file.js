import fs from 'node:fs/promises';
import mime from 'mime-types';

const sendFile = async (filePath, res) => {
	res.onAborted(() => {
		res.aborted = true;
	});
	try {
		console.log(`send file -> ${filePath}`)
		const data = await fs.readFile(filePath)
		if (!res.aborted) {
			res.cork(() => {
				res.writeStatus('200')
				res.writeHeader('Content-Type', mime.lookup(filePath))
				res.end(data)
			})
		}
	} catch (err) {
		console.log(err);
		if (!res.aborted) {
			res.cork(() => {
				res.writeStatus('404')
				res.end()
			})
		}
	}
}

export { sendFile }
