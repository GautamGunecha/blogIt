const errorHandler = (err, req, res, next) => {
  console.log("Error Handler");
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Internal Server Error.";

  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

module.exports = errorHandler;
