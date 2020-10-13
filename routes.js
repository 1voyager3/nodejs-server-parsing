const fs = require("fs");


const requestHandler = (request, response) => {

    const url = request.url;
    const method = request.method;

    if (url === "/") {
        response.write("<html>");
        response.write("<head><title>Enter message</title></header>");
        response.write(
            '<body></body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>'
        );
        response.write("</html>");
        return response.end();
    }

    if (url === "/message" && method === "POST") {
        const body = [];

        request.on("data", (chunk) => {
            body.push(chunk);
        });

        return request.on("end", () => {
            //Buffer.concat(body) in this we create all chunks of buffer in one
            // Buffer.concat(body).toString() this method will convert to string value
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split("=")[1];

            // the callback function will be executed when the file message.txt will be recorded
            // try it with writeFileSync it will be error!
            fs.writeFile("message.txt", message, err => {

                response.statusCode = 302;
                response.setHeader("Location", "/");
                return response.end();

            });
        });
    }

    response.setHeader("Content-Type", "text/html");
    response.write("<html>");
    response.write("<head><title>My first Page</title></head>");
    response.write("<body></body><h1>Hello from my Node.js</h1>");
    response.write("</html>");
    response.end();
}

// 1 method of export
// module.exports = requestHandler;

// 2 method of export
// module.exports = {
//     handler: requestHandler
// }

// 3 method of export
// shortcut export of above
exports.handler = requestHandler;
