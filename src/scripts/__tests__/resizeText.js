import React from 'react';
import { shallow } from 'enzyme';
import resizeText from '../higher-order-components/resizeText';

const Text = ({
    text,
    fontSize
}) => (
    <span style={{ fontSize }}>
        {text}
    </span>
);

describe('resizeText() HOC', () => {
    it('should exists', () => {
        expect(resizeText).toBeDefined();
    });

    it('should return a function', () => {
        const received = typeof resizeText();
        const expected = 'function';

        expect(received).toEqual(expected);
    });

    it('should return a composed component with type of provided component', () => {
        const ranges = {
            '50': 16,
            '100': 14,
            '150': 12
        };
        const ComposedText = resizeText(ranges)(Text);
        const wrapper = shallow(<ComposedText />);
        const received = wrapper.type();
        const expected = Text;

        expect(received).toEqual(expected);
    });

    it('should render a composed component with correct font size and text props', () => {
        const ranges = {
            '50': 16,
            '100': 14,
            '150': 12
        };
        const props = { text: 'Some text with lower than 50 symbols.' };
        const ComposedText = resizeText(ranges)(Text);
        const wrapper = shallow(<ComposedText {...props} />);
        const received = wrapper.props();
        const expected = {
            text: props.text,
            fontSize: 16
        };

        expect(received).toEqual(expected);
    });
});