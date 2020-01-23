const Article = require('../models/article')
const User = require('../models/user')

const addToGallery = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    user.gallery.push(req.body.articleId)
    user.save(err => {
      res.redirect(`/users/${user._id}`)
    })
  })
}

const remove = async (req,res) => {
    console.log('hit route')
    console.log(req.params.id)
    try { 
    const deleteArticle = await Article.findByIdAndRemove(req.params.id);
    const findUser = await User.findOne({'article': req.params.id});
    console.log(findUser, 'this is user')
    findUser.article.remove(req.params.id)
    await findUser.save();
    res.redirect(`/users/${req.user._id}`);
    } catch(err) {
        console.log(err)
    }
}

const index = (req, res) => {
    Article.find({}, (err, articles) => {
        if (err) {
            return res.redirect('/');
        }
        res.render('articles/index', { articles, article: req.user });
    });
};

const newArticle = (req, res) => {
    res.render('/articles')
}

const create =  async (req, res) => {
    console.log('hitting the create route')
    for (let key in req.body) {
        if (req.body[key] === '') {
            delete req.body[key]
        }
    };
    const article = new Article(req.body);
    const findUser = await User.findById(req.params.id)
    console.log(findUser, 'this is findUser')
    findUser.article.push(article)
    await findUser.save()
    console.log(findUser, 'this is findUser second<<<<<<')
    article.save(err => {
        if (err) return console.log(err);
        res.redirect(`/users/${findUser._id}`)
    });
   
};

const show = (req, res) => {
    console.log('hit article show route')
    console.log(req.params.id)
    Article.findById(req.params.id, (err, article) => {
        if (err) {
            console.error(err);
        };
        res.render('users/show', { 
            articles: article
        });
    });
};

module.exports = {
    addToGallery,
    index,
    new: newArticle,
    create,
    show,
    remove
};