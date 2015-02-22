twitter-stream-grumpy
====================

Web application that streams tweets containing the hashtag #maruthecat and #grumpycat. Built using websockets, angular, and express.

##Setup##

#####Install Global Dependencies#####

    npm install -g karma-cli
    npm install -g grunt-cli
    npm install -g nodemon
    sudo apt-get install mongodb
    sudo npm install bower

#####Install local dependencies#####

    npm install
    bower install

#####Twitter Credentials#####

You will also have to add in your twitter credentials. Please see `sample-config.js` for an example of how the config should look. Copy and rename `sample-config.js` to `config.js` and enter in the necessary credentials.

```javascript
twitOptions: {
    consumer_key: '...',
    consumer_secret: '...',
    access_token: '...',
    access_token_secret: '...'
},
port: 3001
```


##Loading Data into the application##
When the application is started it will listen to twitter streams and will automatically capture incoming tweets. However, you can also backfil tweets into the application using the backfill script. The backfill script is located at `bin/backfill.js`

Backfill configuration to specify how many messages to load. The amount of messages you can load will ultimately be capped by the api rate-limit:

```javascript
//...
msgsToLoad = 5000,
msgsPerCall = 100;
//..
```

Execute backfill script:

    node bin/backfill.js

##Starting the Application##

There are 2 ways to start the application. The first way is to directly call the start script:

    grunt
    node bin/www

The second way is use NPM start the application which will start grunt watch and use nodemon to automatically handle the restarting of the application on file changes:

    npm start

##Testing the Application##

Run Server Side tests

    npm test

Run Karma Tests

    cd test karma start karma.conf.js &
    karma run
