function authMiddleware(req, res, next) {
    const userId = req.cookies.userId; // Lấy userId từ cookie
    if (!userId) {
        return res.status(401).redirect('/login'); // Chuyển hướng đến trang đăng nhập
    }
    next(); // Tiếp tục đến route tiếp theo nếu có userId
}

module.exports = authMiddleware;
