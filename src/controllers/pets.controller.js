import PetDTO from '../dto/Pet.dto.js';
import { petsService } from '../services/index.js';
import __dirname from '../utils/index.js';

const getAllPets = async (req, res) => {
    const pets = await petsService.getAll();
    res.send({ status: 'success', payload: pets });
};
const getPets = async (req, res) => {
    const petId = req.params.pid;
    const pet = await petsService.getBy(petId);
    if (!pet)
        return res
            .status(404)
            .send({ status: 'error', error: 'Mascota no encontrada' });
    res.send({ status: 'success', payload: pet });
};

const createPet = async (req, res) => {
    const { name, specie, birthDate } = req.body;
    if (!name || !specie || !birthDate)
        return res
            .status(400)
            .send({ status: 'error', error: 'Valores incompletos' });
    const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });
    const result = await petsService.create(pet);
    res.send({ status: 'success', payload: result });
};

const updatePet = async (req, res) => {
    const petUpdateBody = req.body;
    const petId = req.params.pid;
    const result = await petsService.update(petId, petUpdateBody);
    res.send({ status: 'success', message: 'Mascota : datos actualizados' });
};

const deletePet = async (req, res) => {
    const petId = req.params.pid;
    const result = await petsService.delete(petId);
    res.send({ status: 'success', message: 'Mascota : registro eliminado' });
};

const createPetWithImage = async (req, res) => {
    const file = req.file;
    const { name, specie, birthDate } = req.body;
    if (!name || !specie || !birthDate)
        return res
            .status(400)
            .send({ status: 'error', error: 'Valores incompletos' });
    console.log(file);
    const pet = PetDTO.getPetInputFrom({
        name,
        specie,
        birthDate,
        image: `${__dirname}/../public/img/${file.filename}`,
    });
    console.log(pet);
    const result = await petsService.create(pet);
    res.send({ status: 'success', payload: result });
};
export default {
    getAllPets,
    getPets,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage,
};
