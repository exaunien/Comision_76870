import userModel from '../dao/models/User.js';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

export const seedDatabase = async () => {
    try {
        const count = await userModel.countDocuments();
        if (count === 0) {
            console.log(
                'Base de datos vacía. Iniciando seeding con hashing...',
            );
            const dataPath = path.join(process.cwd(), 'src/data/users.json');
            const users = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

            // Procesamos cada usuario para hashear su password
            const hashedUsers = await Promise.all(
                users.map(async (user) => {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                    return user;
                }),
            );

            await userModel.insertMany(hashedUsers);
            console.log('Usuarios de prueba insertados y hasheados con éxito.');
        } else {
            console.log('La base de datos ya tiene datos, saltando seeding.');
        }
    } catch (error) {
        console.error('Error en el seeding:', error);
    }
};
