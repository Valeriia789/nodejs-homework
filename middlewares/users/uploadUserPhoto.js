const multer = require('multer');
const uuid = require('uuid').v4;
const { AppError } = require('../../utils');

// конфіг, який вказує, де саме будемо зберігати файл:
const multerStorage = multer.diskStorage({
  destination: (req, file, callbackFn) => {
    callbackFn(null, 'public/avatars/users')
  },
  // кожному файлу необхадно давати унікальні імена, щоб аватар одного юзера не затер аватар іншого з таким же іменем
  filename: (req, file, callbackFn) => {
    // генеруємо унікальне ім'я файлу:
    // ext - розширення файлу, витягаємо його з середини самого файлу, а не беремо те, що юзер сам прописав в імені файлу
    const ext = file.mimetype.split('/')[1]; 

    // до отриманої рандомної строки додаємо ще id юзера
    callbackFn(null, `${req.user.id}-${uuid()}.${ext}`)
  }
})

const multerFilter = (req, file, callbackFn) => {
  if (file.mimetype.startsWith('image/')) {
    // помилки немає - null, результат true (перевірка пройдена)
    callbackFn(null, true)
  } else {
    callbackFn( new AppError(400, 'Upload images only'), false)
  }
}

exports.uploadUserPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 1024 * 500
  }
}).single('avatarURL')