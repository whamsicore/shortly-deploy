var app = require('./server-config.js');

var port = process.env.PORT || 4568;

// console.log("TEST -----> process.env = ", process.env);

app.listen(port);

console.log('Server now listening on port ' + port);
