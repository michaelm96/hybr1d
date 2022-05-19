require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.get('/', () => {
    console.log(`Success`);
})
app.use(routes);

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});