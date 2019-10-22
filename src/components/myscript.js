var Twit = require('twit')

var express = require('express')
var app = express()

var T = new Twit({
    consumer_key:         '5Mvy9kwLOmPR7KGwDt7YN2L0k',
    consumer_secret:      'PdOnltBXQ7KCavmcVBPWESSJvHUREHBjirXvna48IVrkXz4iBg',
    access_token:         '2861432285-6s8XJOO07yS7wKViPkfLnv0XYr6UFPjCZgd99LX',
    access_token_secret:  'xn3gI93W5SWIjzrIEuKEqWFtDsLNBQ14BZDi4W65XKjPN',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

app.get('/', function (req, res) {
    T.get('search/tweets', { q: 'banana since:2011-07-11', count: 10 }, function(err, data, response) {
        res.send(data)
      })
})

app.listen(3000)
 
