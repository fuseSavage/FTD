const mysql = require('mysql');

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root11549",
    database: "demoautodb",
});
const imgdb = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root11549",
    database: "images",
});
const dblogin = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root11549",
    database: "employees"
});
const dataflow = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root11549",
    database: "insertdata"
})

module.exports = db, imgdb, dblogin, dataflow;