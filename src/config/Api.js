require('es6-promise').polyfill();
require('isomorphic-fetch');

const env = () => {
    let e = "prod";
    if (location.hostname == "localhost") {
        e = "dev"
    }
    return e
}

const hostnames = {
    prod: "https://pokedex-watch.herokuapp.com/api",
    dev: "http://localhost:4000/api"
}

const Hostname = () => {
    return hostnames[env()]
}

const getHeaders = () => {
    let headers = new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json'
    })

    const authorization = localStorage.authorization
    if (authorization != void 0) {
        headers.append("Authorization", authorization)
    }
    return headers;
}

const saveAuthorization = (headers) => {
    if (headers.has("Authorization")) {
        localStorage.authorization = headers.get("authorization")
    }
}

const Request = function(pathname, req){
    return fetch(`${Hostname()}/${pathname}`, req).then(function (res) {
        saveAuthorization(res.headers)
        return res.json()
    })
}

const defaults = () => {
    return {
        headers: getHeaders(),
        mode: 'cors'
    }
}

function get(pathname) {
    return Request(pathname, {
        ...defaults(),
        method: 'GET'
    })
}

function post(pathname, body) {
    return Request(pathname, {
        ...defaults(),
        method: 'POST',
        body: JSON.stringify(body)
    })
}

function patch(pathname, body) {
    return Request(pathname, {
        ...defaults(),
        method: 'PATCH',
        body: JSON.stringify(body)
    })
}

function put(pathname, body) {
    return Request(pathname, {
        ...defaults(),
        method: 'PUT',
        body: JSON.stringify(body)
    })
}

function del(pathname) {
    return Request(pathname, {
        ...defaults(),
        method: 'DELETE'
    })
}

const Api = {
    get,
    post,
    patch,
    put,
    del
}

export default Api