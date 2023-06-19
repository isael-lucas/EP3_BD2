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

server.get('/jogos', async (req, res)=>{
    const jogos = await db.selectFilterJogo(null);
    res.send(jogos);
    console.log('Caiu');
})
server.post('/jogos', jsonParser, async (req, res)=>{
    console.log('body:');
    console.log(req.body);
    const jogos = await db.selectFilterJogo(req.body);
    res.send(jogos);
    console.log('Caiu');
})

server.get('/jogos_mov', jsonParser, async (req, res)=>{
    const objetos = await db.selectJogosQtdMovimentos();
    res.send(objetos);
    console.log('Caiu');
})

server.get('/jogos_count_mov', jsonParser, async (req, res)=>{
    const objetos = await db.selectQtdJogosByQtdMovimentos();
    res.send(objetos);
    console.log('Caiu');
})

server.get('/graphics', jsonParser, async (req, res)=>{
    const objetos = await db.selectFilterJogo();
    res.send(objetos);
    console.log('Caiu');
})

