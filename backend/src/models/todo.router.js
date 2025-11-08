const { Router } = require('express');
const todoController = require('./todo.controller');

const todoRouter = Router();

todoRouter.get('/nc', todoController.getNotCompleted);
todoRouter.get('/c', todoController.getCompleted);
todoRouter.post('/', todoController.postTodo);
todoRouter.patch('/:id', todoController.pathTodo);
todoRouter.delete('/:id', todoController.deleteTodo);

module.exports = todoRouter;
