const cors = require('cors')

require('dotenv').config();

const FRONTED_ALLOWED_URL = process.env.FRONTED_ALLOWED_URL

if (!FRONTED_ALLOWED_URL) {
  throw new Error('FRONTED_ALLOWED_URL is not defined in environment variables');
}
const corsOptions = cors({
    origin: FRONTED_ALLOWED_URL,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
})

module.exports = corsOptions

export default corsOptions;
