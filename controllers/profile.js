const User = require('../models/user');


exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        console.log("GET Profile");
        console.log(user);
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }
        console.log("Fetched User Data successfully.");
        res.status(200).json({
            message: 'Fetched User Data successfully.',
            user: user,
        });
        console.log("END Fetched User Data successfully.");
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
