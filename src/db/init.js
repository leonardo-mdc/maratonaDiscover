// settings iniciais do banco de dados
// criacao de tabelas

//importar config do banco de dados
const Database = require('./config');

const initDb = {

  async init() {

    // handler do banco de dados em DB
    const db = await Database() // iniciando a concexão do bd

    //enviar query SQL
    await db.exec(
      `CREATE TABLE profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avatar TEXT,
      monthly_budget INT,
      days_per_week INT,
      hours_per_day INT,
      vacation_per_year INT,
      value_hour INT)`
    );

    await db.exec(
      `CREATE TABLE jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      daily_hours INT,
      total_hours INT,
      created_at DATETIME)`
    );

    await db.run(
      `INSERT INTO profile (
      name,
      avatar,
      monthly_budget,
      days_per_week,
      hours_per_day,
      vacation_per_year,
      value_hour
      ) VALUES (
      "Leonardo",
      "https://github.com/leonardo-mdc",
      3000,
      5,
      5,
      4,
      75)`
    );

    await db.run(
      `INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
      ) VALUES (
      "Pizzaria Guloso",
      2,
      1,
      1617514376018)`
    );

    await db.run(
      `INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
      ) VALUES (
      "OneTwo Project",
      3,
      17,
      1617814376018)`
    );


    await db.close() // encerrando comm db
  }
}

initDb.init()