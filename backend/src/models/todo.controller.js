const todoService = require('./todo.service');

class TodoController {
  async getNotCompleted(req, res) {
    try {
      const { username } = req.query;
      if (!username) throw new Error({ message: 'Username is empty' });
      const todo = await todoService.getNC(username);
      res.status(200).json(todo);
    } catch (error) {
      res.status(302).json(error);
    }
  }

  async getCompleted(req, res) {
    try {
      const { username } = req.query;
      if (!username) throw new Error({ message: 'Username is empty' });
      const todo = await todoService.getC(username);
      res.status(200).json(todo);
    } catch (error) {
      res.status(302).json(error);
    }
  }

  async postTodo(req, res) {
    try {
      const body = req.body;
      if (!body) throw new Error({ message: 'Body is empty' });
      const todo = await todoService.post(body);
      res.status(201).json(todo);
    } catch (error) {
      res.status(302).json(error);
    }
  }

  async pathTodo(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error({ message: 'ID is empty' });
      const todo = await todoService.patch(id);
      res.status(200).json(todo);
    } catch (error) {
      res.status(302).json(error);
    }
  }

  async deleteTodo(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error({ message: 'ID is empty' });
      const todo = await todoService.delete(id);
      res.status(200).json(todo);
    } catch (error) {
      res.status(302).json(error);
    }
  }
}

module.exports = new TodoController();
