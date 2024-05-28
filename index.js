const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Sample data for students
let students = [
    { id: 1, name: 'John Doe', age: 20 },
    { id: 2, name: 'Jane Smith', age: 22 }
];

// Get all students
app.get('/students', (req, res) => {
    res.json(students);
});

// Get student by id
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) {
        return res.status(404).send('Student not found');
    }
    res.json(student);
});

// Add a new student
app.post('/students', (req, res) => {
    const { id, name, age } = req.body;
    if (!id || !name || !age) {
        return res.status(400).send('Please provide id, name, and age');
    }
    const newStudent = { id, name, age };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// Edit student details
app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    const student = students.find(s => s.id === parseInt(id));
    if (!student) {
        return res.status(404).send('Student not found');
    }
    student.name = name || student.name;
    student.age = age || student.age;
    res.json(student);
});

// Delete student by id
app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    const index = students.findIndex(s => s.id === parseInt(id));
    if (index === -1) {
        return res.status(404).send('Student not found');
    }
    students.splice(index, 1);
    res.sendStatus(204);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
