module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'admin',
      database: 'redmine'
    }
  }
};

// If you want to use PostgreSQL just use this configuration below and run npm instal --save pg.
// development: {
//   client: 'pg',
//     connection: {
//     host: '127.0.0.1',
//       user: 'postgres',
//       password: 'postgres',
//       database: 'redmine'
//   }
// }