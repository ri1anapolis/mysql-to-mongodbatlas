const { MongoClient } = require("mongodb")

async function getData(data, { db, collection, connectionParameters }) {
  const { uri, options } = connectionParameters
  const client = new MongoClient(uri, options)

  try {
    await client.connect()
    console.log(`::: MongoDB: Connected to server!`)

    await client.db(db).collection(collection).deleteMany({})
    console.log(
      `::: MongoDB: Deleted the "${collection}" collection on "${db}" database!`
    )

    await client.db(db).collection(collection).insertMany(data)
    console.log(
      `::: MongoDB: Inserted ${data.length} items in the "${collection}" collection on "${db}" database!`
    )
  } catch (error) {
    console.error(`::: MongoDB: ERROR => ${error}`)
  } finally {
    await client.close()
    console.log(`::: MongoDB: Disconnected from server!`)
  }
}

module.exports = getData
