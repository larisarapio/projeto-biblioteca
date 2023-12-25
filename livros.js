const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

const livros = [
    {
        nome: 'O milagre da manhã',
        autor: 'Hal Elrod',
        categoria: 'Motivacional'
    },
    {
        nome: 'Inteligência Emocional',
        autor: 'Daniel Goleman',
        categoria: 'Psicologia'
    },
    {
        nome: 'É Assim que Começa',
        autor: ' Colleen Hover',
        categoria: 'Mais vendidos'
    }
]

function mostraLivros(request, response){
    response.json(livros)
}

function mostraPorta(){
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/livros', mostraLivros))
app.listen(porta, mostraPorta)