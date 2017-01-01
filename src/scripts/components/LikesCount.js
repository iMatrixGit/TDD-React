import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

export default class LikesCount extends Component {
    render() {
        const {  count, className } = this.props;
        return (
            <div className={classNames(
                'likes-count',
                className
            )}>
                {count}
            </div>
        );
    }
}

LikesCount.defaultProps = {
    count: 0
};

LikesCount.propTypes = {
    count: PropTypes.number.isRequired,
    className: PropTypes.string
};