const initOptions = {/* initialization options */ };
const pgp = require('pg-promise')(initOptions);
const dbStringConfig = require('../config/dbConfig.js');

// Lấy String connect để kết nối database
const db = pgp(dbStringConfig);

async function getAllUsers() {
  const rs = await db.any('SELECT * FROM "Users"');
  return rs;
}

async function getUserByUsername(username) {
  const rs = await db.one('SELECT * FROM "Users" WHERE "username" = $1', [username]);
  return rs;
}

async function createNewUser(user) {
  const rs = await db.one('INSERT INTO "Users"(username, password) VALUES($1, $2) RETURNING *', [user.username, user.password]);
}

async function deleteUser(user) {
  const rs = await db.one('DELETE FROM "Users" WHERE id = $1 RETURNING *', [user.id, user.username, user.password]);
}

async function updateUser(user) {
  const rs = await db.one('UPDATE "Users" SET username = $2, password = $3 WHERE id = $1 RETURNING *', [user.id, user.username, user.password]);
}

module.exports = {
  getAllUsers, createNewUser, getUserByUsername, deleteUser, updateUser
}
