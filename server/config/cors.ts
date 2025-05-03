const cors = require('cors')

require('dotenv').config();

const CLIENT_URL = process.env.CLIENT_URL

if (!CLIENT_URL) {
  throw new Error('CLIENT_URL is not defined in environment variables');
}
const corsOptions = cors({
    origin: CLIENT_URL,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
})

module.exports = corsOptions

export default corsOptions;
