const bodyParser = (req, res, next) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        if(body){
            req.body = JSON.parse(body);
            next();
        }
    });
}

export default bodyParser;