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
    findUser.article.push(article)
    await findUser.save()
    article.save(err => {
        if (err) return console.log(err);
        res.redirect(`/users/${findUser._id}`)
    });
   
};

const show = (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if (err) {
            console.error(err);
        };
        res.render('users/show', { 
            articles: article
        });
    });
};

const remove = async (req,res) => {
    try { 
    const deleteArticle = await Article.findByIdAndRemove(req.params.id);
    const findUser = await User.findOne({'article': req.params.id});
    findUser.article.remove(req.params.id)
    await findUser.save();
    res.redirect(`/users/${req.user._id}`);
    } catch(err) {
        console.log(err)
    }
}

const update = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body)
        res.redirect(`/users/${req.user._id}`);
    } catch(err) {
        console.log(err)
    }
}

const updateShow = async (req, res) => {
    try {
        const user = req.user._id
        const article = await Article.findById(req.params.id)
        res.render('articles/new', { 
            article: article,
            user: user
        });
    } catch(err) {
        console.log(err)
    }
}


module.exports = {
    addToGallery,
    index,
    new: newArticle,
    create,
    show,
    remove,
    updateShow,
    update
    
};