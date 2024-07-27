import crypto from 'crypto';
import fs from 'fs';

const key = crypto.randomBytes(32).toString('hex'); // 32 bytes for aes-256
const iv = crypto.randomBytes(16).toString('hex');  // 16 bytes for AES

const envContent = `ENCRYPTION_KEY=${key}\nENCRYPTION_IV=${iv}\n`;

fs.writeFileSync('.env', envContent, (err) => {
    if (err) {
        console.error('Error writing to .env file', err);
    } else {
        console.log('.env file has been saved');
    }
});

console.log('Encryption key and IV generated and saved to .env file');
