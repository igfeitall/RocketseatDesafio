const express = require("express");
const server = express();
server.use(express.json());

//{id:"1", title:"Novo Projeto", task:[]}
var projects = [];

server.post("/projects",(req,res)=>{
  var {id, title} = req.body;
  id = id.toString();

  const project = {
    id,
    title,
    task : []
  };

  projects.push(project);
  return res.send(project);
})

server.get("/projects",(req,res)=>{
  return res.json(projects);
})

server.put("/projects/:id",(req,res)=>{
  const {id} = req.params;
  const {title} = req.body;

  const project = projects.find(p => p.id === id);
  project.title = title;

  return res.json(project);
})

server.listen(777);