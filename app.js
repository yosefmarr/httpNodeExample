/*
const fs = require('fs');

fs.writeFile('example.txt', 'Hello World', (err) => {
    console.log("Error:"+ err);
});

console.log('Node script finish');
*/
const http = require('http');

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method, req.headers);
    if(req.url == '/')
    {
        res.setHeader('Content-Type', 'text/html');
        let htmlBody = '<body><h1>Hello World</h1></body>';
        let htmlTemplate = `<html><head><title>Node.js</title></head>${htmlBody}</html>`;
        res.write(htmlTemplate);
        res.end();
    }
    else if(req.url == '/users' && req.method == 'POST')
    {
        let data = [{"id": 0, "name": "Yosef"}, {"id": 1, "name": "Ivan"}];
        const dataParams = [];
        req.on('data', (chunk)=> {
            console.log(chunk);
            dataParams.push(chunk);
        });
        req.on('end', () => {
            if(dataParams.length != 0)
            {
                const parseDataParams = Buffer.concat(dataParams).toString();
                console.log(parseDataParams);
                const userId = parseDataParams.split('=')[1];
                data = data.filter((user) => user.id == userId);
            }
            res.setHeader('Content-Type', 'application/json');
            const stringifyData = JSON.stringify(data);
            const jsonResponse = `{"status": true, "data": ${stringifyData}}`;
            res.write(jsonResponse);
            res.end();
        });
    }
    
});

server.listen(2500);

