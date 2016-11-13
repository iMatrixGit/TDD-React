import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Image from './Image';

const CROPPED_IMAGE_SIZING_AUTO = 'auto';
const CROPPED_IMAGE_SIZING_FIT = 'fit';
const CROPPED_IMAGE_SIZING_FILL = 'fill';

function calcDimensionByAspect({ baseDimension, targetBaseDimension, targetSecondDimension }) {
    const aspect = targetBaseDimension / targetSecondDimension;
    return baseDimension * aspect;
}
/*
 The image container should have at least one fixed dimension (width or height) or both
 The algorithm for image scaling is based on container fixed dimension.
 1. imageSizing = "none" - image preserve it's original dimensions.
 2. imageSizing = "fit" - image dimensions is scaled by container fixed dimension.
 3. imageSizing = "auto" - image dimensions would be changed only,
 if it's original dimension exceeds the container available width and height;
 */
export default class CroppedImage extends Component {
    constructor() {
        super();
        this.getContainerStyle = this.getContainerStyle.bind(this);
    }
    // Check is scaling needed based on container fixed dimension (width or height)
    shouldScaleImage({ width, height }) {
        const { imageSizing, containerWidth, containerHeight, containerMaxWidth, containerMaxHeight } = this.props;
        const containerAvailableWidth = containerWidth || containerMaxWidth;
        const containerAvailableHeight = containerHeight || containerMaxHeight;
        if (imageSizing === 'fill') {
            return width < containerAvailableWidth || height < containerAvailableHeight;
        }
        return width > containerAvailableWidth || height > containerAvailableHeight;
    }
    // Return on which dimension should stretch the image
    getFillBasis() {
        const { containerWidth } = this.props;
        return containerWidth ? 'width' : 'height';
    }
    getInvertedFillBasis() {
        const { containerWidth } = this.props;
        return containerWidth ? 'height' : 'width';
    }
    // Calculate image dimensions to fill the container, by concrete dimension
    getImageFillByDimensions({ fillBy, containerWidth, containerHeight }) {
        const { imageWidth, imageHeight } = this.props;
        if (fillBy === 'width') {
            return {
                width: containerWidth,
                height: calcDimensionByAspect({
                    baseDimension: containerWidth,
                    targetBaseDimension: imageHeight,
                    targetSecondDimension: imageWidth
                })
            };
        }
        return {
            width: calcDimensionByAspect({
                baseDimension: containerHeight,
                targetBaseDimension: imageWidth,
                targetSecondDimension: imageHeight
            }),
            height: containerHeight
        };
    }
    // Calculate image dimensions to fill the container, stretched by width or height
    getFillDimensions() {
        const { containerWidth, containerHeight } = this.props;
        let fillBy = this.getFillBasis();
        const { width, height } = this.getImageFillByDimensions({ fillBy, containerWidth, containerHeight });
        if (this.shouldScaleImage({ width, height })) {
            fillBy = this.getInvertedFillBasis();
            return this.getImageFillByDimensions({ fillBy, containerWidth, containerHeight });
        }
        return this.getImageFillByDimensions({ fillBy, containerWidth, containerHeight });
    }
    // Calculate image dimensions to fit in container with preserved aspect
    getImageFitDimensions() {
        const { imageWidth, imageHeight, containerWidth, containerHeight } = this.props;
        const { containerMaxHeight } = this.props;
        const fillBy = this.getFillBasis();
        if (!this.shouldScaleImage({ width: imageWidth, height: imageHeight })) {
            return {
                width: imageWidth,
                height: imageHeight
            };
        }
        if (containerWidth) {
            let { width, height } = this.getImageFillByDimensions({ fillBy, containerWidth, containerHeight });
            /*
             If scaled dimensions exceeds container available space,
             change the stretch base dimension and recalculate,
             using scaled dimensions as basis
             */
            if (this.shouldScaleImage({ width, height })) {
                return this.getImageFillByDimensions({
                    fillBy: 'height',
                    containerWidth: width,
                    containerHeight: containerMaxHeight
                });
            }
            return { width, height };
        }
    }
    getImageAutoDimensions() {
        const { containerWidth, containerHeight, imageWidth, imageHeight } = this.props;
        const { containerMaxWidth, containerMaxHeight } = this.props;
        // Check by which dimension to scale image if image exceeds the container available space
        if (containerWidth && imageWidth > containerWidth) {
            return this.getImageFillByDimensions({
                fillBy: 'width',
                containerWidth,
                containerHeight: containerMaxHeight
            });
        } else if (containerHeight && imageHeight > containerHeight) {
            return this.getImageFillByDimensions({
                fillBy: 'height',
                containerWidth: containerMaxWidth,
                containerHeight
            });
        }
        return {
            width: imageWidth,
            height: imageHeight
        };
    }
    // Return the image dimension based on fill type
    getImageDimensionsBySizingType() {
        const { imageSizing, imageWidth, imageHeight } = this.props;
        switch (imageSizing) {
            case CROPPED_IMAGE_SIZING_AUTO:
                return this.getImageAutoDimensions();
            case CROPPED_IMAGE_SIZING_FILL: {
                return this.getFillDimensions();
            }
            case CROPPED_IMAGE_SIZING_FIT:
                return this.getImageFitDimensions();
            default:
                return {
                    width: imageWidth,
                    height: imageHeight
                };
        }
    }
    getContainerStyle() {
        const { containerWidth, containerMinWidth, containerMaxWidth } = this.props;
        const { containerHeight, containerMinHeight, containerMaxHeight } = this.props;
        return {
            width: containerWidth || 'auto',
            height: containerHeight || 'auto',
            minWidth: containerMinWidth,
            maxWidth: containerMaxWidth,
            minHeight: containerMinHeight,
            maxHeight: containerMaxHeight
        };
    }
    getImageStyles() {
        const { width, height } = this.getImageDimensionsBySizingType();
        return {
            width: Math.floor(width),
            height: Math.floor(height)
        }
    }
    render() {
        const { className, src, onClick, onLoad, shouldDisplayLoader, loaderSize } = this.props;
        return (
            <div
                className={classNames(
                    'cropped-image-container',
                    className
                )}
                style={this.getContainerStyle()}
                onClick={onClick}
            >
                <Image
                    ref="image"
                    className="cropped-image"
                    src={src}
                    style={this.getImageStyles()}
                    shouldDisplayLoader={shouldDisplayLoader}
                    loaderSize={loaderSize}
                    onLoad={onLoad}
                />
            </div>
        );
    }
}
CroppedImage.propTypes = {
    'src': PropTypes.string.isRequired,
    'imageWidth': PropTypes.number.isRequired,
    'imageHeight': PropTypes.number.isRequired,
    'containerWidth': PropTypes.number,
    'containerHeight': PropTypes.number,
    'containerMinWidth': PropTypes.number,
    'containerMinHeight': PropTypes.number,
    'containerMaxWidth': PropTypes.number,
    'containerMaxHeight': PropTypes.number,
    'imageSizing': PropTypes.string,
    'className': PropTypes.string,
    'shouldDisplayLoader': PropTypes.bool,
    'loaderSize': PropTypes.number,
    'onClick': PropTypes.func,
    'onLoad': PropTypes.func
};