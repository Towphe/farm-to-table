import express from 'express'
import bodyParser from 'body-parser';
import authRouter from './routes/authRouter.js';
import cors from 'cors';
import cookieParser from'cookie-parser';

const app = express();
const port = process.env.PORT;  // place this on secrets later
app.use(cors({origin:true, credentials:true}));

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

authRouter(app);

app.get("/", (req, res) => {
    res.send("Hello, world!");
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});