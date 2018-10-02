const cluster = require('cluster');
const morgan = require('morgan');
const logger = require('./config/logger');

if(cluster.isMaster){
  var cpuCount = require('os').cpus().length;
  for (var i = 0; i < cpuCount; i += 1) {
      cluster.fork();
      logger.info(`Worker created ${i}`)
  }
  cluster.on('exit', function (worker) {
    logger.error(`Worker ${worker.id} died`);
    cluster.fork();
  });
} else {
  const express = require('express');
  const app = express();
  const port = process.env.PORT || 8080;
  const routes = require('./routes');
  const router = express.Router();

  app.use(morgan('combined', { stream: logger.stream }));

  app.use('/api', router);
  app.listen(port, () => console.log('Worker %d running!', cluster.worker.id));

  routes(router)
}