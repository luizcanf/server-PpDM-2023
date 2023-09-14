const express = require('express');
const app = express()
const fs = require("fs")
app.use(express.urlencoded({ extended: true }))

app.post('/', (req, res) => {
    /*Nome, Sobrenome, CPF, RG, E-mail, Telefone, Profissão,
     Cidade, Senha
Data de Nascimento
Estado*/
    const dados = JSON.stringify(req.body)
    const nomeArq = `${req.body.email}.json`
    fs.writeFileSync(nomeArq, dados)
    res.send({msg: "Usuário cadastrado com sucesso."});
})

app.get('/lista', (req, res) => {
    fs.readdir(__dirname, (err, files) => {
        if (err) console.log(err);
        var newfiles = files.filter(data => data.includes('.json'))
        console.log(newfiles);
        res.send({ usuarios: newfiles })
    })
})

app.get('/delete/:email', (req, res) => {
    var dados = req.params.email
    fs.unlinkSync(dados)
    res.send({msg: "Usuário cadastrado com sucesso."})
})

port = 8080
app.listen(port)
console.log(`Servidor de PpDM rodando em http://localhost:${port}`)