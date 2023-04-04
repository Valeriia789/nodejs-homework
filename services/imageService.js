const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const uuid = require("uuid").v4;
const fse = require("fs-extra");
const { AppError } = require("../utils");

class ImageService {
  // ----------- загружаємо файл ----------------
  static upload(name) {
    const multerStorage = multer.memoryStorage();

    const multerFilter = (req, file, callbackFn) => {
      if (file.mimetype.startsWith("image/")) {
        // помилки немає - null, результат true (перевірка пройдена)
        callbackFn(null, true);
      } else {
        callbackFn(new AppError(400, "Upload images only"), false);
      }
    };

    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
      // в single вже не хардкодимо ім'я, (як в мідлварі робили) що має прийти, а будемо передавати його ззовні,
      //  тому що можливо ми не завжди будемо завантажувати аватар
      // (можливо будемо завантажувати скріншот або інший файл з зображенням)
    }).single(name);
  }

  // ---------------- сейвимо файл -----------------
  static async save(file, options, ...pathSegments) {
    // хардкодимо jpeg, тому що всі файли будемо конвертувати в jpeg, незалежно від того, що буде приходити
    const fileName = `${uuid()}.jpeg`;
    // cwd - current working directory
    const fullFilePath = path.join(process.cwd(), "public", ...pathSegments);

    await fse.ensureDir(fullFilePath);
    await sharp(file.buffer)
      .resize(options || { height: 500, width: 500 })
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(path.join(fullFilePath, fileName));

    return path.join(...pathSegments, fileName);
    // файлова структура буде виглядати так: public/avatars/users/<userID>/<random>.jpeg
  }
}

module.exports = ImageService;
