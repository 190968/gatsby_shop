exports.handler = (event, context, callback) => {
  const { GREETING } = "Hello Bob";
  callback(null, {
    statusCode: 200,
    body: `No worries, ${GREETING} all is working fine!`
  })
}