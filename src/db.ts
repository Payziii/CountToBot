// Get MySQL client
import * as mysql from 'mysql2';

// Create the connection to database
const connection = mysql.createConnection({
    host: process.env.MSQL_HOST,
    user: process.env.MSQL_USER,
    database: process.env.MSQL_DB,
    password: process.env.MSQL_PASS
});

// Create table for counters
connection.query(
    `CREATE TABLE IF NOT EXISTS COUNTER (
  countId INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user BIGINT NOT NULL,
  name TEXT NOT NULL,
  timezone TEXT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  event TIMESTAMP NOT NULL,
  lastRemind TIMESTAMP NOT NULL,
  ended BOOLEAN NOT NULL
);`,
    function (err, results, fields) {
        //console.log(results);
        //console.log(fields);
    }
);

// Add new counter
export async function newCounter(user, name, timezone, event) {
    connection.query(
        `INSERT INTO COUNTER VALUES (null, ${user}, '${name}', '${timezone}', CURRENT_TIMESTAMP, TIMESTAMP("${event}"), CURRENT_TIMESTAMP, false);`,
        function (err, results, fields) {
            console.log(err)
            //console.log(results); 
            //console.log(fields); 
        }
    );
}

// Get user counters
export async function getUserCounters(user) {
    let res;
    connection.query(
        `SELECT * FROM COUNTER WHERE user = ${user};`,
        function (err, results, fields) {
            console.log(results)
        }
    );
    return res;
}

//newCounter(5426492870, "Новый год!", "Asia/Yekaterinburg", "2025-01-01")
//getUserCounters(5426492870).then((res) => console.log(res))