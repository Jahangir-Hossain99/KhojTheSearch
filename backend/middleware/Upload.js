const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({    
  destination: function (req, file, cb) {
    let folder = 'uploads/';
    if(file.fieldname === 'avatar') {
        folder += 'avatars/';
    }
    else if(file.fieldname === 'resume') {
        folder += 'resumes/';
    }else if(file.fieldname === 'logo'){
        folder += 'companyLogo/';
    }
    if (!require('fs').existsSync(folder)){require('fs').mkdirSync(folder, { recursive: true });}
    cb(null, folder);
    },
    filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + (req.body.fullName || req.body.companyName || 'unknown') + '-' + uniqueSuffix + fileExtension);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'avatar') {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type for avatar. Only JPEG and PNG are allowed.'), false);
        }
    }else if (file.fieldname === 'logo') {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type for logo. Only JPEG and PNG are allowed.'), false);
        }
    }else if (file.fieldname === 'resume') {
        if (file.mimetype === 'application/pdf' || file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type for resume. Only PDF and Word documents are allowed.'), false);
        }
    } else {
        cb(new Error('Unknown field.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
 });


module.exports = upload;