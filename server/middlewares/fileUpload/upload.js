import path from 'node:path';
import multer from 'multer';
import { nanoid } from 'nanoid';

export const uploadDir = path.join(process.cwd(), 'tmp');
export const storeImageDir = path.join(process.cwd(), 'public', 'avatars');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const fileName = [nanoid(), file.originalname].join('_');
    callback(null, fileName);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({ storage });

export default upload;
