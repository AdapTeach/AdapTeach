var request = require('koa-request');

const url = 'http://localhost:7474/db/data/transaction/commit';
const auth = {
    user: 'neo4j',
    pass: 'password',
    sendImmediately: true
};

module.exports = {

    send: function *(statement, parameters) {
        var options = {
            auth,
            json: {
                statements: [{statement, parameters}]
            }
        };

        var response = yield request.post(url, options);
        var result = response.body.results[0];
        if (!result)
            throw new Error(response.body.errors[0].message);
        var rows = [];
        result.data.forEach(item => {
            var row = {};
            result.columns.forEach((colName, index) =>
                row[colName] = item.row[index]
            );
            rows.push(row);
        });
        return rows;
    }

};