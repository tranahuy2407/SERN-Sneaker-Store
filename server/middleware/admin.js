module.exports = (req, res, next) => {
    const user = req.user;
    if (!user || user.type !== 'Admin') {
        return res.status(403).json({ message: "Access denied: Admins only." });
    }
    next();
};
