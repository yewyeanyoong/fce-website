const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "studentdb"
});

db.connect((err) => {
    if (err)
        throw err;

    console.log("Connected to MySQL");
});

app.get("/", (req, res) => {

    db.query("SELECT * FROM student", (err, results) => {

        if (err)
            throw err;

        let output = "<h2>Student List</h2>";

        results.forEach(student => {

            output += `
                ID: ${student.id}<br>
                Name: ${student.name}<br>
                Age: ${student.age}<br><br>
            `;

        });

        res.send(output);

    });

});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});