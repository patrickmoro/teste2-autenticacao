var http = require('http');



var server = http.createServer(function(req, res) {

        var auth = req.headers['authorization'];

        console.error("Authorization Header is: ", auth);

        if(!auth) {

                res.statusCode = 401;

                res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

                res.end('<html><body>Invalid Credential</body></html>');

        } else if(auth) {

                var tmp = auth.split(' ');

                var buf = new Buffer(tmp[1], 'base64');

                var plain_auth = buf.toString();

                console.log("Decoded Authorization ", plain_auth);

                var creds = plain_auth.split(':');

                var username = creds[0];

                var password = creds[1];



                if((username == 'moro') && (password == 'moro')) {

                        res.setHeader('Access-Control-Allow-Credentials', 'true');

                        res.setHeader('Content-Type', 'application/json');

                    res.statusCode = 200;

                    res.end('{ "authenticated": true, "user": "moro" }');

                } else if((username == 'patrick') && (password == 'patrick')) {

                    res.statusCode = 200;

                        res.setHeader('Access-Control-Allow-Credentials', 'true');

                        res.setHeader('Content-Type', 'application/json');

                    res.end('{ "authenticated": true, "user": "patrick"}');

                } else {

                        res.statusCode = 401; // Force them to retry authentication

                        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

                        res.end('{ "authenticated": false }');

                }

        }

});





server.listen(80, function() { console.log("Server Listening on http://localhost:80/"); });

