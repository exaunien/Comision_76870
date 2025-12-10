import * as UserServices from '../services/mock.services.js';

const createUserMock = async (req, res) => {
    try {
        const { num } = req.query;
        const response = await UserServices.createUserMock(num);
        res.status(201).json(response);
        console.log(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const response = await UserServices.getUsers();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createPetMock = async (req, res) => {
    try {
        const { num } = req.query;
        const response = await UserServices.createPetMock(num);
        res.status(201).json(response);
        console.log(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getPets = async (req, res) => {
    try {
        const response = await UserServices.getPets();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const generateData = async (req, res) => {
    try {
        const { users, pets } = req.query;
        const user = await UserServices.createUserMock(users);
        const pet = await UserServices.createPetMock(pets);
        res.status(201).json({ user, pet });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export { createUserMock, getUsers, createPetMock, getPets, generateData };
