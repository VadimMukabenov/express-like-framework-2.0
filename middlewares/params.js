import url from 'url';

const params = (req, res, next) => {
    const urlObj = url.parse(req.url, true);
    const pathname = urlObj.pathname;
    const query = urlObj.query;

    req.params = {
        pathname,
        query
    };

    next();
}

export default params;