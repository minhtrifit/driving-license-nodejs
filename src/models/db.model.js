const initOptions = {/* initialization options */ };
const pgp = require('pg-promise')(initOptions);
const dbStringConfig = require('../config/dbConfig.js');

// Lấy String connect để kết nối database
const db = pgp(dbStringConfig);

async function getAllAccounts() {
  const rs = await db.any('SELECT * FROM "accounts"');
  return rs;
}

async function getAllLicenses() {
  const rs = await db.any('SELECT * FROM "license"');
  return rs;
}

async function getAllQuestion() {
  const rs = await db.any('SELECT * FROM "questions"');
  return rs;
}

async function getOnlyUserAccount(type) {
  const rs = await db.one('SELECT * FROM "accounts" WHERE type = $1', [type]);
  return rs;
}

async function getUserByUsername(username) {
  const rs = await db.one('SELECT * FROM "accounts" WHERE username = $1', [username]);
  return rs;
}

async function createNewUserAccount(user) {
  const rs = await db.one('INSERT INTO "accounts"(id, name, username, password, type) VALUES($1, $2, $3, $4, $5) RETURNING *', [user.id, user.name, user.username, user.password, user.type]);
}

// async function deleteUser(user) {
//   const rs = await db.one('DELETE FROM "Users" WHERE id = $1 RETURNING *', [user.id, user.username, user.password]);
// }

// async function updateUser(user) {
//   const rs = await db.one('UPDATE "Users" SET username = $2, password = $3 WHERE id = $1 RETURNING *', [user.id, user.username, user.password]);
// }

module.exports = {
  getAllAccounts, createNewUserAccount, getOnlyUserAccount, getUserByUsername, getAllLicenses, getAllQuestion
}
