const sqlite3 = require('sqlite3').verbose();

const levelsDb = new sqlite3.Database('./db/levels.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

levelsDb.serialize(() => {
  
  levelsDb.run(`
    CREATE TABLE IF NOT EXISTS levels (
      name TEXT,
      x_start INTEGER,
      x_end INTEGER,
      y_start INTEGER,
      y_end INTEGER
    )
  `);
  //these are not the correct level coordinates 
  levelsDb.run(`
    INSERT INTO levels (name, x_start, x_end, y_start, y_end)
    VALUES
      ('Level1', 185, 430, 365, 495),
      ('Level2', 1240, 1270, 330, 380),
      ('Level3', 1410, 1435, 75, 125),  
  `);

  levelsDb.each('SELECT * FROM levels', (err, row) => {
    if (err) {
      throw err;
    }
    console.log('Level:', row);
  });
});


levelsDb.close((err) => {
  if (err) {
    return console.error(err.message);
  }
});