import Immutable from 'immutable';
import reducer, { initialState } from '../reducers/spots';

const spotsMock = [
    { id: 'spot1' },
    { id: 'spot2' },
    { id: 'spot3' },
    { id: 'spot4' },
    { id: 'spot5' }
];

const addSpots = spots => ({
    type: 'ADD_SPOTS',
    payload: { spots }
});

describe('Spots reducer', () => {
    it('should return the initial state', () => {
        const received = reducer(undefined, {});

        expect(received).toEqual(initialState);
    });

    it('should add spots in spotsById', () => {
        const currentState = initialState
            .setIn(['spotsById', spotsMock[0].id], spotsMock[0])
            .setIn(['spotsById', spotsMock[1].id], spotsMock[1]);
        const action = addSpots([spotsMock[2]]);
        const received = reducer(currentState, action);
        const expected = currentState.setIn(['spotsById', spotsMock[2].id], spotsMock[2]);

        expect(received).toEqual(expected);
    });

    it('should not contains duplicated spots', () => {
        const currentState = initialState
            .setIn(['spotsById', spotsMock[0].id], spotsMock[0])
            .setIn(['spotsById', spotsMock[1].id], spotsMock[1]);
        const spots = [spotsMock[0], spotsMock[2], spotsMock[3]];
        const action = addSpots(spots);
        const received = reducer(currentState, action);
        const expected = currentState
                .setIn(['spotsById', spotsMock[2].id], spotsMock[2])
                .setIn(['spotsById', spotsMock[3].id], spotsMock[3]);

        expect(received).toEqual(expected);
    });

    it('should not do anything if no spots received from action', () => {
        const currentState = initialState
            .setIn(['spotsById', spotsMock[0].id], spotsMock[0])
            .setIn(['spotsById', spotsMock[1].id], spotsMock[1]);
        const action = addSpots();
        const received = reducer(currentState, action);

        expect(received).toEqual(currentState);
    });
});

