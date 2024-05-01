// server.ts
import * as jsonServer from 'json-server';
import * as bodyParser from 'body-parser';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(bodyParser.json());

server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  console.log(id);
  const task = req.body;

  // Add task to the project with the specified id
  // You'll need to implement this logic based on how you're managing your data
  // For example, you might push the new task to the tasks array of the project
  
  // Then send a response
  res.status(201).json(task);
});

server.use(router);
server.listen(8000, () => {
  console.log('JSON Server is running');
});
