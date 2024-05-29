import express from 'express'
import bodyParser from 'body-parser';
import authRouter from './routes/authRouter.js';
import productRouter from './routes/productRouter.js'
import reportRouter from './routes/reportRouter.js';
import cors from 'cors';
import testRouter from './routes/testRouter.js';
import fileUpload from 'express-fileupload';
import cookieParser from'cookie-parser';
import orderRouter from './routes/orderRouter.js';
const app = express();
const port = process.env.PORT;  // place this on secrets later

app.use(cors({origin:true, credentials:true}));
app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload({
    useTempFiles:true
}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

authRouter(app);
productRouter(app);
testRouter(app);
reportRouter(app);
orderRouter(app);

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});