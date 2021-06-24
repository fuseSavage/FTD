
const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
// import AddImg from '../frontend/public';
// const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cookieParser());
app.use(cors({
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
}));

app.use(express.json());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/images");
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('File type not accepted (.png, .jpg, .jpeg)'));
        }
    }
});

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

const db2 = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root11549",
    database: "flowdb",
});

// var Service = require('node-windows').Service;
// var svc = new Service({
//     name: 'nodetest',
//     description: 'nodetest',
//     script: 'C:\\Users\\931897\\Desktop\\Project Seagate\\FTD\\server\\index.js'
// })
// svc.on('install', function () {svc.start()})
// svc.on('start', function () {console.log('start')})
// svc.install()


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

//AMA
app.get('/ama', (req, res) => {
    const exp_id = req.query.EXP_ID;
    // console.log(exp_id)
    db.query(`SELECT * FROM bin_ama WHERE EXP_ID = "${exp_id}" ORDER BY SLD_BO ASC`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
})

app.get('/dataflow', async (req, res) => {
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
        const code = req.body.data[i].WAF_EXP_CODE;
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
})
app.get('/check-title', (req, res) => {
    imgdb.query(`SHOW TABLES`, (err, result) => {
        if (err) {
            console.log('err', err)
        } else {
            res.send(result)
        }
    })
})

app.post('/uploadimg', upload.array('imagesArray'), (req, res) => {
    const title = req.query.title;
    const images = req.files;
    let reqFiles = [];

   

    imgdb.query(`SELECT * FROM ${title}`, (error) => {
        if (error) {
            for (let i = 0; i < images.length; i++) {
                reqFiles.push(images[i].filename)
                imgdb.query(`CREATE TABLE ${title} (id INT AUTO_INCREMENT PRIMARY KEY, images VARCHAR(255))`, (err) => {
                    if (err) {
                        imgdb.query(`INSERT INTO ${title} (images) VALUES ("${reqFiles[i]}")`, (err) => {
                            if (err) {
                                console.log('Insert ', err)
                            } else {
                                console.log('Insert Complated 1', reqFiles[i])
                            }
                        })
                    } else {
                        imgdb.query(`INSERT INTO ${title} (images) VALUES ("${reqFiles[i]}")`, (err) => {
                            if (err) {
                                console.log('Insert ', err)
                            } else {
                                console.log('Insert Complated 2', reqFiles[i])
                            }
                        })
                    }
                })
            }
        } else {
            res.send({message: 'This name already exists, please rename it.'})
        }
    })
})


app.get('/getimage/:name', (req, res) => {
    res.sendFile(path.resolve(__dirname, `./uploads/images/${req.params.name}`));
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

app.post('/sw-fw', (req, res) => {
    const sw_fw = req.query.sw_fw;
    // console.log(sw_fw)
    db.query(`INSERT INTO sw_fw (swfw) VALUES (?)`, [sw_fw],
        (err, result) => {
            if (err) {
                res.send({ message: 'Insert fail :(' })
            } else {
                res.send({ message: 'successfully added to the list :)' })
            }
        })
})

app.get('/getswfw', (req, res) => {
    db.query(`SELECT * FROM sw_fw`,
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send(result);
                // console.log(result)
            }
        })
})

app.delete('/delswfw', (req, res) => {
    const id = req.query.id;
    db.query(`DELETE FROM sw_fw WHERE id = ?`, [id],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send({ message: 'successfully deleted' })
            }
        })
})

app.listen('3001', () => {
    console.log('server is running on port 3001');
})