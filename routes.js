const axios = require('axios');
const cache = require('./config/cache')
const utils = require('./config/utils')
const url = (offset) => `https://api.opensea.io/api/v1/events/?event_type=successful&offset=${offset}`;

module.exports = function (router) {
	router.get('/recent', async (req, res) => {
		cache.get('recent', async (err, value) => {
			if (value !== null) {
				return res.send(JSON.parse(value))
            }
			const { data } = await axios.get(utils.events())
			const { asset_events } = data
			cache.set('recent', JSON.stringify(asset_events), 'EX', 15);
			return res.send(asset_events)
		});
    })
    router.get('/assets/:id', async (req, res) => {
		cache.get(`acc_${req.params.id}`, async (err, value) => {
			if (value !== null) {
				return res.send(JSON.parse(value))
            }
			const { data } = await axios.get(utils.assets(req.params.id))
			const { assets } = data
			cache.set(`acc_${req.params.id}`, JSON.stringify(assets), 'EX', 30);
			return res.send(assets)
		});
    })
    router.get('/asset/:account/:asset', async (req, res) => {
		cache.get(`${req.params.account}_${req.params.asset}`, async (err, value) => {
			if (value !== null) {
				return res.send(JSON.parse(value))
            }
			const { data } = await axios.get(utils.asset(req.params.account, req.params.asset))
			cache.set(`${req.params.account}_${req.params.asset}`, JSON.stringify(data), 'EX', 30);
			return res.send(data)
		});
	})
}
