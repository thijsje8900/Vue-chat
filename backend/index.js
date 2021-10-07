const express = require('express')
const cors = require('cors')
const Pusher = require("pusher");
//Variabeles

//Unieke key voor Pusher
const pusher = new Pusher({
    appId: "1275608",
    key: "3d4cf2aefca809e0f444",
    secret: "e980a16f6ded7df94a20",
    cluster: "eu",
    useTLS: true
});

const app= express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
}))

app.use(express.json())

app.post('/api/messages', async (req, res) => {
    await pusher.trigger("chat", "message", {
        username: req.body.username,
        message: req.body.message
    });

    res.json([]);
})

//Checken of er iets nieuws gepost is op port 8000
console.log('listening to port 8000');
app.listen(8000)
