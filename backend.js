
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000
const host = 
app.use(cors());






app.get('/', (req, res) => {
    console.log("Hello World");
    res.send("Hello World");
 });

app.listen(port, host, () =>{
    console.log(`App is listening on Port ${port}`)
});


