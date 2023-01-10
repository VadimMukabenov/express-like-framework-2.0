import App from "./core/App.js";
import Router from "./core/Router.js";
import parseJSON from './middlewares/parseJSON.js';
import bodyParser from './middlewares/bodyParser.js';
import params from './middlewares/params.js';

const PORT = process.env.PORT || 5000;
const app = new App();
const router = new Router();

app.use(parseJSON);
app.use(bodyParser);
app.use(params);

router.get('/users', (req, res) => {
    console.log(req.params.query)
    res.send(req.params.query);
});

router.post('/users', (req, res) => {
    console.log(req.body, "req.body from /users")
    res.send(req.body);
});

router.get('/posts', (req, res) => {
    console.log(req.params.query)
    res.send(req.params.query);
});

router.post('/posts', (req, res) => {
    console.log(req.body, "req.body from /posts")
    res.send(req.body);
});

app.addRouter(router);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));