var Twit = require('twit')

var express = require('express')
var cors = require('cors');
var app = express()

// from https://stackoverflow.com/a/52759059
app.use('*', function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "X-Requested-With");
res.header('Access-Control-Allow-Headers', 'Content-Type');
res.header('Access-Control-Allow-Credentials', true);
next(); 
});

//enable pre-flight
app.options('*', cors());

var T = new Twit({
    consumer_key: '5Mvy9kwLOmPR7KGwDt7YN2L0k',
    consumer_secret: 'PdOnltBXQ7KCavmcVBPWESSJvHUREHBjirXvna48IVrkXz4iBg',
    access_token: '2861432285-6s8XJOO07yS7wKViPkfLnv0XYr6UFPjCZgd99LX',
    access_token_secret: 'xn3gI93W5SWIjzrIEuKEqWFtDsLNBQ14BZDi4W65XKjPN',
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
})

function randomDate() {
    var endDate = new Date();
    var startDate = new Date(endDate.getTime() - (24 * 60 * 60 * 1000 * 7));
    var generatedDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    var genYear = generatedDate.getFullYear();
    var genMonth = (generatedDate.getMonth() + 1).toString();
    var genDay = (generatedDate.getDate()).toString();
    var fixedMonth = function () {
        if (genMonth.length < 2) {
            return `0${genMonth}`;
        } else {
            return genMonth;
        }
    }
    var fixedDay = function () {
        if (genDay.length < 2) {
            return `0${genDay}`;
        } else {
            return genDay;
        }
    }
    return `${genYear}-${fixedMonth()}-${fixedDay()}`;
}

<<<<<<< HEAD
app.get('/amyklobuchar', function (req, res) {
    T.get('search/tweets', { q: `from:amyklobuchar until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
=======
function addHeaders(res){
    // From https://www.chromium.org/Home/chromium-security/corb-for-developers
    res.set({
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
>>>>>>> dc9c428fd3c673a57cf8f82881330cebc71aa8b6
    })
}

function getTweets(search_string, res){
    T.get('search/tweets', { q: `from:${search_string} until:${randomDate()} -filter:retweets`, count: 1 }, function(err, data, response) {
        addHeaders(res);
        res.send(JSON.stringify(data));
    })
}

app.get('/amyklobuchar', function (req, res) {
    getTweets('amyklobuchar', res)
})
app.get('/AndrewYang', function (req, res) {
<<<<<<< HEAD
    T.get('search/tweets', { q: `from:AndrewYang until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/BernieSanders', function (req, res) {
    T.get('search/tweets', { q: `from:BernieSanders until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/BetoORourke', function (req, res) {
    T.get('search/tweets', { q: `from:BetoORourke until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/CoryBooker', function (req, res) {
    T.get('search/tweets', { q: `from:CoryBooker until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/ewarren', function (req, res) {
    T.get('search/tweets', { q: `from:ewarren until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/JoeBiden', function (req, res) {
    T.get('search/tweets', { q: `from:JoeBiden until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/JoeSestak', function (req, res) {
    T.get('search/tweets', { q: `from:JoeSestak until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/JohnDelaney', function (req, res) {
    T.get('search/tweets', { q: `from:JohnDelaney until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/JulianCastro', function (req, res) {
    T.get('search/tweets', { q: `from:JulianCastro until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/KamalaHarris', function (req, res) {
    T.get('search/tweets', { q: `from:KamalaHarris until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/marwilliamson', function (req, res) {
    T.get('search/tweets', { q: `from:marwilliamson until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/MichaelBennet', function (req, res) {
    T.get('search/tweets', { q: `from:MichaelBennet until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/PeteButtigieg', function (req, res) {
    T.get('search/tweets', { q: `from:PeteButtigieg until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/GovernorBullock', function (req, res) {
    T.get('search/tweets', { q: `from:GovernorBullock until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/TimRyan', function (req, res) {
    T.get('search/tweets', { q: `from:TimRyan until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/TomSteyer', function (req, res) {
    T.get('search/tweets', { q: `from:TomSteyer until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/TulsiGabbard', function (req, res) {
    T.get('search/tweets', { q: `from:TulsiGabbard until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/WayneMessam', function (req, res) {
    T.get('search/tweets', { q: `from:WayneMessam until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/GovBillWeld', function (req, res) {
    T.get('search/tweets', { q: `from:GovBillWeld until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/realDonaldTrump', function (req, res) {
    T.get('search/tweets', { q: `from:realDonaldTrump until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/WalshFreedom', function (req, res) {
    T.get('search/tweets', { q: `from:WalshFreedom until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})
app.get('/MarkSanford', function (req, res) {
    T.get('search/tweets', { q: `from:MarkSanford until:${randomDate()} -filter:retweets`, count: 1 }, function (err, data, response) {
        res.send(data)
    })
})


console.log(randomDate());

app.listen(4000)

=======
    getTweets('AndrewYang', res)
})
app.get('/BernieSanders', function (req, res) {
    getTweets('BernieSanders', res)
})
app.get('/BetoORourke', function (req, res) {
    getTweets('BetoORourke', res)
})
app.get('/CoryBooker', function (req, res) {
    getTweets('CoryBooker', res)
})
app.get('/ewarren', function (req, res) {
    getTweets('ewarren', res)
})
app.get('/JoeBiden', function (req, res) {
    getTweets('JoeBiden', res)
})
app.get('/JoeSestak', function (req, res) {
    getTweets('JoeSestak', res)
})
app.get('/JohnDelaney', function (req, res) {
    getTweets('JohnDelaney', res)
})
app.get('/JulianCastro', function (req, res) {
    getTweets('JulianCastro', res)
})
app.get('/KamalaHarris', function (req, res) {
    getTweets('KamalaHarris', res)
})
app.get('/marwilliamson', function (req, res) {
    getTweets('marwilliamson', res)
})
app.get('/MichaelBennet', function (req, res) {
    getTweets('MichaelBennet', res)
})
app.get('/PeteButtigieg', function (req, res) {
    getTweets('PeteButtigieg', res)
})
app.get('/GovernorBullock', function (req, res) {
    getTweets('GovernorBullock', res)
})
app.get('/TimRyan', function (req, res) {
    getTweets('TimRyan', res)
})
app.get('/TomSteyer', function (req, res) {
    getTweets('TomSteyer', res)
})
app.get('/TulsiGabbard', function (req, res) {
    getTweets('TulsiGabbard', res)
})
app.get('/WayneMessam', function (req, res) {
    getTweets('WayneMessam', res)
})
app.get('/GovBillWeld', function (req, res) {
    getTweets('GovBillWeld', res)
})
app.get('/realDonaldTrump', function (req, res) {
    getTweets('realDonaldTrump', res)
})
app.get('/WalshFreedom', function (req, res) {
    getTweets('WalshFreedom', res)
})
app.get('/MarkSanford', function (req, res) {
    getTweets('MarkSanford', res)
})

const port = process.env.PORT;
app.listen(port)
 
>>>>>>> dc9c428fd3c673a57cf8f82881330cebc71aa8b6
