const mysql = require('serverless-mysql');

const database = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});

async function query(userQuery) {
  try {
    const results = await database.query(userQuery);
    await database.end();
    return results;
  } catch (error) {
    return { error };
  }
}

export default query;
