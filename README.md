# Portfolio Tracker API

An Awesome API to help store and analyze trading data, which allows adding/deleting/updating trades
and can do basic return calculations like Total return on the investment.

### Hosting details

- IP addess : 52.23.177.238 [ Check github issues for latest Static IP]
- port : 80

### key features

- Stores all the trade data in a external database
- instantly query multiple portfolios

### Tech stack used

- Hosted on AWS EC2 with static IP
- NodeJS / ExpressJS Framework
- MongoDB Cloud as Database
  - reason for choosing cloud instead of local db:
      1. persistant data - incase EC2 is terminated, data is safe.
      2. cost - mongodb cloud is free to host.

> **NOTE** : Postman collection is added within source code to help assist in trying out the APIs : /postmacollection/portfolioTrackerSanthosh.postman_collection.json

### API documentation

 The Document contains API usage instruction and description of its usage.

---

#### API 1 : Homepage / Welcome pages

Returns welcome response.

1. URL :

```
    GET /
```

2. URL params: not applicable
3. Body params: not applicable
4. Success response:
   - Returns Welcome page
   - Status code: 200
5. Error response:
   - Check if Server is up and running
   - Status code: 404
6. Sample response:

```
GET localhost:3000

hello from simple portfolio tracker APIs. To know more : https://github.com/santhosh6328/portfolioTracker :)
```

---

#### API 2 : Add Trade

- Adds trade entry to the database
- accepts the input via body parameters

1. URL :

```
    POST /trade/add-trade
```

2. URL params: doesnot accept any params
3. Body params:

```
   {
    "portfolio_id": <portfolio_number[Int]>,
    "trade_type": <"BUY" / "SELL"[String]>,
    "ticker_name": <"name of security"[String]>,
    "share_count": <"number of shares"[Int]>,
    "buying_price": <"buying price"[Int]>
    }
   ```

4. Success response:
   - Returns Stored document object
   - Status code: 200
5. Error response:
   - Returns Reason for error
   - Status code: 400
6. Sample response:  

```
{
    "portfolio_id": 1,
    "trade_type": "BUY",
    "ticker_name": "ITC",
    "share_count": 10,
    "buying_price": 80
}
```

---

#### API 3 : Update Trade

Updates the record in database

1. URL :

```
    PUT /trade/update-trade/<document_id>
```

2. URL params:
   - document_id :_id of the entry stored in DB
3. Body params:

```
   {
    "portfolio_id": <portfolio_number[Int]>,
    "trade_type": <"BUY" / "SELL"[String]>,
    "ticker_name": <"name of security"[String]>,
    "share_count": <"number of shares"[Int]>,
    "buying_price": <"buying price"[Int]>
    }
   ```

4. Success response:
   - Returns Stored document object
   - Status code: 200
5. Error response:
   - Returns Reason for error
   - Status code: 400
6. Sample response:  

```
PUT localhost:3000/trade/update-trade/60fc0aa30a619653ec95c0f3

{
    "portfolio_id": 1,
    "trade_type": "SELL",
    "ticker_name": "ITC",
    "share_count": 1,
    "buying_price": 200
}
```

---

#### API 4 : Delete Trade

Removes the trade from database

1. URL :

```
    DELETE /trade/remove-trade/<document_id>
```

2. URL params:
   - document_id :_id of the entry stored in DB
3. Body params: not applicable
4. Success response:
   - Returns deleted entry object
   - Status code: 200
5. Error response:
   - Returns Reason for error
   - Status code: 400
6. Sample response:  

```
DELETE localhost:3000/trade/remove-trade/60fc194afe8dac691e8fa498
{
    "_id": "60fc194afe8dac691e8fa498",
    "portfolio_id": "1",
    "trade_type": "BUY",
    "ticker_name": "ITC",
    "share_count": 20,
    "buying_price": 100,
    "__v": 0
}
```

---

#### API 5 : Fetch Portfolio

an aggregate view of all securities in the portfolio with its final
quantity and average buy price.

1. URL :

```
    GET /portfolio/fetch-portfolio/<portfolio_id>
```

2. URL params:
   - portfolio_id :_id of the portfolio
3. Body params: not applicab.e
4. Success response:
   - Returns Stored documents object
   - Status code: 200
5. Error response:
   - Returns Reason for error
   - Status code: 400
6. Sample response:

```
GET localhost:3000/portfolio/fetch-portfolio/1
[
    {
        "ticker_name": "ITC",
        "share_count": 0,
        "buying_price": 80,
        "trade_type": "BUY"
    }
]
```

---

#### API 6 : Fetch Trades

Fetches all the trade that is conducted on the given portfolio

1. URL :

```
    GET /portfolio/fetch-trades/<portfolio_id>
```

2. URL params:
   - portfolio_id : _id of the portfolio
3. Body params: not applicable
4. Success response:
   - Returns Stored document object
   - Status code: 200
5. Error response:
   - Returns Reason for error
   - Status code: 400
6. Sample response:

```
localhost:3000/portfolio/fetch-trades/1

[
    {
        "trade_type": "BUY",
        "ticker_name": "ITC",
        "share_count": 20,
        "buying_price": 100
    },
    ...
    {
        "trade_type": "SELL",
        "ticker_name": "ITC",
        "share_count": 10,
        "buying_price": 80
    }
]
```

---

#### API 7 : Fetches the total returns generated by portfolio

Returns the overall returns generated by the portfolio.

1. URL :

```
    GET /portfolio/returns/<portfolio_id>
```

2. URL params:
   - portfolio_id :_id of the portfolio
3. Body params: not applicable
4. Success response:
   - Returns overall returns realized from portfolio
   - Status code: 200
5. Error response:
   - Returns Reason for error
   - Status code: 400
6. Sample response:

```
localhost:3000/portfolio/returns/1

6590
```

---

#### API 8 : Fetchs entire DB

Returns all records in database to help debugging.

1. URL :

```
    GET /trade/all
```

2. URL params: not applicable
3. Body params: not applicable
4. Success response:
   - Returns all the entries Stored in DB
   - Status code: 200
5. Error response:
   - Returns Reason for error
   - Status code: 400
6. Sample response:

```
localhost:3000/trade/all

[
    {
        "_id": "60fc194afe8dac691e8fa498",
        "portfolio_id": "1",
        "trade_type": "BUY",
        "ticker_name": "ITC",
        "share_count": 20,
        "buying_price": 100,
        "__v": 0
    },
    ...
    {
        "_id": "60fc198dfe8dac691e8fa4a1",
        "portfolio_id": "1",
        "trade_type": "SELL",
        "ticker_name": "ITC",
        "share_count": 10,
        "buying_price": 80,
        "__v": 0
    }
]
```

---

### Deployment procedure:

1. Create an account with mongodb cloud. (Optional if mongodb is install locally)  : [account creation steps](https://docs.atlas.mongodb.com/tutorial/create-atlas-account/)

2. deploy EC2 instance with appropriate configurations (amazon linux ami 2 if you want to follow the below steps)

3. ssh to EC2 and run the following commands

```

//update the yum repository
[sudo] yum update

//install node js
curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
[sudo] yum install nodejs

//install git if not already present
yum install git

//clone the project
git clone <git url>

// change directory to cloned repo
cd </portfolioTracker>

//application specific instructions
[sudo] npm install 
export PORT=<port | 80>
export URI=<mongodb_connection_uri>

//start the applicaion
[sudo] npm start

(check if the application is up @ http://public_ip:<port>/)

// optional : create a backgroud process for node
[sudo] npm install -g forever
[sudo] forever start app.js

additional commands
[sudo] forever list
[sudo] forever logs

```

---