const fs = require("fs");
const https = require("https");
const options = {
	key: fs.readFileSync(`${__dirname}/ssl-server/ph-key.txt`),
	passphrase: "localhost", // ----> optional
	cert: fs.readFileSync(`${__dirname}/ssl-server/ph-cert.txt`),
	ca: [
		fs.readFileSync(`${__dirname}/ssl-client/ph-cert.txt`)
	],
	requestCert: true,
	rejectUnauthorized: true
};
https.createServer(options, function(req, res) {
	console.log(new Date() + " " + req.connection.remoteAddress + " " + req.method + " " + req.url);
    res.writeHead(200);
    res.end("OK!\n");
}).listen(8888);
// test commit