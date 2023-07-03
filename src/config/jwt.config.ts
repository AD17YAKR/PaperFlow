export const jwtSecret =
  process.env.JWT_SECRET_KEY ||
  'ecdc4786eebfe9261c0762de79a1afc6c7a904b29ec9d337af92ea49520930cc';
export const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '30d';
