const express = require("express");
const server = express();
server.use(express.json());
var requires = 0;

//{id:"1", title:"Novo Projeto", task:[]}
var projects = [];

//checa a existencia da id
function checkProjectID(req,res,next) {
  const {id} = req.params;
  if(!projects.find(p => p.id === id)){
    return res.status(400).send({erro : "project id not fount"});
  }

  return next();
}

//log da quantidade de requisições
server.use((req,res,next)=>{
  requires++;
  console.log(`numero de requisoes : ${requires}`);
  return next();
})

//Cadastrar projetos
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

//Retorna lista de projetos
server.get("/projects",(req,res)=>{
  return res.json(projects);
})

//Altera titulo do projeto
server.put("/projects/:id", checkProjectID,(req,res)=>{
  const {id} = req.params;
  const {title} = req.body;

  const project = projects.find(p => p.id === id);
  project.title = title;

  return res.json(project);
})

//deletar projeto
server.delete("/projects/:id", checkProjectID,(req,res)=>{
  const {id} = req.params;
  const index = projects.findIndex(p => p.id === id);
  projects.splice(index,1);

  return res.send();
})

//inserir tarefa
server.post("/projects/:id/task", checkProjectID,(req,res)=>{
  const {id} = req.params;
  const {title} = req.body;

  let project = projects.find(p => p.id === id);
  project.task.push(title);

  return res.json(project);
})


server.listen(777);