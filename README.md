# mysql-to-mongodbatlas

This is a simple application to get data from a MySQL database, remove null and empty attributes/keys, and send it to a MongoDB Atlas instance.

## How to install

- `git clone ...`
- `yarn install`

#### Dependencies

- `mongodb`
- `mysql2`

## How it works

Just run it with a JSON configuration file and it's done!

#### Configuration file

```
{
  "mysql": {
    "query": "SELECT 'myQuery...'",
    "connectionParameters": {
      "host": "my.nice.ip.address",
      "port": "myPort",
      "database": "myDatabase",
      "user": "myUser",
      "password": "myPassword"
    }
  },
  "mongo": {
    "db": "myMongoDb",
    "collection": "myCollection",
    "connectionParameters": {
      "uri": "mongodb+srv://myUser:myPassword@my-mongodb-cluster",
      "options": {
        "useNewUrlParser": true,
        "useUnifiedTopology": true
      }
    }
  }
}
```

Some parameters under the `connectionParameters` section may be optional.

You can pass a configuration file path as argument to the script. If called with no arguments, the script will try to load a file named `config.json` from it's same folder.

#### How to run it

- `yarn start`: it'll load the default configuration file path.
- `yarn start path/to/my/config.json`: it'll load the given file.

#### Docker

1. Build: `docker build -t mysql-to-mongodbatlas .`
2. Run: `docker run --rm --mount type=bind,source="$(pwd)"/src/config.json,target=/app/src/config.json,readonly mysql-to-mongodbatlas`

###### Notes

- Give the container a name at the build time (`-t mysql-to-mongodbatlas`), it will make things easier to run afterwards.
- Mount the configuration file at the run time (`type=bind,source="$(pwd)"/src/config.json,target=/app/src/config.json,readonly`) to make it work:
  - On Linux or MacOS, the `$(pwd)` variable will expand to the current directory;
  - Mount the configuration file to the default configuration path `/app/src/config.json`.
  - You can pass a configuration path as argument, but you need to be sure you mounted the configuration file that matches this path.

## Scope

This app will:

0. log every step to stdout;
1. load a configuration file;
2. get data from a MySQL database;
3. remove attributes/keys with null or empty values;
4. remove all the mongoDB collection data;
5. insert all the new data to the mongoDB collection.

Nothing more, nothing less.

## Why?

I need something exactly like this to "sync data" (update a whole collection in a given time interval) to a website that uses the MongoDB Atlas database.
