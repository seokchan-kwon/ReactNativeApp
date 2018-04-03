const IS_REAL_SERVER: string = 'http://www.handys.co.kr/';

const RESULT_CODE: Object = {
    SUCCESS: 200,
    FAIL: 210,
    TOKEN_ERROR: 444,
}

const METHOD: Object = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

const HEADER: Object = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ver': '2',
    'revision': '4',
    'device': '1',
    'service_type': '4',
    'token': 'b01672c37b296eaf3f1854d10e9c2b8a6c96f77c739f9982d03e59f3e9696521'
};

function makeFetch(api: string, method: METHOD, header?: ?Object, body?: ?Object) {
    let url = IS_REAL_SERVER + api

    if (header) {
        header = mergeHeader(copyHeader(HEADER), header);
    } else {
        header = copyHeader(HEADER)
    }

    console.log('url: -> ' + url);
    console.log('method: -> ' + method)

    for (let key in header) {
        let value = header[key];
        console.log('header: -> ' + key + ':' + value);
    }

    if (method !== METHOD.GET) {
        return fetch(url, {
            method: method,
            headers: header
        });

    } else {
        body = JSON.stringify(body);

        for (let key in body) {
            let value = body[key];
            console.log('body: -> ' + key + ':' + value);
        }

        return fetch(url, {
            method: method,
            headers: header,
            body: body
        });
    }
}

function copyHeader(header: Object): Object {
    let copyHeader = {};
    for (let key in header) {
        let value = header[key];
        copyHeader[key] = value;
    }
    return copyHeader;
}

function mergeHeader(header1?: ?Object, header2: Object): Object {
    if (!header1) {
        header1 = copyHeader(HEADER);
    }
    for (let key in header2) {
        let value = header2[key];
        header1[key] = value;
    }
    return header1;
}

export {
    IS_REAL_SERVER,
    RESULT_CODE,
    HEADER,
    METHOD,
    makeFetch
}