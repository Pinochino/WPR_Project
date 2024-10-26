const fs = require('fs');
const path = require('path');

const fileToBase64 = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                return reject(err);
            }
            // Chuyển đổi Buffer thành Base64
            const base64File = data.toString('base64');
            resolve(base64File);
        });
    });
};

module.exports = fileToBase64;
