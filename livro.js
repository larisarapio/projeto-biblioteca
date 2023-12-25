const express = require ("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraLivro(request, response){
    response.json({
        nome: 'O milagre da manhã',
        autor: 'Hal Elrod',
        categoria: 'Motivacional'
    })
}

function mostraPorta(){
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/livro', mostraLivro))
app.listen(porta, mostraPorta)