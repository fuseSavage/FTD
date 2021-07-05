
const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const oracledb = require("oracledb");


const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');



// import AddImg from '../frontend/public';
// const { v4: uuidv4 } = require('uuid');

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

const app = express();

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 3600 * 1000 // 1hr
}))
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



// Connect Database Oracle//
// const HGSA_ODS = `(DESCRIPTION=(ADDRESS_LIST =
//         (ADDRESS = (PROTOCOL = TCP)(HOST = tkhpods.kor.thai.seagate.com)(PORT = 1521)))
//         (CONNECT_DATA =(SID = ods)(SERVICE_NAME = ods.kor.thai.seagate.com)
//                 (SERVER = DEDICATED)))`

// const orldb = oracledb.getConnection({
//     user: "rhtwebacc",
//     password: "rhtseagate",
//     connectString: HGSA_ODS
// },
//     function (err, connection) {
//         if (err) {
//             console.error(err); return;
//         }
//         // connection.execute("SELECT sysdate from dual",
//         // connection.execute("SELECT * from ETSA_TH_BIN ",
//         // connection.execute("SELECT table_name, owner FROM ETSA_TH_BIN ORDER BY owner, table_name ",
//         connection.execute("SHOW TABLES",
//             function (err, result) {
//                 if (err) {
//                     console.error(err); return;
//                 }
//                 console.log(result.rows);
//             });
//     });

// var Service = require('node-windows').Service;
// var svc = new Service({
//     name: 'nodetest',
//     description: 'nodetest',
//     script: 'C:\\Users\\931897\\Desktop\\Project Seagate\\FTD\\server\\index.js'
// })
// svc.on('install', function () {svc.start()})
// svc.on('start', function () {console.log('start')})
// svc.install()




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
                // res.redirect('/')
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
                // console.log(result)
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
    // orldb.query(`select * from ETSA_TH_BIN `,
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
                console.log(result)
            }
        })
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

app.delete('/deleteTitle', (req, res) => {
    const name = req.query.name;
    imgdb.query(`DROP TABLE ${name}`, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.send({
                message: 'Successfully Deleted'
            })
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
            res.send({ message: 'This name already exists, please rename it.' })
        }
    })
})

app.get('/getImage', (req, res) => {
    const title = req.query.name;
    if (title != undefined) {
        imgdb.query(`SELECT * FROM ${title}`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
                // res.sendFile(path.resolve(__dirname, `./uploads/images/${req.params.name}`));
                // console.log(api)
                // console.log(req.params.name)
            }
        })
    }

})

app.delete('/deleteItem', (req, res) => {
    const id = req.query.id;
    const title = req.query.title;
    console.log(id, title)

    imgdb.query(`DELETE FROM ${title} WHERE id = ${id}`, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.send({
                message: 'Successfully Deleted'
            })
        }
    })
})

app.post('/changeImage', upload.array('imagesArr'), (req, res) => {
    const title = req.query.title;
    const images = req.files;
    let reqFiles = [];
    // console.log(title)
    // console.log(images)
    for (let i = 0; i < images.length; i++) {
        reqFiles.push(images[i].filename)

        imgdb.query(`INSERT INTO ${title} (images) VALUES ("${reqFiles[i]}")`, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Insert Complated', reqFiles[i])
            }
        })
    }

})

app.listen('3001', () => {
    console.log('server is running on port 3001');
})