const express = require('express');
const app = express()
const fs = require("fs")
app.use(express.urlencoded({ extended: true }))

app.post('/', (req, res) => {
    let usuario = {}
    usuario.nome = req.body.nome
    usuario.sobrenome = req.body.sobrenome
    usuario.dtNascimento = req.body.dtNascimento
    usuario.cpf = req.body.cpf
    usuario.rg = req.body.rg
    usuario.email = req.body.email
    usuario.senha = req.body.senha
    usuario.telefone = req.body.telefone
    usuario.cidade = req.body.cidade
    usuario.uf = req.body.uf
    const registro = JSON.stringify(usuario)
    const nomeArquivo = `${usuario.email}.json`
    fs.writeFileSync(nomeArquivo, registro)
    res.send({msg: "Usuário cadastrado com sucesso."});
})

app.get('/lista', (req, res) => {
    fs.readdir(__dirname, (err, files) => {
        if (err) {
            console.log(err);
            res.send({erro: true, msg: "Erro ao acessar a lista de usuários."});
        } else {
            var registros = files.filter(data => data.includes('.json'))
            res.send({ usuarios: registros })
        }
    })
})

app.get('/delete/:email', (req, res) => {
    var usuario = req.params.email
    fs.unlinkSync(`${usuario}.json`)
    res.send({msg: "Usuário cadastrado com sucesso."})
})

port = 8080
app.listen(port)
console.log(`Servidor de PpDM rodando em http://localhost:${port}`)
