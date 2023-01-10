const express = require('express')
const routes = express.Router()
const TaskController = require('../controllers/TaskController')

routes.get('/', TaskController.getAllTasks)
routes.get('/:method', TaskController.getAllTasks)
routes.post('/create', TaskController.createTask)
routes.get('/getById/:id/:method', TaskController.getById)
routes.post('/updateOne/:id', TaskController.updateTask)
routes.get('/deleteOne/:id', TaskController.deleteTask)
routes.get('/check/:id', TaskController.checkTask)




module.exports = routes