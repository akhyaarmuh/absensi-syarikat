export default async (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message || 'Server error',
    data: err.data,
    error: err,
  });
};
