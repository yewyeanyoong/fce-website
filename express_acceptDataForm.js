const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.urlencoded({ extended: true }));

// MySQL connection (XAMPP)
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "studentdb"
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to MySQL");
    }
});


// Display Form
app.get("/", (req, res) => {

    res.send(`
        <h2>Student Registration</h2>

        <form method="POST" action="/add">

            ID:
            <input type="text" name="id"><br><br>

            Name:
            <input type="text" name="name"><br><br>

            <input type="submit" value="Save">

        </form>

        <br>
    `);

});


// Insert Data
app.post("/add", (req, res) => {

    let id = req.body.id;
    let name = req.body.name;
   
    let sql = "INSERT INTO student(id, name) VALUES (?, ?)";


   db.query(sql, [id, name], (err, result) => {

    if (err) {
        res.send("Error: " + err);
    }
    else {
        res.send(`
                <h3>Student Added Successfully</h3>
                <a href="/">Add Student</a>
                <br>
                <a href="/students">View Students</a>
            `);
    }

});

});


// Display Data
app.get("/students", (req, res) => {

    let sql = "SELECT * FROM student";


    db.query(sql, (err, results) => {

         let output = `
            <h2>Student List</h2>
            <table border="1">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
        `;

        results.forEach(student => {

            output += `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                </tr>
           ` ;

        });


        output += 
            '</table>'
        

        res.send(output);

    });

});


// Start Server
app.listen(3000, () => {

    console.log("Server running at http://localhost:3000");

});