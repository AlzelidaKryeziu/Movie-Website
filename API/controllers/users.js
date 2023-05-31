const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const { post } = require('../routers/users');

const getUsers = async (req, res) => {
    try {
        // const users = await prisma.user.findMany({where:{email:{contains:'test'}}})

        // const users = await prisma.user.findFirst({where:{email:{contains:'test'}}})

        // const users = await prisma.user.findMany({where:{email:{contains:'test'}},include:{posts:true}})

        const users = await prisma.user.findMany({ include: { posts: true } });

        const token = jwt.sign({ listOfUsers: users }, 'super-secret-key', {
            expiresIn: '1m',
        });

        // Select * from users where email like %test%
        // Select * from users as u inner join posts as p on u.id = p.authorId
        res.json(users);
    } catch (error) {
        res.json({ message: 'Something went wrong!' });
    }
};

const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.json({ message: 'Invalid credentials! email' });
        }
        if (password !== user.password) {
            res.json({ message: 'Invalid credentials! pw' });
        }
        const token = jwt.sign({ user }, 'my-super-secret-key', {
            expiresIn: '25m',
        });
        delete user.password;
        res.json({ token, user });
    } catch (error) {
        res.json({ message: 'Something went wrong!' });
    }
};

const createPost = async (req, res) => {
    try {
        const title = req.body.title;
        const content = req.body.content;
        console.log(req.headers.authorization);
        if (!req.headers.authorization) {
            res.json({ message: 'Invalid token!' });
        }
        const token = req.headers.authorization.split(' ')[1];
        const verify = jwt.verify(token, 'my-super-secret-key');
        console.log(verify);
        if (!verify) {
            res.json({ message: 'Invalid token!' });
        }
        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId: verify.user.id,
            },
        });
        if (post) res.json(post);
    } catch (error) {
        res.json({ message: 'Something went wrong!', error });
    }
};

const createKomuna = (req, res) => {
    console.log(req.body);
    const emri = req.body.emri;
    const pershkrimi = req.body.pershkrimi;
    console.log(emri, pershkrimi);
    database.query(
        `INSERT INTO komunat (Emri, Pershkrimi) VALUES ('${req.body.emri}', '${pershkrimi}')`,
        (err, results) => {
            if (err) throw err;
            res.send(`Komuna ${emri} u insertua ne databaze`);
        }
    );
};

const createUser = async (req, res) => {
    const emri = req.body.emri;
    const email = req.body.email;
    const user = await prisma.user.create({
        data: {
            email,
            name: emri,
            posts: {
                create: {
                    title: 'this is a testing post',
                    content: 'this is a testing case for content',
                },
            },
        },
    });
    res.json(user);
};

const deleteUser = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            where: { authorId: parseInt(req.params.userId) },
        });

        for (let post of posts) {
            await prisma.post.delete({ where: { id: post.id } });
        }

        await prisma.user.delete({
            where: { id: parseInt(req.params.userId) },
        });

        res.json({ message: 'User is deleted!' });
    } catch (error) {
        res.json({ message: 'Something went wrong!' });
    }
};

module.exports = {
    getUsers,
    createKomuna,
    createUser,
    deleteUser,
    login,
    createPost,
};
