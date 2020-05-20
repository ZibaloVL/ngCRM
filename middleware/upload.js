const multer = require('multer') // for load file in storage
const moment = require('moment')

const storage = multer.diskStorage({
  destination( req, file, cb ) {
    cb( null, 'uploads/')
  },
  filename( req, file, cb ) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS')
    cb( null, `${date}-${file.originalname}`)
  } 
})

const fileFilter = ( req, file, cb) => {
  console.log ('file_', file ) // mimetype???
  if( file.mimetype === 'img/png' || file.mimetype === 'img/jpg' ) {
    cb( null, true )
  } else {
    cb ( null, false )
  }
}

const limits = {
  fileSize : 1024*1024*5
}

module.exports = multer({
  storage,
  fileFilter,
  // limits
})