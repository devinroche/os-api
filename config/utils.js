const events = (eventType, offset) => {
    let offsetter = offset ? offset : 0
    let et = eventType ? eventType : 'successful'

    return `https://api.opensea.io/api/v1/events/?event_type=${et}&offset=${offsetter}`
}

const assets = (account) => (
    `https://api.opensea.io/api/v1/assets?owner=${account}`
)

const asset = (acd, tid) => (
    `https://api.opensea.io/api/v1/asset/${acd}/${tid}/`
)

module.exports = {
    events,
    asset,
    assets
}