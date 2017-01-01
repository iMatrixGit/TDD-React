export const like = ({ actor }) => ({ type: 'LIKE', payload: { actor } });
export const unlike = ({ actor }) => ({ type: 'UNLIKE', payload: { actor } });