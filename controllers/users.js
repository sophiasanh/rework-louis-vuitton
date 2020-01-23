const User = require('../models/user');
const Article = require('../models/article')

const index = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            return res.redirect('/');
        }
        res.render('users/index', { users, user: req.user });
    });
};

const newUser = (req, res) => {
    res.render('/user')
}

const create = (req, res) => {
    for (let key in req.body) {
        if (req.body[key] === '') {
            delete req.body[key]
        }
    };
    const user = new User(req.body);
    user.save(err => {
        if (err) return res.redirect
            ("/user"); {
            res.redirect("/users")
        }
    });
};

const show = async (req, res) => {
    const articles = await Article.find({})
    console.log(articles,'this is articles')
    console.log('hit the show route')
    console.log(req.params.id, 'this is req')
    User.findById(req.params.id, (err, user) => {
        if (err) {
            console.error(err);
        };
        console.log(user, 'this is user')
        console.log(articles, 'this is articles')
        res.render("users/show", {
            user: user,
            articles: articles
        });
    });
};

module.exports = {
    index,
    create,
    show,
    new: newUser
};