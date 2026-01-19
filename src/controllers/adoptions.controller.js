import {
    adoptionsService,
    petsService,
    usersService,
} from '../services/index.js';

const getAllAdoptions = async (req, res) => {
    const result = await adoptionsService.getAll();
    res.send({ status: 'success', payload: result });
};

const getAdoption = async (req, res) => {
    const adoptionId = req.params.aid;
    try {
        const adoption = await adoptionsService.getBy({ _id: adoptionId });
        if (!adoption) {
            return res
                .status(404)
                .send({ status: 'error', error: 'Adoption not found' });
        }
        res.send({ status: 'success', payload: adoption });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error: 'ID mal formado o error de servidor',
        });
    }
};

const createAdoption = async (req, res) => {
    const { uid, pid } = req.params;
    const user = await usersService.getUserById(uid);
    if (!user)
        return res
            .status(404)
            .send({ status: 'error', error: 'Usuario no encontrado' });

    const pet = await petsService.getBy({ _id: pid });
    if (!pet)
        return res
            .status(404)
            .send({ status: 'error', error: 'Mascota no encontrada' });

    if (pet.adopted)
        return res
            .status(400)
            .send({ status: 'error', error: 'Mascota ya adoptada' });

    user.pets.push(pet._id);
    await usersService.update(user._id, { pets: user.pets });
    await petsService.update(pet._id, { adopted: true, owner: user._id });

    const newAdoption = await adoptionsService.create({ owner: uid, pet: pid });

    res.send({
        status: 'success',
        message: 'Mascota adoptada con exito',
        payload: newAdoption,
    });
};

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption,
};
