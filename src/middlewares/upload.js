const multer = require('multer')
const { errorHandling } = require('../helpers/errorHandler')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.')
    const ext = extension[extension.length - 1]
    const filename = `${new Date().getDate()}_${new Date().getTime()}.${ext}`
    cb(null, filename)
  }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const limits = {
  // 3MB
  fileSize: 1024 * 1024 * 3
}

const uploadImage = multer({
  storage,
  limits,
  fileFilter
}).single('picture')

module.exports = (req, res, next) => {
  uploadImage(req, res, (err) => {
    if (err) {
      return errorHandling(err, res)
    }
    next()
  })
}
