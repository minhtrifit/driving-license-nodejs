const homeRouter = require('./home.router.js');
const detailRouter = require('./detail.router.js');
const documentRouter = require('./document.router.js');
const examRouter = require('./exam.router.js');
const historyRouter = require('./history.router.js');

function route(app) {
    app.use('/history', historyRouter);
    app.use('/exam', examRouter);
    app.use('/document', documentRouter);
    app.use('/detail', detailRouter);
    app.use('/', homeRouter);
}

module.exports = route;