# express-like-framework-2.0

Это мини клон известного Node.js фреймворк Express.js. Я написал реализацию фреймворка Express js чтобы лучше понимать как он работает.

Features:
- Middlewares:
  - Body Parser
  - params
  - parseJSON
- Router (get, post, put, delete)
- App (Express)

Examples:
```
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

app.addRouter(router);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
```
