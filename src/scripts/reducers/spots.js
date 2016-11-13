import Immutable from 'immutable';

export const initialState = Immutable.Map({
    spotsById: Immutable.Map()
});

export default function (state = initialState, action) {
    switch (action.type) {
        case 'ADD_SPOTS':
            const { spots } = action.payload;

            if(spots && spots.length) {
                spots.map(spot => {
                    state = state.setIn(['spotsById', spot.id], spot);
                });
            }
            break;
        default:
           break;
    }

    return state;
};