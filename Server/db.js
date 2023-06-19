const SENHA = 'password'
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

async function selectFilterJogo(values) {
    let order = '';
    let jogadores = null;
    let arbitro = null;
    let hotel = null;
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
      if (property === 'Arbitro' && values[`${property}`] !== '') {
        arbitro = values[`${property}`];
        b = true;
      }
      if (property === 'Hotel' && values[`${property}`] !== '') {
        hotel = values[`${property}`];
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
  
    const query = `SELECT 
                      J.*,
                      JB.NomeAssoc AS JogadorB, 
                      JP.NomeAssoc AS JogadorP,
                      A.NomeAssoc AS Arbitro, 
                      CONCAT(H.NomeHotel, ' - ', H.EndHotel) AS Lugar,
                      COUNT(M.CODJOGO) AS QtdMovimento 
                  FROM Jogo J 
                  INNER JOIN Participante A ON A.NumAssoc = J.NumArb
                  INNER JOIN Participante JB ON JB.NumAssoc = J.JogadorB 
                  INNER JOIN Participante JP ON JP.NumAssoc = J.JogadorP 
                  INNER JOIN Salao S ON S.IdSal = J.IdSal
                  INNER JOIN Hotel H ON H.NomeHotel = S.NomeHotel 
                  INNER JOIN Movimento M ON J.CODJOGO = M.CODJOGO GROUP BY J.CODJOGO 
                   ${b ? `WHERE ${jogadores !== null ? `((JogadorB LIKE '%${jogadores}%') OR (JogadorP LIKE '%${jogadores}%'))` : ''} 
                           ${arbitro !== null && jogadores !== null ? 'AND ' : ''}
                           ${arbitro !== null ? `Arbitro LIKE '%${arbitro}%'` : ''}
                           ${hotel !== null && (jogadores !== null || arbitro !== null) ? 'AND ' : ''}
                           ${hotel !== null ? `H.NomeHotel LIKE '%${hotel}%'` : ''}
                           ${diaJorn !== null && (jogadores !== null || arbitro !== null || hotel !== null) ? 'AND ' : ''}
                           ${diaJorn !== null ? `J.DiaJorn = ${diaJorn}` : ''}
                           ${mesJorn !== null && (jogadores !== null || arbitro !== null || hotel !== null || diaJorn !== null) ? 'AND ' : ''}
                           ${mesJorn !== null ? `J.MesJorn = ${mesJorn}` : ''}
                           ${anoJorn !== null && (jogadores !== null || arbitro !== null || hotel !== null || diaJorn !== null || mesJorn !== null) ? 'AND ' : ''}
                           ${anoJorn !== null ? `J.AnoJorn = ${anoJorn}` : ''}`
        : ''} 
                  ORDER BY J.CodJogo ${order}`;
  
    const conn = await connect();
    const [rows] = await conn.query(query);
    return rows;
}

async function selectQtdJogosByQtdMovimentos(){
    const conn = await connect(); 
    const [rows] = await conn.query(`SELECT * FROM `); 
    return rows;
}

async function selectNumJogadoresPorPais(){
    const conn = await connect(); 
    const [rows] = await conn.query(`SELECT P.*, COUNT(*) AS NumJogadores FROM Pais P INNER JOIN `); 
    return rows;
}


module.exports = {selectAll, selectFilterJogo, selectQtdJogosByQtdMovimentos, }
