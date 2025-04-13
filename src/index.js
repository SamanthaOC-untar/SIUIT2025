const { env, port } = require('./core/config');
const logger = require('./core/logger')('app');
const server = require('./core/server');

const app = server.listen(port, (err) => {
  if (err) {
    logger.fatal(err, 'Failed to start the server.');
    process.exit(1); // Keluar dengan code error
  }
  logger.info(`Server runs at port ${port} in ${env} environment`);
});

// Handle uncaught exceptions (critical errors)
process.on('uncaughtException', (err) => {
  logger.fatal(err, 'Uncaught exception. Shutting down...');

  // Tutup server dengan graceful shutdown
  app.close(() => {
    logger.info('Server closed gracefully.');
    process.exit(1);
  });

  // Force shutdown setelah 5 detik jika belum selesai
  setTimeout(() => {
    logger.error('Force shutdown due to timeout');
    process.exit(1);
  }, 5000).unref(); // unref() agar tidak blocking event loop
});

// Handle unhandled promise rejections (opsional tapi disarankan)
process.on('unhandledRejection', (err) => {
  logger.error(err, 'Unhandled promise rejection');
});