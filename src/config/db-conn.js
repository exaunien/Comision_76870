import mongoose from 'mongoose';
import { seedDatabase } from '../utils/seeder.js';

// Función para conectar a la base de datos MongoDB
export const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a la base de datos');
        await seedDatabase();
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
        process.exit(1);
    }
};
