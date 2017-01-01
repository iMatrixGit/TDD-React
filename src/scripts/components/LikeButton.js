import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

export const likeButtonIcons = {
    liked: '💙',
    unliked: '💛'
};

export default class LikeButton extends Component {
    render() {
        const { className, onClick, likeStatus } = this.props;
        return (
            <div
                className={classNames(
                    'like-button',
                    { 'liked': likeStatus === 'liked' },
                    className)}
                onClick={onClick}
            >
                {likeButtonIcons[likeStatus]}
            </div>
        );
    }
}

LikeButton.defaultProps = {
    likeStatus: 'unliked'
};

LikeButton.propTypes = {
    likeStatus: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func
};