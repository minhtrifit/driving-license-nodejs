const homeRouter = require('./home.router.js');

function route(app) {
    app.use('/', homeRouter);
}

module.exports = route;