const homeRouter = require('./homepage');
const registerRouter = require('./register');
const inboxRouter = require('./inboxpage');

function route(app) {
    app.use('/', homeRouter);
    app.use('/register', registerRouter);
    app.use('/inbox', inboxRouter);

}

module.exports = route;