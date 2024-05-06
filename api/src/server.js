import express from 'express'
import testRouter from './routes/testRouter.js';

const app = express();
const port = process.env.PORT;  // place this on secrets later

app.use(express.json());
app.use(express.urlencoded({extended: false}));

testRouter(app);

app.get("/", (req, res) => {
    res.send("Hello, world!");
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});