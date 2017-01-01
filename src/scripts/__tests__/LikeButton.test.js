/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import LikeButton, { likeButtonIcons } from '../components/LikeButton';

describe('<LikeButton />', () => {
    it('should exists', () => {
        expect(LikeButton).toBeDefined();
    });

    it('should render a div', () => {
        const wrapper = shallow(<LikeButton />);
        const received = wrapper.type();
        const expected = 'div';

        expect(received).toEqual(expected);
    });

    it('should render a div with correct props', () => {
        const props = {
            className: 'custom-class',
            onClick: jest.fn()
        };
        const wrapper = shallow(<LikeButton {...props} />);
        const { className: receivedClassNames, onClick: receivedOnClick } = wrapper.props();
        const expectedClassNames = ['like-button', props.className];
        const expectedOnClick = props.onClick;

        expectedClassNames.forEach(className => expect(receivedClassNames).toContain(className));
        expect(receivedOnClick).toEqual(expectedOnClick);
    });

    describe('If likeStatus is "liked"', () => {
        it('should render correct icon', () => {
            const props = {
                likeStatus: 'liked'
            };
            const wrapper = shallow(<LikeButton {...props} />);
            const received = wrapper.props().children;
            const expected = likeButtonIcons[props.likeStatus];

            expect(received).toEqual(expected);
        });
    });

    describe('If likeStatus is "unliked"', () => {
        it('should render correct icon', () => {
            const props = {
                likeStatus: 'unliked'
            };
            const wrapper = shallow(<LikeButton {...props} />);
            const received = wrapper.props().children;
            const expected = likeButtonIcons[props.likeStatus];

            expect(received).toEqual(expected);
        });
    });
});