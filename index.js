const express = require('express');
const PostsRouter = require('./PostsRouter');
const server = express();

server.use(express.json());
server.use('/api/posts', PostsRouter);

server.get('/', (req, res) => {
    res.send({ api: 'up....' });
});
const port = 4000
server.listen(port, () => console.log(`API on port ${port}`));