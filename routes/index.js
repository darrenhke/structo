
const structoRoute = require('../api/service/structo.service');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

const setRoute = (app) => {
    app.use('/api',structoRoute);  

};

module.exports.setRoute = setRoute;
