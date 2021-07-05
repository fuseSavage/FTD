const express = require('express');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const { body, validationResult } = require('express-validator')

const db = require('./database');

const app = express();
app.use(express.urlencoded({
    extended: false
}))

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 3600 * 1000 // 1hr
}))

app.get('/')

app.listen(3001, () => {
    console.log('Server is running...')
})
