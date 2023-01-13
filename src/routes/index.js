const homeRouter = require('./home.router.js');
const detailRouter = require('./detail.router.js');

function route(app) {
    app.use('/detail', detailRouter);
    app.use('/', homeRouter);
}

module.exports = route;