const cluster = require('cluster');

if(cluster.isMaster){
  var cpuCount = require('os').cpus().length;
  for (var i = 0; i < cpuCount; i += 1) {
      cluster.fork();
  }
  cluster.on('exit', function (worker) {
    console.log('Worker %d died', worker.id);
    cluster.fork();
  });
} else {
  const express = require('express');
  const app = express();
  const port = process.env.PORT || 8080;
  const routes = require('./routes');
  var router = express.Router();

  app.use('/api', router);
  app.listen(port, () => console.log('Worker %d running!', cluster.worker.id));

  routes(router)
}