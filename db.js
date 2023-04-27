const mysql = require("mysql2/promise");

// função que cria uma conexão com o banco
async function connect(){
    // verificar se já tem objeto de conexao na seção de uso
    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection;
    }

    //cria uma conexao
    const conexao = await mysql.createConnection({
        host : 'localhost',
        port : 3306,
        user : 'root',
        password : '',
        database : 'tarefas'
    });

    // avisa no console
    console.log("Conexao com o BD foi criada")

    //guarda objeto de conexao para a seção de uso
    global.connection = conexao;

    // retorna a conexao com o bd
    return global.connection;
}

// função que busca as tarefas
async function recuperarTarefas(){
    // pega ou cria uma conexão
    const con = await connect();

    // executa um SELECT no BD
    const [linhas] = await con.query("SELECT tarefas.id, tarefas.tarefatexto FROM tarefas JOIN subtarefas ON subtarefas.tarefa_id = tarefas.id");

    // retorna o resultado da consulta
    return linhas
}

// aqui vao outras funções de manipulação do BD


// execua a função connect
connect();

module.exports = { recuperarTarefas }