const express = require('express');
const server = express();

server.use(express.json())

const projects=[]
let count=0;

//Middleware
server.use((req,res,next)=>{
    count++;

    console.log(`Metodo: ${req.method}; URL:${req.url}`)
    
    console.log(`qtd:${count}`)
    
    return next();
})

function checkProjectExists(req,res,next){
    const {id} = req.params
    const project = projects.find(project => project.id == id)
    
    if(!project){
        return res.status(400).json({ erros:'User name is required'})
    }    
    
    return next();
}

server.get('/projects',(req,res)=>{
    return res.json(projects);
})

server.get('/projects/:id',checkProjectExists,(req,res)=>{
    const {id} = req.params

    const project = projects.find(project => project.id == id);
    
    return res.json(project)
})

server.post('/projects',(req,res)=>{
    const {title,id} = req.body

    const project = {
        id,
        title,
        task:[]
    }
    
    projects.push(project);

    return res.json(projects);
})

server.post('/projects/:id/task',checkProjectExists,(req,res)=>{
    const {id} = req.params
    const {title} = req.body

    const project = projects.find(project => project.id == id);
    
    console.log(project)
    project.task.push(title);

    return res.json(projects);
})

server.put('/projects/:id',checkProjectExists,(req,res)=>{
    const {id} = req.param
    const {title} = req.body

    console.log(title)
    const project = projects.find(project => project.id == id);
    
    project.title = title;

    return res.json(project);
})

server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
  
    const projectIndex = projects.findIndex(p => p.id == id);
  
    projects.splice(projectIndex, 1);
  
    return res.send();
});
server.listen('3000')