// configuraão do banco de dados
// importar o sqlite 3
const sqlite3 = require('sqlite3')
// importar o open do sqlite
const { open } = require('sqlite')

//conexão do banco de dados / abertura
module.exports = () => 
  open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });


