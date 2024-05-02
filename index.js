//Req (request): coisas que vêm do frontend
//Res (response): coisas que vêm do backend

const express = require('express'); 
const bodyParser = require('body-parser');

const app = express(); 
app.use(bodyParser.json());

let livros = []

app.get('/livros', (req, res) => { 
    res.json(livros); 
});

app.get('/livros/:isbn', (req, res) => { 
    const { isbn } = req.params; 
    const livro = livros.find(l => l.isbn === isbn); 
    if (livro) { 
        res.json(livro); //json empacota em formato json para enviar ao frontend
    } else { 
        res.status(404).json({ message: 'Livro não encontrado.' }); 
    } 
});

app.post('/livros', (req, res) => { 
    const { isbn, editora, titulo, ano } = req.body; 
    const livro= { isbn, editora, titulo, ano }; 
    livros.push(livro); 
    res.status(201).json({ message: 'Livro cadastrado com sucesso.' }); 
});

app.put('/livros/:isbn', (req, res) => { 
    const { isbn } = req.params; 
    const { editora, titulo, ano } = req.body; 
    const livro= livros.find(v => v.isbn === isbn); 
    if (livro) { 
    livro.editora = editora || livro.editora; //O ou é pra abranger independente do modo como veio do frontend
    livro.titulo = titulo || livro.titulo; 
    livro.ano = ano || livro.ano; 
    res.json({ message: 'Informações do Livro atualizadas com sucesso.' });
    } else {
    res.status(404).json({ message: 'Livro não encontrado.' }); 
    } 
});

app.delete('/livros/:isbn', (req, res) => { 
    const { isbn } = req.params; 
    const livroIndex = livros.findIndex(v => v.isbn === isbn); 
    if (livroIndex !== -1) { 
        livros.splice(livroIndex, 1); //O 1 é só pra indicar que "remove" um item
        res.json({ message: 'Livro excluído com sucesso.' }); 
    } else { 
        res.status(404).json({ message: 'Livro não encontrado.' }); 
    } 
});

const port = 3000; 
    app.listen(port, () => { 
    console.log(`Servidor rodando em http://localhost:${port}`); 
});
    