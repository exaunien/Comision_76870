import { usersService } from '../services/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAll();
        res.send({ status: 'success', payload: users });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user)
            return res
                .status(404)
                .send({ status: 'error', error: 'Usuario no encontrado' });
        res.send({ status: 'success', payload: user });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).send({
                status: 'error',
                error: 'Campos obligatorios faltantes',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await usersService.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });

        res.status(201).send({
            status: 'success',
            message: 'Usuario registrado',
            payload: newUser,
        });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersService.getUserByEmail(email); // Revisa que tu service tenga getUserByEmail

        if (!user)
            return res
                .status(401)
                .send({ status: 'error', error: 'Credenciales inválidas' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid)
            return res
                .status(401)
                .send({ status: 'error', error: 'Credenciales inválidas' });

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
        );

        res.cookie('coderCookieToken', token, { httpOnly: true }).send({
            status: 'success',
            message: 'Login exitoso',
        });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};

const profile = async (req, res) => {
    res.send({ status: 'success', payload: req.user });
};

const restorePassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersService.getUserByEmail(email);
        if (!user)
            return res
                .status(404)
                .send({ status: 'error', error: 'Usuario no encontrado' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await usersService.update(user._id, { password: hashedPassword });
        res.send({ status: 'success', message: 'Contraseña actualizada' });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        await usersService.update(userId, req.body);
        res.send({ status: 'success', message: 'Usuario actualizado' });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await usersService.delete(req.params.uid);
        res.send({ status: 'success', message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};

// EXPORTACIÓN COMPLETA PARA TUS RUTAS
export default {
    getAllUsers,
    getUser,
    createUser,
    login,
    profile,
    restorePassword,
    updateUser,
    deleteUser,
};
