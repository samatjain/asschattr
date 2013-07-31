exports.index = function(req, res){
	var hashtag = 'default';
	if (typeof req.params.hashtag != 'undefined' && req.params.hashtag != null)
			hashtag = req.params.hashtag;
  res.render('index', { hashtag: hashtag });
};

exports.fuq = function(req, res){
  res.render('fuq');
};
