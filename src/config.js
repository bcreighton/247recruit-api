module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://bryson:creativedev@localhost/247recruit',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postegresql://bryson:creativedev@localhost/247recruit-test',
  API_TOKEN: process.env.API_TOKEN || '438fed41-e90f-49bb-ab1a-1c946f3fc696',
}