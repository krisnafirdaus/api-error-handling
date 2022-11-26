function midErr(err, req, res, next) {
  // next(createError(404));
  console.log(err.stack);
  res.status(500).send("ini message erorr terus");
}

module.exports = midErr;
