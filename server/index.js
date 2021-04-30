
const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
}));

app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root11549",
    database: "demoautodb",
});

const dblogin = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root11549",
    database: "employees"
});

app.get('/demoauto', (req, res) => {
    db.query("SELECT * FROM sql_for_auto_web_07113", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/select', (req, res) => {
    const exp_id = req.query.EXP_ID;
    // console.log(exp_id)
    db.query(`SELECT EXP_ID,HGA_QTY,BLD_INTENT_AUTHOR,BLD_INTENT_TEAM,WAF_EXP_CODE_DESCR,WAF_EXP_CODE,WAF_CODE FROM sql_for_auto_web_07113 WHERE EXP_ID = "${exp_id}"`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
})
// AND password = "${password}"

app.post('/login', (req, res) => {
    const uid = req.body.uid;
    const password = req.body.password;
    dblogin.query(`SELECT * FROM employees WHERE uid = "${uid}" AND password = "${password}"`,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                const token = jwt.sign({ _id: result[0].id }, "secret")
                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 1 * 5 * 60 * 1000 //1 day
                })
                console.log(result)
                res.send(result);
            } else {
                res.send({ message: "uid/password is invalid!" });
            }
        }
    )
})

app.get('/user', async (req, res) => {

    try {
        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie, 'secret')

        if (!claims) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }
        const user = await dblogin.query(`SELECT * FROM employees WHERE id = "${claims._id}"`,
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
            }
        )
    } catch (error) {
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }
})

app.post('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 })
    res.send({
        message: 'success'
    })
})

app.listen('3001', () => {
    console.log('server is running on port 3001');
})