export default class PetDTO {
    static getPetInputFrom = (pet) => {
        return {
            name: pet.name || '',
            specie: pet.specie || '',
            image: pet.image || '',
            birthDate: pet.birthDate || '04-26-2012',
            adopted: false,
        };
    };
}
