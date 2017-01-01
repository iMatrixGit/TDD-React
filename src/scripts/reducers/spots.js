import Immutable from 'immutable';

export const initialState = Immutable.Map({
    spotsById: Immutable.Map(),
    likedBy: Immutable.List(['j.doe'])
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
        case 'LIKE':
            {
                const { actor } = action.payload;

                state = state.set('likedBy', state.get('likedBy').push(actor));
            }
            break;
        case 'UNLIKE':
        {
            const { actor } = action.payload;
            const indexOfActor = state.get('likedBy').indexOf(actor);

            state = state.deleteIn(['likedBy', indexOfActor]);
        }
            break;
            break;
        default:
           break;
    }

    return state;
};