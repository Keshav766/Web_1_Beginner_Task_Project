import jwt from "jsonwebtoken";

export function UserAuthentication(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            status: "fail",
            message: "missing token",
        })
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_Secret);
        req.user = {
            userId: decoded.userId,
            role: decoded.role
        }
        next();
    } catch (err) {
        return res.status(401).json({
            status: "fail",
            messge: "invalid token",
        })
    }

}