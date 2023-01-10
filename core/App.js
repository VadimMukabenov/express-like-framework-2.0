import http from 'http';

class App {
    constructor(){
        this.middlewares = [];
    }

    use(middleware){
        if (typeof middleware !== 'function') {
            throw new Error('Middleware must be a function!');
        }
        this.middlewares.push(middleware);
    }

    listen(PORT, callback){
        const handler = (req, res) => {
            this.handle(req, res, error => {
                if(error){
                    // console.log(error)
                    res.writeHead(500);
                    res.end('Internal server error');
                }
                // console.log("after all middlewares and routes");
            });
        }
        return http.createServer(handler).listen(PORT, callback);
    }

    handle(req, res, callback){
        let idx = 0;

        const next = (err) => {
            if (err != null) {
                return setImmediate(() => callback(err));
            }

            if (idx >= this.middlewares.length) {
                return setImmediate(() => callback());
            }

            if(this.middlewares[idx].options){
                const handler = this.middlewares[idx];
                if(req.params.pathname === handler.options.path && req.method === handler.options.method){
                    return setImmediate(() => handler(req, res));
                }

                // increase idx only if handler didn't pass the condition
                idx++;
                next();
            }

            const nextMiddleware = this.middlewares[idx++];
            
            setImmediate(() => {
                try {
                    // Execute the layer and rely on it to call `next()`
                    nextMiddleware(req, res, next);
                } catch(error) {
                    next(error);
                }
            });
        }

        next();
    }

    addRouter(router){
        const endpoints = router.endpoints;
        Object.keys(endpoints).forEach(path => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach(method => {
                const handler = endpoint[method];
                
                handler.options = {
                    path,
                    method
                }

                this.use(handler);
            });
        });
    }

}

export default App;