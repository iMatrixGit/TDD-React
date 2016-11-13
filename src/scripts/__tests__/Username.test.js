/* eslint-env jest */
import React from 'react';
import { pick } from 'ramda';
import { shallow } from 'enzyme';
import Username from '../components/Username';

describe('<Username />', () => {
    it('should exists', () => {
        expect(Username).toBeDefined();
    });

    it('should return a div', () => {
        const props = { username: 'john.doe' };
        const wrapper = shallow(<Username {...props} />);
        const received = wrapper.type();
        const expected = 'div';

        expect(received).toEqual(expected);
    });

    it('should render a div with correct className', () => {
        const props = {
            className: 'username-class',
            username: 'john.doe'
        };
        const wrapper = shallow(<Username {...props}/>);
        const received = wrapper.props();
        const expected = {
            className: props.className
        };
        expect(pick(Object.keys(expected), received)).toEqual(expected);
    });

    it('should display a username passed as a prop', () => {
        const props = { username: 'john.doe' };
        const wrapper = shallow(<Username {...props} />);
        const received = wrapper.text();
        const expected = props.username;

        expect(expected).toEqual(received);
    });

    it('should prefix passed username with @ if shouldPrefix is true', () => {
        const props = {
            username: 'john.doe',
            shouldPrefix: true
        };
        const wrapper = shallow(<Username {...props} />);
        const received = wrapper.text();
        const expected = `@${props.username}`;

        expect(received).toEqual(expected);
    });

    it(`should call onClick passed as a prop when it's clicked`, () => {
        const props = {
            username: 'john.doe',
            onClick: jest.fn()
        };
        const wrapper = shallow(<Username {...props} />);

        wrapper.simulate('click');
        expect(props.onClick).toHaveBeenCalledWith(props.username);
    });
});