
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.fuq = function(req, res){
  res.render('fuq', { title: 'Express' });
};
