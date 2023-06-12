const db = require('./db')
const app = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const server = app()

const jsonParser = bodyParser.json()

server.use(cors())

server.listen(3000, ()=> {
    console.log('Servidor Iniciado na porta 3000');
});

server.get('/objects', async (req, res)=>{
    const objetos = await db.selectAll('OBJETOS_ARTE');
    res.send(objetos);
    console.log('Caiu');
})
server.post('/objects', jsonParser, async (req, res)=>{
    console.log('body:');
    console.log(req.body);
    const objetos = await db.selectFilter(req.body);
    res.send(objetos);
    console.log('Caiu');
})

server.get('/collections', async (req, res)=>{
    const objetos = await db.selectAllCollections();
    res.send(objetos);
    console.log('Caiu');
})
server.post('/collections', jsonParser, async (req, res)=>{
    console.log('body:');
    console.log(req.body);
    const objetos = await db.selectFilterCollection(req.body);
    res.send(objetos);
    console.log('Caiu');
})

server.get('/purchases', async (req, res)=>{
    const objetos = await db.selectAllPurchases();
    res.send(objetos);
    console.log('Caiu');
})
server.post('/purchases', jsonParser, async (req, res)=>{
    console.log('body:');
    console.log(req.body);
    const objetos = await db.selectFilterPurchase(req.body);
    res.send(objetos);
    console.log('Caiu');
})

server.get('/graphics', jsonParser, async (req, res)=>{
    const objetos = await db.selectAllPurchases();
    res.send(objetos);
    console.log('Caiu');
})

