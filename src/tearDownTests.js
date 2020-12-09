const db = require('./api/db');

module.exports = async () => {
  await db.destroy();
};
