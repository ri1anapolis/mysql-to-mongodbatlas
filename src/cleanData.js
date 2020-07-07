async function cleanData(data) {
  try {
    const copy = await data.map(obj => {
      const cleanedObj = {}

      for (const [key, value] of Object.entries(obj)) {
        if (value !== "" && value !== null) cleanedObj[key] = value
      }

      return cleanedObj
    })

    return copy
  } catch (error) {
    console.error(`::: Cleaning: ERROR => ${error}!`)
  } finally {
    console.log(`::: Cleaning: Data cleaned!`)
  }
}

module.exports = cleanData
