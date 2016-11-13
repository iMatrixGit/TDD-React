let initialState = 0;

const counter = (state = 0, action) => {
    switch (action.type) {
       case 'INCREMENT':
           return state += 1;
        case 'DECREMENT':
            return state -= 1;
    }
};


const filterableCounter = (reducer, predicate) => {
    return (state, action) => {
        if (predicate(action)) {
            return state;
        }

        return reducer(state, action);
    };
};

const ignoreDecrement = filterableCounter(counter, action => action.type === 'DECREMENT');

console.log(ignoreDecrement(initialState, { type: 'INCREMENT' }));


