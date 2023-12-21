const express = require("epxress");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors);

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    port:"3306",
    password:"",
    database:"project",
});

app.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    db.query(
        "SELECT * FROM admin WHERE username = ? AND password = ? ", 
        [username, password],
        (err, result) => {
            if(err) res.send({err: err})
            else {
                if(result.length > 0) res.send(result);
                else res.send({message: "Wrong username/password Combination!"})
            }
        }
        )
})

app.listen(5000, "localhost", () => {console.log("running server")});