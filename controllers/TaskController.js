const Task = require("../models/Task");

let message = "";
let type = "";

const getAllTasks = async (req, res) => {
  setTimeout(() => {
    message = "";
  }, 1000);

  try {
    if (req.params.method == "pending") {
      const tasksList = await Task.find({ status: "false" });
      return res.render("index", {
        tasksList,
        task: null,
        taskDelete: null,
        message,
        type,
      });
    }
    if (req.params.method == "done") {
      const tasksList = await Task.find({ status: "true" });
      return res.render("index", {
        tasksList,
        task: null,
        taskDelete: null,
        message,
        type,
      });
    }
    const tasksList = await Task.find();
    res.render("index", {
      tasksList,
      task: null,
      taskDelete: null,
      message,
      type,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const createTask = async (req, res) => {
  const task = req.body;

  if (task.task.trim() === "") {
    message = "Campo obrigatorio, por favor preencher!";
    type = "danger";
    return res.redirect("/");
  }

  try {
    await Task.create(task);
    message = "Tarefa inserida com sucesso!";
    type = "success";
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });
    message = "Tarefa EXCLUIDA com sucesso!";
    type = "success";
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const tasksList = await Task.find();
    if (req.params.method == "update") {
      const task = await Task.findOne({ _id: req.params.id });
      res.render("index", {
        task,
        taskDelete: null,
        tasksList,
        message: "",
        type: "",
      });
    }
    if (req.params.method == "delete") {
      const taskDelete = await Task.findOne({ _id: req.params.id });
      res.render("index", {
        task: null,
        taskDelete,
        tasksList,
        message: "",
        type: "",
      });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = req.body;
    await Task.updateOne({ _id: req.params.id }, task);
    message = "Tarefa ALTERADA com sucesso!";
    type = "success";
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
    message = "Nao foi possivel alterar a tarefa!";
    type = "danger";
  }
};

const checkTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    if (task.status) {
      task.status = false;
    } else {
      task.status = true;
    }

    await Task.updateOne({ _id: req.params.id }, task);
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getById,
  updateTask,
  deleteTask,
  checkTask,
};
