
exports.getHomePage =  (req , res) => {
    res.render('jsonplaceholder/home');
};

exports.getPostId =  (req , res) => {
    res.render('jsonplaceholder/post')
};