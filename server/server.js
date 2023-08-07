import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './api/api.js';
import path from 'node:path';
import { uploadDir, storeImageDir } from './middlewares/fileUpload/upload.js';
import createFolderIsNotExist from './utils.js';
// import http from 'http';
// import {io} from 'socket.io';

const app = express();

// const server = http.createServer(app);
// io(http);

dotenv.config();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(express.json());
app.use(cors());
import './config/config-passport.js';

app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/api', router);

app.get('/api/stream', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  connection
    .then(() => {
      res.write('data: connected\n\n');
      res.end();
    })
    .catch(error => {
      res.write('data: error\n\n');
      res.end();
    });
});

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/',
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
////////////////////////////////

// io.on('connection', (socket) => {
//   // Pobierz ID restauracji, do której ma dostęp dany użytkownik
//   socket.on('createTable', (data) => {
//     console.log('Otrzymano żądanie utworzenia nowego stolika:', data);

//     // Wykonaj operację dodawania nowego stolika w bazie danych
//     // Korzystając z metody controllera
//     controllerRestaurant.createRestaurantTable(data)
//       .then((newTable) => {
//         // Wysyłamy odpowiedź zwrotną do klienta, że stolik został utworzony
//         socket.emit('tableCreated', newTable);

//         // Wysyłamy informacje do wszystkich klientów w pokoju o nazwie danej restauracji
//         socket.to(data.restaurantId).emit('tableAddedToRestaurant', newTable);
//       })
//       .catch((error) => {
//         // W przypadku błędu, wysyłamy informacje do klienta
//         socket.emit('tableCreationError', error.message);
//       });
//   });

// })

//   // Obsługa rozłączenia klienta WebSocket
//   socket.on('disconnect', () => {
//     console.log('Klient WebSocket rozłączony.');
//   });
// });

/////////////////////////////////

const PORT = process.env.PORT || 3001;

// const uriDb = process.env.DB_HOST;
const uriDb = process.env.serviceDb;
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


