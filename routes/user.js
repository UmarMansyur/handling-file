const router = require('express').Router();
const user = require('../controllers/user');
const multer = require('multer');
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: diskStorage
});

router.post('/', user.createUser);
router.post('/:id', upload.fields('file'), user.updateThumbnail);
module.exports = router;