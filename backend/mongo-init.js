db.createUser({
  user: 'test_user',
  pwd: 'test_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'finance_tracker',
    },
  ],
});

db.createCollection('users');
db.createCollection('transactions');
db.createCollection('categories')