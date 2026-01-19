import adoptionModel from './models/Adoption.js';

export default class Adoption {
    get = (params) => {
        return adoptionModel
            .find(params)
            .populate('owner', 'first_name last_name email')
            .populate('pet', 'name specie birthDate');
    };

    getBy = (params) => {
        return adoptionModel
            .findOne(params)
            .populate('owner', 'first_name last_name email')
            .populate('pet', 'name specie birthDate');
    };

    save = (doc) => {
        return adoptionModel.create(doc);
    };

    update = (id, doc) => {
        return adoptionModel.findByIdAndUpdate(id, { $set: doc });
    };

    delete = (id) => {
        return adoptionModel.findByIdAndDelete(id);
    };
}
