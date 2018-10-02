const redis = require("redis")
const client = redis.createClient();

process.on("exit", function(){
  redisClient.quit();
});

client.on("error", function(err) {
  console.log("Error " + err);
})

client.on('connect', () => {
  console.log(`connected to redis`);
});

module.exports = client
