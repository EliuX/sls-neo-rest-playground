'use strict';

const neo4J = require("neo4j-driver").v1;

const driver = neo4J.driver(process.env.NEO4J_URI, neo4J.auth.basic(
    process.env.NEO4J_USER,
    process.env.NEO4J_PASSWORD
));
const session = driver.session();

module.exports.hello = async (event, context, cb) => {
    return session.run('match (d:Person) return d limit 3').then(result => {
        const persons = result.records.map(r => r._fields[0].properties);
        return {
            statusCode: 200,
            body: JSON.stringify(persons, null, 2)
        };
    }).catch(console.error)
        .finally(() => driver.close());
};
