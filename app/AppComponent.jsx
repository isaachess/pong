var React = require('react');
var jones = require('./game-api/test.js');

console.log('bobby', jones.naughty);

module.exports = React.createClass({
    render: function () {
        return (
            <h1>Hello worldly!</h1>
        );
    }
});
