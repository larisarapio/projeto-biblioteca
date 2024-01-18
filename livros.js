const express = require("express")
const router = express.Router()
const cors = require('cors') //aqui estou trazendo o pacote cors que permite consumir essa api no front-end
const conectaBancoDeDados = require('./bancoDeDados.js')
conectaBancoDeDados()

const Livro = require('./livrosModel')

const app = express() //iniciando app
app.use(express.json())  //dados vão trafegar em formato json
app.use(cors())

const porta = 3333 //criando porta

// GET
async function mostraLivro(request, response){
    try {
        const livrosVindosDoBancoDeDados = await Livro.find()

        response.json(livrosVindosDoBancoDeDados)
    } catch (erro){
        console.log(erro)
    }
}

// POST
async function criaLivro(request, response){
    const novoLivro = new Livro({
        nome: request.body.nome,
        autor: request.body.autor,
        categoria: request.body.categoria
    })

    try{
        const livroCriado = await novoLivro.save()
        response.status(201).json(livroCriado)
    }catch(erro){
        console.log(erro)
    }

}

// PATCH
async function corrigeLivro(request, response){
    try{
        const livroEncontrado = await Livro.findById(request.params.id)

        if (request.body.nome){
            livroEncontrado.nome = request.body.nome
        }

        if (request.body.autor){
            livroEncontrado.autor = request.body.autor
        }

        if (request.body.categoria){
            livroEncontrado.categoria = request.body.categoria
        }

        const livroAtualizadoNoBancoDeDados = await livroEncontrado.save()

        response.json(livroAtualizadoNoBancoDeDados)

    }catch(erro){
        console.log(erro)
    }
}

// DELETE
async function deletaLivro(request, response){
    try{
        await Livro.findByIdAndDelete(request.params.id)
        response.json({ messagem:'Livro deletado com sucesso!'})

    }catch(erro){
        console.log(erro)
    }
}

app.use(router.get('/livros', mostraLivro))
app.use(router.post('/livros', criaLivro))
app.use(router.patch('/livros/:id', corrigeLivro))
app.use(router.delete('/livros/:id', deletaLivro))

function mostraPorta(){
    console.log("Servidor criado e rodando na porta ", porta)
}

app.listen(porta, mostraPorta)