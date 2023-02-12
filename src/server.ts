import express from 'express';
import cors from 'cors';
import routes from './public-api/routes';
import('./scripts/mongo-setup');
const app = express();
const port = process.env.port || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.get('/health',(req,res)=>{
    res.json(req.body);
});
app.get('/',(req,res)=>{
    res.send("Server Started");
});

app.listen(port,()=>{
    console.log(`Server started on ${port}`)
});
