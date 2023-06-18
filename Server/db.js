const SENHA = 'root'
async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection(`mysql://root:${SENHA}@localhost:3306/xadrez`);
    console.log('Conectou no mysql');
    return connection;
}


async function selectAll(str){
    const conn = await connect(); 
    const [rows] = await conn.query(`SELECT * FROM ${str}`); 
    return rows;
}

async function selectJogoByNumMovimentos(){
    const conn = await connect();
    const query = "SELECT J.CODJOGO, COUNT(M.CODJOGO) QTD FROM JOGO J INNER JOIN MOVIMENTO M ON J.CODJOGO = M.CODJOGO GROUP BY J.CODJOGO"
    const [rows] = await conn.query(query); 
    return rows;
}

async function selectFilterJogo(values) {
    let order = '';
    let jogadores = null;
    let arbitros = null;
    let local = null;
    let diaJorn = null;
    let mesJorn = null;
    let anoJorn = null;
    let b = false;
  
    for (const property in values) {
      if (property === 'Ordem') {
        order = values[`${property}`];
      }
      if (property === 'Jogadores' && values[`${property}`] !== '') {
        jogadores = values[`${property}`];
        b = true;
      }
      if (property === 'Arbitros' && values[`${property}`] !== '') {
        arbitros = values[`${property}`];
        b = true;
      }
      if (property === 'Local' && values[`${property}`] !== '') {
        local = values[`${property}`];
        b = true;
      }
      if (property === 'DiaJorn' && values[`${property}`] !== '') {
        diaJorn = values[`${property}`];
        b = true;
      }
      if (property === 'MesJorn' && values[`${property}`] !== '') {
        mesJorn = values[`${property}`];
        b = true;
      }
      if (property === 'AnoJorn' && values[`${property}`] !== '') {
        anoJorn = values[`${property}`];
        b = true;
      }
    }
  
    const query = `SELECT J.* FROM Jogo J 
                   INNER JOIN Jogador J1 ON J1.NumAssoc = J.NumArb
                   INNER JOIN Salao S ON S.IdSal = J.IdSal
                   ${b ? `WHERE ${jogadores !== null ? `J1.NomeAssoc = '${jogadores}'` : ''} 
                           ${arbitros !== null && jogadores !== null ? 'AND ' : ''}
                           ${arbitros !== null ? `J.NumArb = ${arbitros}` : ''}
                           ${local !== null && (jogadores !== null || arbitros !== null) ? 'AND ' : ''}
                           ${local !== null ? `S.NomeHotel = '${local}'` : ''}
                           ${diaJorn !== null && (jogadores !== null || arbitros !== null || local !== null) ? 'AND ' : ''}
                           ${diaJorn !== null ? `J.DiaJorn = ${diaJorn}` : ''}
                           ${mesJorn !== null && (jogadores !== null || arbitros !== null || local !== null || diaJorn !== null) ? 'AND ' : ''}
                           ${mesJorn !== null ? `J.MesJorn = ${mesJorn}` : ''}
                           ${anoJorn !== null && (jogadores !== null || arbitros !== null || local !== null || diaJorn !== null || mesJorn !== null) ? 'AND ' : ''}
                           ${anoJorn !== null ? `J.AnoJorn = ${anoJorn}` : ''}`
        : ''} 
                   ORDER BY J.CodJogo ${order}`;
  
    const conn = await connect();
    const [rows] = await conn.query(query);
    return rows;
  }



module.exports = {selectAll, selectJogoByNumMovimentos, selectFilterJogo}


