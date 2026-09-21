const express = require('express');

const app = express();
const port = 3000;

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));

// Display HTML form
app.get('/', (req, res) => {
    res.send(`
        <h2>Student Registration Form</h2>

        <form method="POST" action="/submit">
            Name:
            <input type="text" name="name"><br><br>

            Age:
            <input type="text" name="age"><br><br>

            Course:
            <select name="course">
                <option value="Computer Science">Computer Science</option>
                <option value="Information Systems">Information Systems</option>
                <option value="Software Engineering">Software Engineering</option>
            </select>
            <br><br>

            <button type="submit">Submit</button>
        </form>
    `);
});

// Process form data
app.post('/submit', (req, res) => {

    let studentName = req.body.name;
    let studentAge = req.body.age;
    let studentCourse = req.body.course;

    res.send(`
        <h2>Student Information</h2>
        Name: ${studentName}<br>
        Age: ${studentAge}<br>
        Course: ${studentCourse}
    `);
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
