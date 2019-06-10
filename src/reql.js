(function(){
  const reql = require('rethinkdb');
  const config = require('./config').rethinkdb;

  class Reql {
    async init() {
      let conn = await reql.connect();
      let dbs = await reql.dbList().run(conn);

      // create database;
      if (dbs.includes(config.db)) {
	conn.use(config.db);
      } else {
	reql.dbCreate(config.db).run(conn);
      }

      // create tables;
      let tables = await reql.tableList().run(conn);
      config.tables.map(t => {
	if(!tables.includes(t)) {
	  reql.tableCreate(t).run(conn);
	}
      });

      conn.close((err) => { if (err) throw err; });
      return;
    }
  }

  let r = new Reql();
  r.init();
})();
