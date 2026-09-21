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


// Display Update Form with dynamic Combo Box (Select ID)
app.get("/", (req, res) => {

  // 1. Fetch all student IDs from the database to populate the select dropdown
  const sqlSelectIDs = "SELECT id FROM student";
  
  db.query(sqlSelectIDs, (err, results) => {
    if (err) {
      return res.send("Error fetching IDs: " + err);
    }

    // 2. Build <option> tags dynamically from database results
    let options = "";
    results.forEach((row) => {
      options += `<option value="${row.id}">${row.id}</option>`;
    });

    // 3. Render the form with the combo box
    res.send(`
      <h2>Update Student Information</h2>
      <form method="POST" action="/update">
        Select ID:
        <select name="id">
          ${options}
        </select><br><br>

        New Name:
        <input type="text" name="name" required><br><br>

        New Age:
        <input type="number" name="age" required><br><br>

        <input type="submit" value="Update Student">
      </form>
      <br>
      
    `);
  });
});

// Update Data in Database
app.post("/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const age = req.body.age;

  const sqlUpdate = "UPDATE student SET name = ?, age = ? WHERE id = ?";

  db.query(sqlUpdate, [name, age, id], (err, result) => {
    if (err) {
      res.send("Error updating record: " + err);
    } else {
      res.send(`
        <h3>Student Updated Successfully</h3>
      `);
    }
  });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});