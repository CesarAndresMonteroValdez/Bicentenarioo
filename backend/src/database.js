import mongoose from 'mongoose';
import 'dotenv/config';

const URI = process.env.MONGODB_URI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(error => console.error('❌ Error conectando a MongoDB Atlas:', error));
