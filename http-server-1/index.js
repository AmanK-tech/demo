// @ts-check
const express = require("express");
const { get } = require("express/lib/response");
const port = 3000;

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//     res.send("hello world")
// });

// app.listen(port);

const todos = [
  { id: 1, title: "Buy groceries", description: "Milk, bread, eggs", completed: false },
  { id: 2, title: "Finish homework", description: "Math exercises", completed: true }
];


app.get('/todos', (req, res) => {
    res.status(200).json(todos);
});

app.get('/todos/:id', (req, res) => {
    
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id == id);

    if(todo){
        res.status(200).json(todo)
    }
    else {
        res.status(404).send("ERROR: Todo not found");
    }
});

let currentid = todos.length
app.post('/todos', (req, res) => {
    const {title,description,completed} = req.body;

    if(!description || !title){
        return res.status(400).send("BOTH TITLE AND DES ARE REQUIRED");
    }

    const newtodo = {
        id : ++currentid,
        title,
        description,
        completed: completed ?? false

    }

    todos.push(newtodo);

    res.status(201).json({id:newtodo.id});
    
});


app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).send("NOT FOUND"); 
    }

    const { title, description, completed } = req.body;
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;

    res.status(200).json(todo);
});


app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).send("ERROR: Todo not found");
    }

    todos.splice(index, 1); // Remove from array
    res.status(200).send("Todo deleted successfully");
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


