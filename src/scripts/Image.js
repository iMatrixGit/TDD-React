import React, { PropTypes, Component } from 'react';
import _ from 'underscore';

export default class Image extends Component {
    constructor() {
        super();
        this.onImageLoad = this.onImageLoad.bind(this);
        this.state = { loaded: false };
    }
    componentDidMount() {
        this.mounted = true;
        this.loadImage();
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    loadImage() {
        const { src, onError } = this.props;
        const img = new window.Image();
        this.setState({ loaded: false });
        img.onload = this.onImageLoad;
        img.onerror = onError;
        img.src = src;
    }
    onImageLoad() {
        if (this.mounted) {
            const { onLoad } = this.props;
            this.setState({ loaded: true });
            onLoad();
        }
    }
    render() {
        const { style, src, className, wrapperClassName } = this.props;
        const { shouldDisplayLoader, onClick, onLoad, onError } = this.props;
        return (
            <span className={wrapperClassName}>
                <img
                    key="image"
                    ref="imgElem"
                    className={className}
                    src={src}
                    style={style}
                    onLoad={onLoad}
                    onError={onError}
                    onClick={onClick}
                />
                { shouldDisplayLoader && !this.state.loaded ? <span /> : null }
            </span>
        );
    }
}
Image.defaultProps = {
    'isHidden': false,
    'onLoad': _.noop,
    'onError': _.noop,
    'onClick': _.noop,
    'transitionName': 'scalefade'
};
Image.propTypes = {
    'src': PropTypes.string,
    'transitionName': PropTypes.string,
    'className': PropTypes.string,
    'wrapperClassName': PropTypes.string,
    'isHidden': PropTypes.bool,
    'shouldDisplayLoader': PropTypes.bool,
    'loaderSize': PropTypes.number,
    'onLoad': PropTypes.func.isRequired,
    'onError': PropTypes.func.isRequired,
    'onClick': PropTypes.func.isRequired,
    'style': PropTypes.object
};