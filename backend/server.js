const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes'); 
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();
const app = express();

app.use(express.json()); 
app.use(cors());         
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Database Connection Successful!'))
  .catch((err) => console.log('❌ Database Connection Failed:', err.message));

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});