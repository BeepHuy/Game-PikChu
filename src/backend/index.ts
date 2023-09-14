import express from "express";
import path from "path";
import {Request, Response} from "express";


const app = express();
// app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "templates");
app.use('/assets', express.static(path.join("dist/frontend")));
app.use('/', express.static(path.join("public")));
app.get('/board', (req: Request, res: Response) => {
    res.render('index', {});
});
app.get('/', (req: Request, res: Response) => {
    res.render('login', {});
});
app.get('/login', (req: Request, res: Response) => {
    res.render('login', {});
});

app.listen(3000, ()=> {
    console.log('Server is listing at 3000');
})