export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({ error: message });
};

export const notFound = (req, res, next) => {
  res.status(404).json({ error: "Route not found" });
};
