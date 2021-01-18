module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL || 'postgresql://bryson:creativedev@localhost/247recruit',
  TEST_DB_URL: process.env.TEST_DB_URL || 'postegresql://bryson:creativedev@localhost/247recruit-test',
  API_TOKEN: '438fed41-e90f-49bb-ab1a-1c946f3fc696',
}