const commonConfig = {
  port: process.env.PORT || 7227,
  allowedOrigins: process.env.ALLOWED_ORIGINS || 'http://localhost:3000',
};

export default commonConfig;
