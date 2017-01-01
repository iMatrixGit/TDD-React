import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { debounce } from 'underscore';
import { Motion, spring } from 'react-motion';
import LikeButton from './LikeButton';
import LikesCount from './LikesCount';

const loggedUser = 'john.doe';

export default class Likes extends Component {
    constructor() {
        super();

        this.onLikeButtonClick = debounce(this.onLikeButtonClick.bind(this), 300, true);
    }
    onLikeButtonClick() {
        const { isLikedByUser, onLike, onUnlike } = this.props;

        if (isLikedByUser) {
            onUnlike({ actor: loggedUser })
        } else {
            onLike({ actor: loggedUser });
        }
    }
    render() {
        const { count, className, isLikedByUser } = this.props;
        const { shouldRenderLikeButton, shouldRenderLikesCount } = this.props;
        const likeStatus = isLikedByUser ? 'liked' : 'unliked';

        return (
            <div className={classNames(
                'likes',
                { 'has-likes': count > 0 },
                className
            )}>
                { shouldRenderLikeButton ?
                    <LikeButton
                        likeStatus={likeStatus}
                        onClick={this.onLikeButtonClick}
                    />
                    : null
                }
                { shouldRenderLikesCount ?
                    <Motion
                        defaultStyle={{ scale: 0, opacity: 0 }}
                        style={{
                            scale: spring(1),
                            opacity: spring(1) }}>
                        { ({ scale, opacity }) => {

                            return (
                                <div
                                    className="likes-count-wrapper"
                                    style={{
                                        opacity,
                                        transform: `scale(${scale})`
                                    }}>
                                    <LikesCount count={count} />
                                </div>
                            )
                        }}
                    </Motion>

                    : null
                }
            </div>
        );
    }
}

Likes.defaultProps = {
    shouldRenderLikeButton: true,
    shouldRenderLikesCount: true,
    isLikedByUser: false,
    count: 0
};

Likes.propTypes = {
    shouldRenderLikeButton: PropTypes.bool.isRequired,
    shouldRenderLikesCount: PropTypes.bool.isRequired,
    isLikedByUser: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
    className: PropTypes.string
};