const R = require('ramda');

export function createReducer(initialState, handlers){
    return function reducer(state=initialState, action){
        if(handlers.hasOwnProperty(action.type)){
            return handlers[action.type](state, action)
        }else{
            return state;
        }
    }
}

export function updateArrayByCallback(array, itemId, transform){
    const index = R.findIndex(R.propEq("id", itemId))
    const updatedItem = transform(array[index])
    return R.update(index, updatedItem, array)
}

export function updateArrayByItem(array, item){
    const index = R.findIndex(R.propEq("id", item.id))
    return R.update(index, item, array)
}

export function updateObject(oldObject, newValues) {
    return R.merge(oldObject, newValues);
}