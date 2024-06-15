const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes/routes');

dotenv.config();
const port = process.env.PORT || 8000
const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log('Server running!');
});