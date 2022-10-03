# api-server2

## Deployment

Currently all of my five available Heroku app slots are being used for previous assignments (apologies). Once the previous assignments are graded I will delete those servers from Heroku and deploy this server!

## Notes

### Basic SQL

SQL stands for Structured Query Language, and it is designed to be able to programmatically perfrom operations against a database.  SQL databases are relational, as opposed to Mongo which is non-relational.  Having relational data allows records to point to each other using `keys`.

### SQL Shell Commands

| Command                                                   | Description                                                                    |
| --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `psql`                                                    | Launch the postgres shell. Once in the shell, you should see `database-name=#` |
| `\l`                                                      | Show all databases                                                             |
| `\c <name>`                                               | Use database with the name `<name>`                                            |
| `\dt`                                                     | Show all tables in the current database                                        |
| `SELECT * FROM "table-name";`                             | List all the documents / records in the specified collection `table-name`      |
| `INSERT INTO "table-name" (<columns>) VALUES (<values>);` | Save a new record to the specified table `<table-name>`                        |
| `DROP TABLE "table-name";`                                | Completely removes the specified table `<table-name>`                          |

### Collection Interface

In order to create a module that can perfrom all database specific operations, we are using a Javascript class.  Each method will perform a sequelize operations required for CRUD.

```javascript
class Collection {
   constructor(dbModel) {
      this.model = dbModel;
   }

   create() {
      // creates a new model instance
   }

   read(id = null) {
      // fetches all model instances or perhaps one model.
   }

   update(id) {
      // updates a model instance in our SQL database
   }

   delete(id) {
      // removes a model instance from SQL database
   }
}

module.exports = Collection;
```

Our Router now only needs to import the `Collection` class and instantiate to perform database operations.

```javascript

const express = require('express');
const Collection = require('./collection.js');
const userModel = require('./user.model.js');

const router = express.Router();
const Users = new Collection(userModel); // connects to a SQL database and performs CRUD for Users.

router.get('/user', async (req, res, next) {
  let users = await Users.read(); // returns User records.
  res.send(users):
});

router.post('/users', async(req, res, next) => {
  let newUser = await Users.create({name: 'Tim'}) // creates and returns a new User record.
  res.send(newUser);
});

module.exports = router;

```