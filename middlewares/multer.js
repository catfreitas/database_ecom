const multer = require('multer');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE[file.mimetype];
        let error = new Error('Invalid Image Type');

        if(isValid){
            error = null;
        }

        cb(error, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        /* const fileName = file.originalname.split(' ').join('-');
        const fileType = FILE_TYPE[file.mimetype];
 */
        /* cb(null, `${fileName}-${Date.now()}.${fileType}`); */
        // cb(null, `${fileName}-${Date.now()}`); 
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const FILE_TYPE = {
    'image/png' : 'png',
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpeg',
}

/* const filterFileType = (req, file, cb) => {
    FILE_TYPE.includes(file.mimetype) ? cb(null, true) : cb(null, false)
} */
  
const upload = multer({ storage: storage })
let uploadMultiple = upload.fields([{ name: 'image', maxCount: 1 }])
let uploadSingle = upload.single('image')


/* destination: function (req, file, cb) {
    const isValid = FILE_TYPE[file.mimetype];
    let error = new Error('Invalid Image Type');

    if(isValid){
        error = null;
    }

    cb(error, './public/uploads');
} */

module.exports = {uploadMultiple, uploadSingle};