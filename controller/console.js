const Consoles = require('../model/console.js');

exports.listarConsoles = async (req, res) => {
    try {
        const consoles = await Consoles.find({});
        res.send(consoles);
    } catch (erro) {
        console.log(erro);
        res.send({ msg: '[ERRO]: Erro ao listar!', detalhes: erro });
    }
}

exports.adicionarConsole = async (req, res) => {
    const novoConsole = req.headers;
    if (!novoConsole.nome || !novoConsole.fabricante || !novoConsole.ano_lancamento || !novoConsole.geracao) {
        res.send({ msg: '[ERRO]: Informar nome, fabricante, ano de lançamento e geração!' });
    } else {
        try {
            await Consoles.create(novoConsole);
            res.send({ msg: '[SUCESSO]: Console adicionado!' });
        } catch (erro) {
            console.log(erro);
            res.send({ msg: '[ERRO]: Erro ao cadastrar', detalhes: erro });
        }
    }
}

exports.editarConsole = async (req, res) => {
    const console = req.headers;
    if (!console.nome || !console.fabricante || !console.ano_lancamento || !console.geracao) {
        return res.send({ msg: '[ERRO]: Informar nome, fabricante, ano de lançamento e geração!' });
    }
    try {
        const consoleEditado = await Consoles.findOneAndUpdate({ nome: console.nome }, console);
        if (consoleEditado == null)
            res.send({ msg: '[AVISO]: Console não existe no BD!' });
        else
            res.send({ msg: '[SUCESSO]: Console editado!' });
    } catch (erro) {
        console.log(erro);
        res.send({ msg: '[ERRO]: Erro ao editar', detalhes: erro });
    }
}

exports.removerConsole = async (req, res) => {
    const console = req.headers;
    if (!console.nome)
        return res.send({ msg: '[ERRO]: Informar nome!' });
    try {
        const consoleRemovido = await Consoles.findOneAndDelete({ nome: console.nome });
        if (consoleRemovido == null)
            res.send({ msg: '[AVISO]: Console não existe no BD!' });
        else
            res.send({ msg: '[SUCESSO]: Console removido!' });
    } catch (erro) {
        console.log(erro);
        res.send({ msg: '[ERRO]: Erro ao remover', detalhes: erro });
    }
}
