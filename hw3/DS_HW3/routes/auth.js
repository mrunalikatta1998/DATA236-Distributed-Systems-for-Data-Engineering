const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// login creds
const users = [
    { id: 1, 
        username: 'mrunali',
        password: bcrypt.hashSync('admin123', 8) 
    }
];

// login route - GET
router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// login route - POST
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        return res.redirect('/dashboard');
    }
    res.render('login', { error: 'Invalid username or password!' });
});

// dashboard route - GET
router.get('/dashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('dashboard', { user: req.session.user });
});

// logout route - GET
router.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
