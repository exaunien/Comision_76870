import { fakerES } from '@faker-js/faker';
import userModel from '../dao/models/User.js';
import bcrypt from 'bcrypt';

const faker = fakerES;

export const generateUser = async () => {
    const Password = 'coder123'; // o faker.internet.password()
    const hashedPassword = await bcrypt.hash(Password, 10);

    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        role: Math.random() < 0.5 ? 'admin' : 'user', // 50% probabilidad
        pets: [],
    };
};

export const generatePet = async () => {
    const users = await userModel.find();
    if (users.length === 0) {
        console.log(
            'Esperando a que se creen usuarios para asignar mascotas...',
        );
        return;
    }
    const randomUser = faker.helpers.arrayElement(users);

    return {
        name: faker.animal.petName(),
        specie: faker.animal.type(),
        BirthDate: faker.date.past(),
        adopted: faker.datatype.boolean(),
        owner: randomUser._id,
        image: faker.image.url(),
    };
};
// Ejecutar en un contexto async
const main = async () => {
    await generateUser();
    await generatePet();
};

main();
