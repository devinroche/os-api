# os-api
> Helper api to prevent myself from calling the os api too many times. This api utilizes caching to save the response for x-seconds only calling the api once the current key-value pair has expired.

## api
base url: `https://api.opensea.io/api/v1/`

https://api.opensea.io/api/v1/assets?owner=0x0239769a1adf4def9f07da824b80b9c4fcb59593&order_by=current_price&order_direction=asc