const axios = require('axios');
const cache = require('./config/cache')
const url = (offset) => `https://api.opensea.io/api/v1/events/?event_type=successful&offset=${offset}`;

module.exports = function(router) {
  router.get('/', async (req, res) => {
    cache.get('data', async (err, value) => {
      if(value !== null) {
        console.log('CACHED')
        return res.send(JSON.parse(value))
      }
      console.log('NOT CACHED')
      const {data} = await axios.get(url(0))
      const {asset_events} = data
      cache.set('data', JSON.stringify(asset_events), 'EX', 10);
      return res.send(asset_events)
    });
  })
}