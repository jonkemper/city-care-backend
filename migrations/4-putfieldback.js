'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "hasPosts" to table "users"
 *
 **/

var info = {
    "revision": 4,
    "name": "putfieldback",
    "created": "2020-09-11T20:17:17.183Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "users",
        "hasPosts",
        {
            "type": Sequelize.BOOLEAN,
            "field": "hasPosts",
            "default": false,
            "required": false
        }
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};