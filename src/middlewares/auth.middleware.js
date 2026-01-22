import jwt from 'jsonwebtoken';

export const authToken = (req, res, next) => {
    // 1. Buscar el token en los headers o en las cookies
    const authHeader = req.headers.authorization;
    const token = authHeader
        ? authHeader.split(' ')[1]
        : req.cookies['coderCookieToken'];

    if (!token)
        return res
            .status(401)
            .send({ status: 'error', error: 'No autenticado' });

    jwt.verify(token, process.env.JWT_SECRET, (error, credentials) => {
        if (error)
            return res
                .status(403)
                .send({ status: 'error', error: 'Token inválido o expirado' });

        // Seteamos el usuario en el request para que el controlador lo use
        req.user = credentials;
        next();
    });
};
