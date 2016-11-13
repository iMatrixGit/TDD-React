import React, { PropTypes, Component } from 'react';
import { noop } from 'underscore';

const prefixWith = symbol => text => `${symbol}${text}`;

export default class Username extends Component {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { username, onClick } = this.props;

        onClick(username);
    }

    render() {
        const { username, className, shouldPrefix } = this.props;
        const text = shouldPrefix ? prefixWith('@')(username) : username;

        return (
            <div
                className={className}
                onClick={this.onClick}
            >
                {text}
            </div>
        );
    }
}

Username.defaultProps = {
    onClick: noop
};

Username.propTypes = {
    username: PropTypes.string.isRequired
};