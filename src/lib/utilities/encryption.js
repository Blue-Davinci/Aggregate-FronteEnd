import crypto from 'crypto';
import {ENCRYPTION_KEY,ENCRYPTION_IV} from '$env/static/private';

const algorithm = 'aes-256-cbc';
function encrypt(text){
    const key = Buffer.from(ENCRYPTION_KEY, 'hex');
    const iv = Buffer.from(ENCRYPTION_IV, 'hex');
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    const key = Buffer.from(ENCRYPTION_KEY, 'hex');
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

export{
    encrypt,
    decrypt
}