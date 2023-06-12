const SENHA = 'Leo*270902'
async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection(`mysql://root:${SENHA}@localhost:3306/sys`);
    console.log('Conectou no mysql');
    return connection;
}


async function selectAll(str){
    const conn = await connect(); 
    const [rows] = await conn.query(`SELECT * FROM ${str}`); 
    return rows;
}

async function selectAllCollections(){
    const conn = await connect();
    const query = "SELECT A.*, COUNT(*) QTD FROM COLECAO A INNER JOIN EMPRESTADOS B ON A.NOME = B.COLECAO GROUP BY A.NOME ORDER BY QTD DESC"
    const [rows] = await conn.query(query); 
    return rows;
}

async function selectAllPurchases(){
    const conn = await connect();
    const query = "select * from objetos_arte A INNER JOIN PERMANENTES B ON A.NUMID = B.OBJETO_ARTE_ID"
    const [rows] = await conn.query(query); 
    return rows;
}

async function selectFilter(values){
    let aux = []
    let str = ''
    i = 0
    for (const property in values) {
        if (values[`${property}`] !== 'Todos' && values[`${property}`] !== null) {
            aux.push(values[`${property}`])
            str = `${str} ${i>0 && i!=Object.keys(values).length?'AND':''} ${property}=?`
            i=i+1
        }
    }
    const query = `SELECT * FROM objetos_arte ${aux.length>0?'WHERE':''}${str}`
    const conn = await connect();
    const [rows] = await conn.query(query, aux);
    return rows;
}

async function selectFilterCollection(values){
    let order = ''
    let mes = null
    let year = null
    let b = false
    for (const property in values) {
        if (property === 'Ordem') {
            order = values[`${property}`]
        }
        if (property === 'Mes' && values[`${property}`]!=='Todos') {
            mes = values[`${property}`]
            b = true

        }
        if (property === 'AnoCriacao' && values[`${property}`]!==null) {
            year = values[`${property}`]
            b = true
        }
    }
    const query = `SELECT A.*, COUNT(*) QTD FROM COLECAO A INNER JOIN EMPRESTADOS B ON A.NOME = B.COLECAO ${b?`WHERE ${year!==null?`YEAR(DATAEMPRESTIMO) = ${year}`:''}${mes!==null && year !== null?' AND ':''}${mes!==null?`MONTH(DATAEMPRESTIMO) = ${mes}`:''}`:''} GROUP BY A.NOME ORDER BY QTD ${order}`
    const conn = await connect();
    const [rows] = await conn.query(query);
    return rows;
}

async function selectFilterPurchase(values){
    let order = ''
    let mes = values.Mes
    let year = values.AnoCriacao
    let m = mes!==null&&mes!=='Todos'
    let y = year!==null
    const query = `select * from objetos_arte A INNER JOIN PERMANENTES B ON A.NUMID = B.OBJETO_ARTE_ID ${m|y?`WHERE ${y?`YEAR(DATAAQUISICAO) = ${year}`:''}${m&&y?' AND ':''}${m?`MONTH(DATAAQUISICAO) = ${mes}`:''}`:''}`
    const conn = await connect();
    const [rows] = await conn.query(query);
    return rows;
}

module.exports = {selectAll, selectFilter, selectAllCollections, selectFilterCollection, selectAllPurchases, selectFilterPurchase}


