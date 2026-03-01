require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/db/db');

const PORT = process.env.PORT || 3001;

sequelize
    .authenticate()
    .then(() => {
        console.log('✅ Database connection established successfully.');
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Unable to connect to the database:', err);
    });
