// endpoints = {
//     "/users" : {
//         "GET" : handler
//     }
// }

class Router {
    constructor(){
        this.endpoints = {};
    }

    request(method = "GET", path, handler){
        const endpoints = this.endpoints;
        if(!endpoints[path]){
            endpoints[path] = {};
        }
        const endpoint = endpoints[path];  // /users
        if(endpoint[method]){
            throw new Error(`Handler for method ${method} already exists on path ${endpoint}`);
        }
        endpoint[method] = handler;
    }

    get(path, handler){
        this.request("GET", path, handler);
    }
    post(path, handler){
        this.request("POST", path, handler);
    }
    put(path, handler){
        this.request("PUT", path, handler);
    }
    delete(path, handler){
        this.request("DELETE", path, handler);
    }
}

export default Router;
