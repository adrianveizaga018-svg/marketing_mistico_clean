const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Load environment variables
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*',
    credentials: true
}));
app.use(express.json());

// API Key Security Middleware
const authenticateAPI = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    const secretKey = process.env.API_KEY;

    if (!apiKey || apiKey !== secretKey) {
        return res.status(401).json({ error: "Unauthorized access" });
    }
    next();
};

// Database Connection
const sequelize = new Sequelize(
    process.env.DB_NAME.trim(),
    process.env.DB_USER.trim(),
    process.env.DB_PASS.trim(),
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
            connectTimeout: 10000
        }
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

// Authentication and Sync
sequelize.authenticate()
    .then(() => {
        console.log('✅ Connected to MySQL at 127.0.0.1');
        return sequelize.sync();
    })
    .catch(err => {
        console.error('❌ Connection failed:', err.message);
    });

// Public Routes
app.get('/', (req, res) => {
    res.json({ 
        status: "online", 
        message: "Marketing Místico API",
        api_version: "1.0.1 (Secured)"
    });
});

app.get('/api', (req, res) => {
    res.json({ message: "Marketing Místico API v1 (Node + MySQL)" });
});

// Protected Routes
// Get all leads - PUBLIC READING FOR COMPATIBILITY
app.get('/api/leads', async (req, res) => {
    try {
        const leads = await Lead.findAll({
            order: [['timestamp', 'DESC']]
        });
        res.json(leads);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch leads", details: error.message });
    }
});

// Create new lead
app.post('/api/leads', authenticateAPI, async (req, res) => {
    try {
        const { nombre, email, pais, whatsapp, servicio } = req.body;
        
        if (!nombre || !email) {
            return res.status(400).json({ error: "Nombre and email are required" });
        }

        const newLead = await Lead.create({
            nombre,
            email,
            pais,
            whatsapp,
            servicio
        });

        res.status(201).json(newLead);
    } catch (error) {
        res.status(500).json({ error: "Failed to create lead", details: error.message });
    }
});

// Update lead status
app.patch('/api/leads/:id/status', authenticateAPI, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const lead = await Lead.findByPk(id);
        if (!lead) {
            return res.status(404).json({ error: "Lead not found" });
        }

        lead.status = status;
        await lead.save();

        res.json(lead);
    } catch (error) {
        res.status(500).json({ error: "Failed to update lead", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Secured Server running on port ${PORT}`);
});
