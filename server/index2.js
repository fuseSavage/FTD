const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const multer = require('multer');
const path = require('path');

const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// const bcrypt = require('bcrypt');
// const sultRounds = 10;

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 24 * 60 * 60 * 1000 //1 day

    }
}))

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

app.get('/login', (req, res) => {
    // console.log('222',req.session.user)
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user});
    } else {
        res.send({loggedIn: false });
    }
})

app.post('/login', (req, res) => {
    const gid = req.body.uid;
    const password = req.body.password;

    // bcrypt.hash(password, sultRounds, (err, hash) => {
    db.query(`SELECT * FROM employees WHERE gid = "${gid}" AND password = "${password}" `,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                req.session.user = result
                res.send(result);
                // console.log(req.session.user)
            } else {
                res.send({ message: "uid/password is invalid!" });
                console.log("error : ", err)
            }
        }
    )
})

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            throw err;
        } else {
            res.redirect('/');
        }
    });
})

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
                // console.log(err);
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
                // console.log(result)
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
    const title = req.query.title;
    if (title != undefined) {
        imgdb.query(`SELECT * FROM ${title}`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
    }
    // res.sendFile(path.resolve(__dirname, `./uploads/images/${req.params.name}`));
});

app.get('/showImages/:name', (req, res) => {
    res.sendFile(path.resolve(__dirname, `./uploads/images/${req.params.name}`));
});

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



app.listen(3001, () => {
    console.log('Server is running...')
})
