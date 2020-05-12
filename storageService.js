var CryptoJS = require("crypto-js");
const key = '6fa979f20126cb08aa645a8f495f6d85';    
const iv = 'I8zyA4lVhMCaJ5Kg';
/**
 * 
 * Encrypt key value (pair) before storage in sessionStorage
 * @param key Key sessionStorage
 * @param value value sessionStorage
 */
function encryptFunction(key, value) {
    let validKey = false;
    let validValue = false;
    let keyEncrypt = key;
    let valueEncrypt = value;
    let objEncrypt = {};

    if (key) {
        validKey = true;
    }
    if (value) {
        validValue = true
    }

    if (validKey) {
        if (typeof key === 'number') {
            keyEncrypt = encrypt(key.toString());
        } else {
            keyEncrypt = encrypt(key);
        }
    }

    if (validValue) {
        if (typeof value === 'number') {
            valueEncrypt = encrypt(value.toString());
        } else {
            valueEncrypt = encrypt(value);
        }

    }

    objEncrypt.key = keyEncrypt;
    objEncrypt.obj = valueEncrypt;
    return objEncrypt;
}

/**
 * 
 * Encrypt value
 * @param value 
 */
function encrypt(value) {
    let encrypt = value;

    try {
        encrypt = CryptoJS.AES.encrypt(value, CryptoJS.enc.Utf8.parse(key), {
            iv: CryptoJS.enc.Utf8.parse(iv), 
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
        return encrypt.toString();
    } catch (e) {
        console.log(e);
        return encrypt;
    }
}

/**
 * 
 * Decrypt value
 * @param decryptValue 
 */
function decrypt(decryptValue) {
    let encrypt = decryptValue;
    try {
        encrypt = CryptoJS.AES.decrypt(decryptValue, CryptoJS.enc.Utf8.parse(key), {
            iv: CryptoJS.enc.Utf8.parse(iv), 
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
        return encrypt.toString(CryptoJS.enc.Utf8);
    } catch (e) {
        console.log('error decrypt' + e);
        return key;
    }
}

export { encryptFunction, decrypt, encrypt };