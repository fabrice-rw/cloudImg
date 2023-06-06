const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        });

        await user.save();

        res.status(201).json({
            message: 'User Created Successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: `Error occurred while registering the user ${error}`
        });
    }
};


const login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    error: 'User not found'
                });
            }

            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    return res.status(401).json({
                        error: 'Login failed'
                    });
                }

                if (result) {
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            email: user.email
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '1h'
                        }
                    );

                    return res.status(200).json({
                        message: 'Login successful',
                        token: token
                    });
                } else {
                    return res.status(401).json({
                        error: 'Login failed'
                    });
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                error: 'Error occurred while logging in'
            });
        });
};

module.exports = {
    register,
    login
};
