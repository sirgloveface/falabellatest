class FalabelaRepository {
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS Beer (
        Id INTEGER PRIMARY KEY,
        Name TEXT,
        Brewery TEXT,
        Country TEXT,
        Price REAL,
        Currency TEXT)`
      return this.dao.run(sql)
    }

    create(data) {
       console.log(data)
        return this.dao.run(
          `INSERT INTO Beer(Id, Name, Brewery, Country, Price, Currency ) 
          VALUES (?, ?, ?, ?, ?, ?)`,
          [data.Id, data.Name, data.Brewery, data.Country, data.Price, data.Currency])
    }

    delete(id) {
      return this.dao.run(
        `DELETE FROM events WHERE id = ?`,
        [id]
      )
    }

    deleteAll() {
      return this.dao.run(`DELETE FROM beer`)
    }


    getById(id) {
      return this.dao.get(
        `SELECT * FROM beer where Id = ?`,
        [id])
    }

    getAll() {
      return this.dao.all(`SELECT * FROM beer `)
    }

    // getByActor(id) {
    //   // return this.dao.all(`
    //   // select DISTINCT events.*
    //   //  from events,  json_tree(events.event, '$.actor')
    //   //  where json_tree.key = 'id'
    //   //  and json_tree.value = ${id};`)
    //   return this.dao.all(`
    //   select DISTINCT events.*
    //    from events where  json_extract(events.event, '$.actor.id') = ${id} 
    //    order by json_extract(events.event, '$.id') asc;`)
    // }

    // getActorStreak() {
    //   return this.dao.all(`
    //   select json_extract(events.event, '$.actor') as data, 
    //   json_extract(events.event, '$.actor.login') as login,
    //   count( json_extract(events.event, '$.actor.login')) as cuenta,
    //   max(json_extract(events.event, '$.created_at')) as fecha
    //    from events group by login 
    //    order by COUNT(json_extract(events.event, '$.actor.login')) desc, 
    //    json_extract(events.event, '$.created_at') desc, json_extract(events.event, '$.actor.login')`)
    // }
    // updateActor(data, id) {
    //   return this.dao.all(`
    //   UPDATE events set event = ? WHERE id = ${id}`,
    //   [data])
    // }
  }
  
  module.exports = FalabelaRepository;