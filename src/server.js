const app = require('./app');
const sequelize = require('./config/database');
const models = require('./models');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    // sync models - in production you'd use migrations
    await sequelize.sync();
    console.log('Models synchronized');

    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
