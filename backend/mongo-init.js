db.createUser({
  user: process.env.DB_USER,
  pwd: process.env.DB_USER_PASSWORD,
  roles: [
    {
      role: 'dbOwner',
      db: process.env.MONGO_INITDB_DATABASE,
    },
  ],
});

db.createCollection('users');
db.createCollection('transactions');
db.createCollection('categories')
