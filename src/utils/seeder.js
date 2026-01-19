import userModel from '../dao/models/User.js';
import fs from 'fs';
import path from 'path';

export const seedDatabase = async () => {
    try {
        const count = await userModel.countDocuments();
        if (count === 0) {
            console.log('Base de datos vacía. Iniciando seeding...');
            const dataPath = path.join(process.cwd(), 'src/data/users.json');
            const users = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

            await userModel.insertMany(users);
            console.log('Usuarios de prueba insertados con éxito.');
        } else {
            console.log('La base de datos ya tiene datos, saltando seeding.');
        }
    } catch (error) {
        console.error('Error en el seeding:', error);
    }
};
