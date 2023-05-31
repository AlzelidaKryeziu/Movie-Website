const router = require('express').Router();
const {
    getUsers,
    createUser,
    deleteUser,
    login,
    createPost,
} = require('../controllers/users');

const validateData = require('../middlewares/validateData');

router.post('/', createUser); //C

router.get('/', getUsers); //R

router.post('/login', login); // Route for login

router.post('/post', createPost);

// router.put('/:id', updateUser);          //U

router.delete('/:userId', deleteUser); //D

module.exports = router;
