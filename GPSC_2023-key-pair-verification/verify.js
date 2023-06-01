// ---------------------------------------------------------------------------------------------------------------------------------------- //

let filePub = "public.pem";
let filePri = "private.pem";
let sha = "sha256";
let password = "P@ssw0rd";

const plainText = "zparinthorn.k@pttdigital.com";

// ---------------------------------------------------------------- //

let fs = require('fs');
let crypto = require('crypto');

// ---------------------------------------------------------------------------------------------------------------------------------------- //

function encryptText (plainText) {
  return crypto.publicEncrypt({
    key: fs.readFileSync(filePub, 'utf8'),
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: sha
  },
  Buffer.from(plainText)
  )
}

function decryptText (encryptedText) {
  return crypto.privateDecrypt(
    {
      key: fs.readFileSync(filePri, 'utf8'),
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: sha,
	  passphrase: password
    },
    encryptedText
  )
}

const encryptedText = encryptText(plainText);
console.log('encrypted text: ', encryptedText.toString('base64'));

const decryptedText = decryptText(encryptedText);
console.log('decrypted text:', decryptedText.toString());

// ---------------------------------------------------------------------------------------------------------------------------------------- //



/*const fs = require('fs');
const crypto = require('crypto');

const certificatePath = 'ph-cert.txt';

// Read the certificate file
const certificate = fs.readFileSync(certificatePath);

// Extract the public key
const publicKey = crypto.createPublicKey({
  key: certificate,
  format: 'pem'
});

const exportedPublicKey = publicKey.export({
  type: 'spki',
  format: 'pem'
});
console.log(exportedPublicKey);


fs.writeFileSync('extracted-public-key.pem', exportedPublicKey);*/

// ---------------------------------------------------------------------------------------------------------------------------------------- //