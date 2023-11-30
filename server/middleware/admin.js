module.exports = function isAdmin(req, res, next) {
    if (!req.body.isAdmin) {
        return res.status(403).send('You don\'t have permission to access this resource');
    }
    next();
}