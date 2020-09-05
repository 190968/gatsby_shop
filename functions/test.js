exports.handler = (event, context, callback) => {
  const  GREETING  = process.env.uri;
  callback(null, {
    statusCode: 200,
    body: `No worries, ${GREETING} all is working fine!`
  })
}