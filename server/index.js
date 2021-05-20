
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

const db2 = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root11549",
    database: "flowdb",
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
    db.query(`SELECT * FROM data_etsa WHERE EXP_ID = "${exp_id}"`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
})

app.get('/dataflow',async (req, res) => {
    await dataflow.query(`SELECT * FROM dataflow`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
                
            }
        })
})

app.post('/pushflow', (req, res) => {
    const data = req.body.data;
    const name = req.body.name;
    // const listQty = req.body.listQty;
    // console.log(listQty)
    // console.log(data)
    for (let i = 0; i < data.length; i++) {
        const expid = req.body.data[i].EXP_ID;
        const author = req.body.data[i].BLD_INTENT_AUTHOR;
        const team = req.body.data[i].BLD_INTENT_TEAM;
        // const qty = req.body.listQty[i];
        const descr = req.body.data[i].WAF_EXP_CODE_DESCR;
        const code = req.body.data[i].WAF_EXP_CODE	;
        const wafcode = req.body.data[i].WAF_CODE;
        // console.log(qty, author)
        dataflow.query(`INSERT INTO dataflow (EXP_ID, BLD_INTENT_AUTHOR, BLD_INTENT_TEAM, HGA_QTY, WAF_EXP_CODE_DESCR, WAF_EXP_CODE, WAF_CODE) VALUES(?,?,?,?,?,?,?)`,
        [expid, author, team, qty, descr, code, wafcode],
        (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log('INSERT VALUES COMPLETE')
            }
        })
    }
    // dataflow.query(`INSERT INTO dataflow3 (name, data) VALUES(?,?)`,
    //     [name, jsondata],
    //     (err, res) => {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log('INSERT VALUES COMPLETE')
    //         }
    //     })
      
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
                    maxAge: 24 * 60 * 60 * 1000 //1 day
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