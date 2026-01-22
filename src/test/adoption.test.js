import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose'; // Importante para cerrar la conexión
import app from '../app.js';
import { seedDatabase } from '../utils/seeder.js';

describe('Test del Router adoptions', () => {
    const requester = request(app);
    let createdUserId;
    let createdPetId;
    let createdAdoptionId;

    // Cierre de seguridad al terminar todos los tests
    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeAll(async () => {
        // 1. Crear Usuario
        const user = {
            first_name: 'Test',
            last_name: 'User',
            email: `test${Date.now()}@mail.com`,
            password: '123',
        };
        const uRes = await requester.post('/api/users/register').send(user);
        createdUserId = uRes.body.payload?._id || uRes.body._id;

        // 2. Crear Mascota
        const pet = {
            name: 'Firulais',
            specie: 'Dog',
            birthDate: '2020-01-01',
            adopted: false,
        };
        const pRes = await requester.post('/api/pets').send(pet);
        createdPetId = pRes.body.payload?._id || pRes.body._id;

        // Validación preventiva
        if (!createdUserId || !createdPetId) {
            console.error(
                'ERROR: No se pudieron crear los recursos previos (User/Pet)',
            );
        }
    });

    it('debe crear una adopción', async () => {
        // Verificamos que tenemos los IDs necesarios antes de lanzar el post
        expect(createdUserId).toBeDefined();
        expect(createdPetId).toBeDefined();

        const result = await requester.post(
            `/api/adoptions/${createdUserId}/${createdPetId}`,
        );

        expect(result.status).toBe(200);
        console.log(
            'TEST 1 (POST): Adopción creada:',
            JSON.stringify(result.body, null, 2),
        );

        createdAdoptionId = result.body.payload?._id || result.body._id;
        expect(createdAdoptionId).toBeDefined();
    });

    it('debe listar adopciones con populate', async () => {
        const result = await requester.get('/api/adoptions');

        expect(result.status).toBe(200);
        console.log(
            'TEST 2 (GET ALL): Listado de adopciones:',
            JSON.stringify(result.body, null, 2),
        );

        const adoptionsList = result.body.payload
            ? result.body.payload
            : result.body;
        expect(Array.isArray(adoptionsList)).toBe(true);

        if (adoptionsList.length > 0) {
            const adoption = adoptionsList[0];
            expect(adoption).toHaveProperty('owner');
            expect(adoption).toHaveProperty('pet');
        }
    });

    it('debe obtener una adopción por ID', async () => {
        // Nos aseguramos de que el test anterior haya guardado el ID
        expect(createdAdoptionId).toBeDefined();

        const result = await requester.get(
            `/api/adoptions/${createdAdoptionId}`,
        );

        expect(result.status).toBe(200);
        console.log(
            'TEST 3 (GET BY ID): Detalle de adopción:',
            JSON.stringify(result.body, null, 2),
        );

        const data = result.body.payload ? result.body.payload : result.body;
        expect(data).toHaveProperty('_id', createdAdoptionId);
    });

    // --- NUEVOS TESTS: CASOS NEGATIVOS ---

    it('debe devolver 404 si el usuario no existe', async () => {
        const fakeUserId = '65a6f1e5f1e5f1e5f1e5f1e5'; // ID con formato válido pero inexistente
        const result = await requester.post(
            `/api/adoptions/${fakeUserId}/${createdPetId}`,
        );

        console.log('TEST NEGATIVO 1 (User Not Found):', result.body);

        expect(result.status).toBe(404);
    });

    it('debe devolver 404 si la mascota no existe', async () => {
        const fakePetId = '65a6f1e5f1e5f1e5f1e5f1e5';
        const result = await requester.post(
            `/api/adoptions/${createdUserId}/${fakePetId}`,
        );

        console.log('TEST NEGATIVO 2 (Pet Not Found):', result.body);

        expect(result.status).toBe(404);
    });

    it('debe devolver 404 si se busca una adopción con un ID inexistente', async () => {
        const fakeAdoptionId = '65a6f1e5f1e5f1e5f1e5f1e5';
        const result = await requester.get(`/api/adoptions/${fakeAdoptionId}`);

        console.log('TEST NEGATIVO 3 (Adoption Not Found):', result.body);

        expect(result.status).toBe(404);
    });
});
