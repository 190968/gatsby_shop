exports.handler = (event, context, callback) => {
  const name = event.queryStringParameters.name || "World";
  callback(null, {
    statusCode: 200,
    body: `No worries, ${name},  all is working fine!`
  })
}