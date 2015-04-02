var React = require('react');

module.exports = React.createClass({
    render: function () {
        console.log('this.props', this.props);
        return (
            <h1>Hello worldly!</h1>
        );
    }
});
