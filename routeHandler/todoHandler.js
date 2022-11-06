const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model('Todo', todoSchema);

// GET ACTIVE TODOS --> instance method
router.get('/active', async (req, res) => {
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).json({
        data,
    });
});

// GET ACTIVE TODOS --> instance method
router.get('/active-callback', async (req, res) => {
    const todo = new Todo();
    todo.findActiveCallback((err, data) => {
        res.status(200).json({
            data,
        });
    });
});

// GET ACTIVE TODOS --> static method
router.get('/js', async (req, res) => {
    const data = await Todo.findByJs();
    res.status(500).json({
        data,
    });
});

// GET ACTIVE TODOS
router.get('/language', async (req, res) => {
    const data = await Todo.find().byLanguage('react');
    res.status(500).json({
        data,
    })
});

// GET A TODO
router.get('/', (req, res) => {
    Todo.find({status: 'active'}, (err, data) => {
        if(err) {
            res.status(500).json({
                error: 'There was a server side error!'
            })
        } else {
            res.status(500).json({
                result: data,
                message: 'Success'
            })
        }      
    });
});

// GET A TODO by ID
router.get('/:id', async (req, res) => {
    try {
        const data = await Todo.find({_id: req.params.id});
        res.status(500).json({
            result: data,
            message: 'Success'
        });
    } catch(err) {
        res.status(500).json({
            error: 'There was a server side error!'
        });
    }
});

// POST A TODO
router.post('/', (req, res) => {
    const newTodo = new Todo(req.body);
    newTodo.save((err) => {
        if(err){
            res.status(500).json({
                error: 'There was a server side!'
            });
        } else {
            res.status(200).json({
                message: 'Todo insert successfully'
            });
        }
    });
});

// POST MULTIPLE TODO
router.post('/all', (req, res) => {
    Todo.inserMany(req.body, (err) => {
        if(err) {
            res.status(500).json({
                error: 'There was a server side error!'
            });
        } else {
            res.status(500).json({
                message: 'Todos were inserted'
            });
        }
    });
});

// PUT A TODO
router.put('/:id', (req, res) => {
    Todo.updateOne({_id: req.params.id}, {
        $set: {
            status: 'active'
        }
    }, (err) => {
        if(err) {
            res.status(500).json({
                error: 'There was a server side error!'
            })
        } else {
            res.status(500).json({
                message: 'Todo was successfully updated'
            })
        }
    })
});

// DELETE A TODO
router.delete('/:id',(req, res) => {
    Todo.deleteOne({_id: req.params.id}, (err) => {
        if(err) {
            res.status(500).json({
                error: 'There was a server side error!'
            })
        } else {
            res.status(500).json({
                message: 'Success'
            })
        }      
    });
});

module.exports = router;