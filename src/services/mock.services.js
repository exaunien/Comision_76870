import userModel from '../dao/models/User.js';
import petsModel from '../dao/models/Pet.js';
import { generatePet, generateUser } from '../utils/mock.utils.js';

export const createUserMock = async (num) => {
    try {
        const users = [];
        for (let i = 0; i < num; i++) {
            const user = await generateUser(); // Asumiendo que generateUser es una función que genera un usuario falso
            users.push(user);
        }
        return await userModel.create(users);
    } catch (error) {
        console.error('Error creando users mocking:', error);
    }
};

export const getUsers = async () => {
    try {
        return await userModel.find();
    } catch (error) {
        console.error('Error generando users mocking:', error);
    }
};

export const createPetMock = async (num) => {
    try {
        const pets = [];
        for (let i = 0; i < num; i++) {
            const pet = await generatePet(); // Asumiendo que generateUser es una función que genera un usuario falso
            pets.push(pet);
        }
        return await petsModel.create(pets);
    } catch (error) {
        console.error('Error creando pets mocking:', error);
    }
};

export const getPets = async () => {
    try {
        return await petsModel.find();
    } catch (error) {
        console.error('Error generando pets mocking:', error);
    }
};
