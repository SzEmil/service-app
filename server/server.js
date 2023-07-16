import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './api/api.js';
import path from 'node:path';
import { uploadDir, storeImageDir } from './middlewares/fileUpload/upload.js';
import createFolderIsNotExist from './utils.js';

const app = express();
dotenv.config();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(express.json());
app.use(cors());
import './config/config-passport.js';

app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/api', router);

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/contacts',
    data: 'Not found',
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 3001;

const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, function () {
      createFolderIsNotExist(uploadDir);
      createFolderIsNotExist(storeImageDir);
      console.log('Database connection successful');
      console.log(`Server is running. Use our API on port ${PORT}`);
    });
  })
  .catch(error => {
    console.log(`Server not running. Error message: ${error}`);
    process.exit(1);
  });
