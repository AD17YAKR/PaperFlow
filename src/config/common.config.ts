const commonConfig = {
  port: process.env.PORT || 8000,
  allowedOrigins: process.env.ALLOWED_ORIGINS || 'http://localhost:3000',
};

export default commonConfig;
