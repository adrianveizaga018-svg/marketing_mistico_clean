const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*',
    credentials: true
}));
app.use(express.json());

// MySQL Connection (Sequelize)
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false
    }
);

// Define Model
const Lead = sequelize.define('Lead', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => uuidv4()
    },
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    pais: DataTypes.STRING,
    whatsapp: DataTypes.STRING,
    servicio: DataTypes.STRING,
    status: {
        type: DataTypes.ENUM('nuevo', 'contactado', 'reunion', 'cerrado', 'perdido'),
        defaultValue: 'nuevo'
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false
});

// Sync Database
sequelize.sync()
    .then(() => console.log('✅ MySQL Database synced'))
    .catch(err => console.error('❌ MySQL Sync error:', err));

// Routes
app.get('/api', (req, res) => {
    res.json({ message: "Marketing Místico API v1 (Node + MySQL)" });
});

app.post('/api/leads', async (req, res) => {
    try {
        const lead = await Lead.create(req.body);
        console.log("✅ Lead saved to MySQL");
        res.status(201).json(lead);
    } catch (error) {
        console.error("❌ Error saving lead:", error);
        res.status(500).json({ error: "Failed to save lead" });
    }
});

app.get('/api/leads', async (req, res) => {
    try {
        const leads = await Lead.findAll({
            order: [['timestamp', 'DESC']]
        });
        res.json(leads);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch leads" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Node Server (MySQL) running on http://localhost:${PORT}`);
});
