import express from 'express';
import redis from 'redis';

import Promise from 'bluebird';
import bodyParser from 'body-parser'
/*
  REDIS CLIENT
  listens on port 6379 by default
  createClient(_host_, _port_)
*/
const client = redis.createClient();

// listen for errors from redis client
client.on('error', (err) => {
  console.log('Error from Redis client', err);
})
// listen for connection events
client.on('connect', () => {
  console.log('Redis client is connected!');
})

/*
  EXPRESS SERVER
  http interface
  GET, POST, PUT, DELETE
*/
const app = express();
app.use(bodyParser.json());

/*
====================================================
  CLIENT INTERFACE

  applications, trading bots, etc...

  POST:

  POST URI:
  /approve/:token_contract_address;
  /sell/token1_contract_address/:token2_contract_address

  GET:

  GET URI:
  /approve/:token_contract_address/:seller_address
  /submitSell/:token_contract_addres/:seller_address

====================================================
*/


/*
  POST
*/
app.post('/approve', (req, res) => {
  console.log('req', JSON.stringify(req.body));

  // Promise.delay(0)
  // .then(())
  res.end(JSON.stringify(req.body));
})

app.post('/sell', (req, res) => {
  console.log('req', JSON.stringify(req.body));

  client.set('sell 1', JSON.stringify(req.body), () => {
    console.log('sucessfully stored json');
  })
  res.end(JSON.stringify(req.body));
});

app.post('/delete', (req, res) => {
  res.end(JSON.stringify(req.body));
})


/*
  GET
*/

// orderbook
app.get('/sell', (req, res) => {
  client.get('sell 1', (err, reply) => {
    console.log('reply', reply);
    res.end(reply);
    if(err) {console.log(err);}
  })
})
// orderhistory

// user info

/*
====================================================
  ADMIN Interface

  server based exchange agents, Consenergy admins

  POST:
  /transferFrom/:token_contract_address/:seller_address
  /match/:exchange_contract/

=====================================================
*/

app.post('/match', (req, ress) => {
  console.log('hit /match endpoint');
})

app.listen(6000);

console.log('API listening on port 6000');
console.log('Redis client on port 6379');
