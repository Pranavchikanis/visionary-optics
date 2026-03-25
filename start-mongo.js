const { MongoMemoryServer } = require('mongodb-memory-server');

(async () => {
  try {
    const mongod = await MongoMemoryServer.create({ instance: { port: 27017 } });
    console.log(`MongoDB successfully started on ${mongod.getUri()}`);
    // Keep the process alive
    setInterval(() => {}, 1000 * 60 * 60);
  } catch (error) {
    console.error("Failed to start MongoDB Memory Server:", error);
    process.exit(1);
  }
})();
