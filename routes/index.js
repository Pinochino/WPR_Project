const homeRouter = require('./homepage');
const registerRouter = require('./register');

function route(app) {
    app.use('/', homeRouter);
    app.use('/register', registerRouter);
}

module.exports = route;