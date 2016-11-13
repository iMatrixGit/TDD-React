/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import { noop } from 'underscore';
import Image from '../Image';
import CroppedImage from '../CroppedImage';
const mockedProps = {
    className: 'wrapper-class-name',
    src: 'path/to/image.jpg',
    imageWidth: 500,
    imageHeight: 400,
    loaderSize: 25,
    containerWidth: 630, // 630
    //containerHeight: TWEET_IMAGE_WRAPPER_DEFAULT_HEIGHT, // 200
    containerMinWidth: 630, // 630
    containerMaxWidth: 630, // 630
    containerMinHeight: 200, // 200
    containerMaxHeight: 500, // 500
    onClick: jest.fn(),
    onLoad: jest.fn(),
    shouldDisplayLoader: true
};
const wrapperProps = {
    style: {
        width: mockedProps.containerWidth,
        //height: mockedProps.containerHeight,
        height: 'auto',
        minWidth: mockedProps.containerMinWidth,
        minHeight: mockedProps.containerMinHeight,
        maxWidth: mockedProps.containerMaxWidth,
        maxHeight: mockedProps.containerMaxHeight
    },
    onClick: mockedProps.onClick
};
const imageProps = {
    className: 'cropped-image',
    transitionName: 'scalefade',
    src: mockedProps.src,
    loaderSize: mockedProps.loaderSize,
    isHidden: false,
    onLoad: mockedProps.onLoad,
    onError: noop,
    onClick: noop,
    style: {
        width: mockedProps.imageWidth,
        height: mockedProps.imageHeight
    },
    shouldDisplayLoader: mockedProps.shouldDisplayLoader
};
describe('<CroppedImage />', () => {
    it();
    /*it('should render', () => {
        const wrapper = shallow(<CroppedImage {...mockedProps} />);
        expect(wrapper).toBeDefined();
    });
    it('should render a div', () => {
        const wrapper = shallow(<CroppedImage {...mockedProps} />);
        expect(wrapper.type()).toEqual('div');
    });
    it('should render div with style and onClick props', () => {
        const wrapper = shallow(<CroppedImage {...mockedProps} />);
        const expectedProps = wrapperProps;
        expect(wrapper.props().style).toEqual(expectedProps.style);
        expect(wrapper.props().onClick).toEqual(expectedProps.onClick);
    });
    it('should set container width to auto if containerWidth prop is not defined', () => {
        const props = { ...mockedProps, containerWidth: undefined };
        const expectedStyle = {
            ...wrapperProps.style,
            width: 'auto'
        };
        const wrapper = shallow(<CroppedImage {...props} />);
        expect(wrapper.props().style).toEqual(expectedStyle);
    });
    it('should set container height to auto if containerHeight prop is not defined', () => {
        const props = { ...mockedProps, containerHeight: undefined };
        const expectedStyle = {
            ...wrapperProps.style,
            height: 'auto'
        };
        const wrapper = shallow(<CroppedImage {...props} />);
        expect(wrapper.props().style).toEqual(expectedStyle);
    });
    it('should render an Image', () => {
        const wrapper = shallow(<CroppedImage {...mockedProps} />);
        expect(wrapper.find('Image').length).toEqual(1);
    });
    it('should render Image with mocked imageProps', () => {
        const expectedProps = imageProps;
        const wrapper = shallow(<CroppedImage {...mockedProps} />);
        expect(wrapper.find('Image').props()).toEqual(expectedProps);
    });
    it('should scale down Image width and height to fit the container', () => {
        const props = {
            ...mockedProps,
            imageWidth: 800,
            imageHeight: 600,
            imageSizing: 'fit'
        };
        const expected = {
            ...imageProps,
            style: {
                ...imageProps.style,
                width: mockedProps.containerWidth,
                height: 472
            }
        };
        const wrapper = shallow(<CroppedImage { ...props } />);
        expect(wrapper.find('Image').props().style).toEqual(expected.style);
    });
    it('should not change Image dimensions if original dimensions not exceeded container dimensions', () => {
        const props = {
            ...mockedProps,
            imageWidth: 500,
            imageHeight: 300
        };
        const expected = {
            ...imageProps,
            style: {
                width: props.imageWidth,
                height: props.imageHeight
            }
        };
        const wrapper = shallow(<CroppedImage {...props} />);
        expect(wrapper.find('Image').props()).toEqual(expected);
    });*/
});