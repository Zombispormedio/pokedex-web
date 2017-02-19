const R = require('ramda')

export function createReducer(initialState, handlers){
    return function reducer(state=initialState, action){
        if(handlers.hasOwnProperty(action.type)){
            return handlers[action.type](state, action)
        }else{
            return state
        }
    }
}

export function updateArrayByCallback(array, itemId, transform){
    const index = R.findIndex(R.propEq("id", itemId))(array)
    const updatedItem = transform(array[index])
    return R.update(index, updatedItem, array)
}

export function updateArrayByItem(array, item){
    const index = R.findIndex(R.propEq("id", item.id))(array)
    return R.update(index, item, array)
}

export function updateObject(oldObject, newValues) {
    return R.merge(oldObject, newValues)
}


export function mergeArrays(array, values) {
    return values.reduce((memo, item) => {
        const index = R.findIndex(R.propEq("id", item.id))(memo)

        if(index > -1){
            return R.update(index, item, memo)
        }
        
        memo.push(item)
        return memo
    }, array)
}