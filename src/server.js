const app = require('./app');
const config = require('./config');
const authService = require('./services/authService');

async function startServer() {
  try {
    await authService.seedInitialAdmin();

    app.listen(config.port, () => {
      console.log(`Servidor REST escuchando en http://localhost:${config.port}`);
      console.log(`Entorno: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
}

startServer();
