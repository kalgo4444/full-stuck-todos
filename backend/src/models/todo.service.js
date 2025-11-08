const todoSchema = require('./todo.schema');

class TodoService {
  async getNC(username) {
    const response = await todoSchema.find({
      username: username,
      completed: false,
    });
    return response;
  }

  async getC(username) {
    const response = await todoSchema.find({
      username: username,
      completed: true,
    });
    return response;
  }

  async post(body) {
    const response = await todoSchema.create(body);
    return response;
  }

  async patch(id) {
    const response = await todoSchema.findByIdAndUpdate(
      id,
      {
        completed: true,
      },
      { new: true },
    );
    return response;
  }

  async delete(id) {
    const response = await todoSchema.findByIdAndDelete(id);
    return response;
  }
}

module.exports = new TodoService();
