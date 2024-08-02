let express = require('express')
let path = require('path')

const app = express();
const PORT = 3000;

app.use('/static', express.static(path.join(__dirname, '/static')))
app.use('/modules', express.static(path.join(__dirname, '/modules')))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
