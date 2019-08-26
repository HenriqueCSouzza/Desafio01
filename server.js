const express = require('express');
const server = express();

server.use(express.json())

const projects=[]

server.get('/projects',(req,res)=>{
    return res.json(projects);
})

server.get('/projects/:id',(req,res)=>{
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

server.post('/projects/:id/task',(req,res)=>{
    const {id} = req.params
    const {title} = req.body

    const project = projects.find(project => project.id == id);
    
    console.log(project)
    project.task.push(title);

    return res.json(projects);
})

server.put('/projects/:id',(req,res)=>{
    const {id} = req.param
    const {title} = req.body

    console.log(title)
    const project = projects.find(project => project.id == id);
    
    project.title = title;

    return res.json(project);
})

server.listen('3000')