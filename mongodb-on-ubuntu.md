# Installing and managing MongoDB on Ubuntu

> Make sure you have a `/data/db` dir on server root.

> *mongod* is the primary daemon process for the MongoDB system. It handles data requests, manages data access, and performs background management operations.

### Helpful Links
* [How to Install and Configure MongoDB on Ubuntu 16.04
](https://www.howtoforge.com/tutorial/install-mongodb-on-ubuntu-16.04/)
* [How to Install MongoDB on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)
* [mongod](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption--repair)
* [mongo Shell Quick Reference](https://docs.mongodb.com/manual/reference/mongo-shell/)
* [Mongo Operators](https://docs.mongodb.com/manual/reference/operator/)

--- 

## `systemctl` commands for managing mongo server
[Sytemctl](http://www.ebugg-i.com/technology/linux/what-is-systemctl-linux-command.html) is a linux command to control the systemd system and service manager . In Fedora 16 linux "systemctl" command is used to Enable, Start, Restart, Reload, Stop and to check the status of system services like SSHD (Secure Shell) , HTTPD (Apache Web server), MySqld (MySql Database) etc.

* `sudo systemctl enable mongod` - enable automatically starting MongoDB when the system starts
* `sudo systemctl start mongod` - start MongoDB with systemctl
* `sudo systemctl status mongod` - check status of mongod service

> Verify in the list if the service is enabled or disabled using the command below:
> `sudo systemctl enable mongodb.service`

> Sometimes you may need to reload the daemon, like after editing _mongod.service_, use `systemctl daemon-reload` to do so.

> You can manage the MongoDB service using the systemctl command (e.g. `sudo systemctl mongodb stop`, `sudo systemctl mongodb start`).

* `sudo mongod --repair` - Runs a repair routine on all databases. This is equivalent to shutting down and running the repairDatabase database command on all databases.

---

## Basic **mongo shell** commands

>[Database Commands](https://docs.mongodb.com/manual/reference/command/)

Show all databases 
```bash
show dbs
```
View current db selected
```bash
db
```

Create or switch to database
```bash
# If DATABASE_NAME doesn't exist it will be created implicitly
use DATABASE_NAME
```

View collections in selected db
```bash 
show collections

# or

db.getCollectionNames()
```

Explicitly creating collections for selected db, other wise it will implicitly done with db commands
```bash
db.createCollection('customers')    
```

Deleting collection 
```bash 
db.employees.drop()

# or 

db.getCollection("employees").drop()
```

Insert document in collection
```bash
db.customers.insert({first_name:'foo', last_name:'bar'})

# or

db.customers.save({first_name:'foo', last_name:'bar'})
# If a document does not exist with the specified _id value, the save() method performs an insert with the specified fields in the document.

# If a document exists with the specified _id value, the save() method performs an update, replacing all field in the existing record with the fields from the document.
```

Inserting multiple documents at once, use an array of objects:
```bash
db.customers.insert([
    {first_name:'John', last_name:'Doe'},
    {first_name:'Mike', last_name:'Williams'},
    {first_name:'Sam', last_name:'Smith'}
])
```

Update entire (single) document in collection
> Providing the _upsert_ option as _true_ will insert the document if query criteria isn't matched. 

```bash
db.customers.update({first_name: 'fooz'}, {last_name:'Slate'})

# or 

db.customers.save({_id:ObjectId("5a4bd927201e1deb5b4aa27a"), first_name:'fooz', last_name:'bar'})

# note the _id is provided, if found it will update existing document otherwise it will perform an insert
```
Update (set) only fields specified
```bash    
# update using $set to only update specified fields with new values

db.customers.update(
    {first_name: 'fooz'}, 
    {$set:
        {last_name: 'Slate'}
    }
)
```

Update (multi)ple documents
> to update multiple documents that meet the query criteria set option multi to `true` in third argument object

> multi update only works with $ operators

```bash
db.customers.update(
    {first_name: 'fooz'}, 
    {$set:
        {last_name: 'Slate'}
    }, 
    {multi: true}
)
```

Remove field from document
```bash
db.customers.update(
    {first_name:'Mike'}, 
    {$unset:
        {last_name:''}
    }
)
```

Delete document form collection
```bash
db.customers.remove({_id: ObjectId("5a4bdb1c201e1deb5b4aa27c")})
```

Finding documents in a collection
```bash
# return first document that matches query criteria
db.customers.findOne({first_name:'Mike'})

# return all documents that match query criteria
db.customers.find({first_name:'Mike'})

# $in operator performs OR operation on field
db.customers.find({last_name:{$in:["Slate", "Williams"]}})
```

Sorting documents ASC order by first name
> to sort by DESC order change `1 to -1`
```bash
db.customers.find(
    {
        last_name:
            {$in:["Slate", "Williams"]}
    }
).sort({first_name: 1})
```

---

## notes
* **_id** is a 12 bytes hexadecimal number which assures the uniqueness of every document. You can provide _id while inserting the document. If you don’t provide then MongoDB provides a unique id for every document. These 12 bytes first 4 bytes for the current timestamp, next 3 bytes for machine id, next 2 bytes for process id of MongoDB server and remaining 3 bytes are simple incremental VALUE.


