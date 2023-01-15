const homeRouter = require('./home.router.js');
const detailRouter = require('./detail.router.js');
const documentRouter = require('./document.router.js');

function route(app) {
    app.use('/document', documentRouter);
    app.use('/detail', detailRouter);
    app.use('/', homeRouter);
}

module.exports = route;