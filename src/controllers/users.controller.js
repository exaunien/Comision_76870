import { usersService } from '../services/index.js';
import bcrypt from 'bcrypt';

const getAllUsers = async (req, res) => {
    const users = await usersService.getAll();
    res.send({ status: 'success', payload: users });
};

const getUser = async (req, res) => {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user)
        return res
            .status(404)
            .send({ status: 'error', error: 'Usuario no encontrado' });
    res.send({ status: 'success', payload: user });
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
            message: 'Usuario creado correctamente',
            payload: newUser,
        });
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
};

const updateUser = async (req, res) => {
    const updateBody = req.body;
    const userId = req.params.uid;

    const user = await usersService.getUserById(userId);
    if (!user)
        return res
            .status(404)
            .send({ status: 'error', error: 'Usuario no encontrado' });

    if (updateBody.password) {
        const salt = await bcrypt.genSalt(10);
        updateBody.password = await bcrypt.hash(updateBody.password, salt);
    }

    await usersService.update(userId, updateBody);
    res.send({ status: 'success', message: 'Usuario actualizado' });
};

const deleteUser = async (req, res) => {
    const userId = req.params.uid;
    await usersService.delete(userId);
    res.send({ status: 'success', message: 'Usuario eliminado' });
};

export default { createUser, deleteUser, getAllUsers, getUser, updateUser };
