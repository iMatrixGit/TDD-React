import { getNameInitials, pickByRange } from '../utils/utils';

describe('Utils', () => {
    describe('fontSizePicker', () => {
        it('should exists', () => {
            expect(pickByRange).toBeDefined();
        });

        it('should accept config and return a function', () => {
            const config = {
                '50': 16,
                '100': 14,
                '150': 12
            };
            const received = typeof pickByRange(config);
            const expected = 'function';

            expect(received).toEqual(expected);
        });

        it('should return a correct font size based on config', () => {
            const config = {
                '50': 16,
                '100': 14,
                '150': 12
            };
            const text = `Simple text with lower than 50 symbols.`;
            const received = pickByRange(config)(text.length);
            const expected = 16;

            expect(received).toEqual(expected);
        });
    });

    describe('getNameInitials()', () => {
        it('should exists', () => {
            expect(getNameInitials).toBeDefined();
        });

        it(`should return array with first letters 
            from the first and last name`, () => {
            const fullName = 'John Doe';
            const received = getNameInitials(fullName);
            const expected = ['J', 'D'];

            expect(received).toEqual(expected);
        });
    })
});
