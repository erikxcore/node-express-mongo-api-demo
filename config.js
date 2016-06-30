module.exports = {
    'secret': 'somesecret123',
    'admin_secret': 'somesecret123456', //to generate different auth tokens
    'session_secret': 'hidethatsecret1',
    'TOKEN_REFRESH_EXPIRATION': '1300', //1300 half of 3600
    'TOKEN_EXPIRATION': '1hr', //JWT token will expire after an hour of inactivity. If user is within a half hour of this the token will be refreshed.
    'COOKIE_EXPIRATION': '7200', //2 hours or 2 * 60 * 60
    'redisUrl': 'redis://h:p2hq0t3smjc7jafhe3h001nojdf@ec2-174-129-243-209.compute-1.amazonaws.com:26019',
    //Thanks to Heroku for hosting redis db
    'database': 'mongodb://eric:m3d1ac0m@ds023674.mlab.com:23674/mongocom'
    //Thanks to mLab for hosting, https://modulus.io/ could have also been used (or simply just hosting the DB on same server)
};