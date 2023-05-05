const mysql = require("mysql2/promise");

// função que cria uma conexão com o banco
async function connect() {
	// verificar se já tem objeto de conexao na seção de uso
	if (global.connection && global.connection.state !== "disconnected") {
		return global.connection;
	}

	//cria uma conexao
	const conexao = await mysql.createConnection({
		host: "localhost",
		port: 3306,
		user: "root",
		password: "",
		database: "tarefas",
	});

	// avisa no console
	console.log("Conexao com o BD foi criada");

	//guarda objeto de conexao para a seção de uso
	global.connection = conexao;

	// retorna a conexao com o bd
	return global.connection;
}

// função que busca as tarefas
async function recuperarTarefas() {
	// pega ou cria uma conexão
	const con = await connect();

	const query = `SELECT tarefas.tarefatexto AS tarefa, GROUP_CONCAT(subtarefas.subtarefatexto) AS subtarefas FROM tarefas INNER JOIN subtarefas ON tarefas.id = subtarefas.tarefa_id GROUP BY tarefas.id, tarefas.tarefatexto`;

	const [results] = await con.query(query);

	const json = results.map((result) => {
		const { tarefa, subtarefas } = result;
		return { tarefa, subtarefas: subtarefas.split(",") };
	});

	// retorna o json da consulta
	return json;
}

async function recuperarTarefa(id) {
	// pega ou cria uma conexão
	const con = await connect();

	const query = `SELECT tarefas.tarefatexto AS tarefa, GROUP_CONCAT(subtarefas.subtarefatexto) AS subtarefas FROM tarefas INNER JOIN subtarefas ON tarefas.id = subtarefas.tarefa_id WHERE tarefas.id = ${id} GROUP BY tarefas.id, tarefas.tarefatexto`;

	const [results] = await con.query(query);

	const json = results.map((result) => {
		const { tarefa, subtarefas } = result;
		return { tarefa, subtarefas: subtarefas.split(",") };
	});

	// retorna o json da consulta
	return json;
}

// aqui vao outras funções de manipulação do BD
async function cadastrarTarefa(tarefa) {
	const con = await connect();
	const query = "INSERT INTO tarefas(tarefatexto) VALUES (?);";
	return await con.query(query, [tarefa.tarefa]);
}

async function editarTarefa(tarefa) {
	const con = await connect();
	const query = `UPDATE tarefas SET tarefatexto = ? where id = ${tarefa.tarefaId};`;
	return await con.query(query, [tarefa.tarefa]);
}

// executa a função connect
connect();
//exporta funções
module.exports = {
	recuperarTarefas,
	recuperarTarefa,
	cadastrarTarefa,
	editarTarefa,
};
