const express = require('express'); //import express;
const dataB = require('./data/db.js');
const server = express();

server.use(express.json()); //middleware -- express to parse JSON body
let postId = 5; //id numbers starts from here

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up....' });
});

//---------GET REQUEST---------
server.get('/api/posts', (req, res) => {
    dataB('posts')
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch();
    // res.status(200).json(posts);
});

server.post('/api/posts', (req, res) => {
    const bpost = req.body;
    const { title, contents } = req.body;

    if (title && contents) {
        dataB
            .insert(bpost)
            .then(Objres => {
                res.json(Objres);
                res.status(201); //created
            })
            .catch(err => {
                res.render(err);
                res.render.status(500);
            });
    } else {
        res.status(400).json({
            errorMessage: 'Please provide title and contents for the post.',
        });
    }

    //add the new id
    bpost.id = postId++;
    posts.push(bpost);

    res.status(200).json(posts);
});

server.get('/api/posts/:id/comments', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    dataB
        .findById(id, changes)
        .then(upd => {
            if (upd) {
                res.status(200).json(upd);
            } else {
                res.status(404).json({ message: 'hub not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error removed the hub' });
        });

});

//---------DELETE REQUEST---------
server.delete('/api/posts/:id', (req, res) => {
    //(:id is a string you have to convert into a number)
    const id = req.param.id;

    posts = posts.filter(p => p.id !== Number(id));

    res.status(200).json(posts);
});

server.put('/api/posts/:id', (req, res) => {
    res.status(200).json(posts);
});

//Export
module.exports = server;