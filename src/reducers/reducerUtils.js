import {findIndex, update, propEq, merge, sortBy, ascend, prop, sortWith} from 'ramda'

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
    const index = findIndex(propEq("id", itemId))(array)
    const updatedItem = transform(array[index])
    return update(index, updatedItem, array)
}

export function updateArrayByItem(array, item){
    const index = findIndex(propEq("id", item.id))(array)
    return update(index, item, array)
}

export function updateObject(oldObject, newValues) {
    return merge(oldObject, newValues)
}


export function mergeArrays(array, values) {
    return values.reduce((memo, item) => {
        const index = findIndex(propEq("id", item.id))(memo)

        if(index > -1){
            return update(index, item, memo)
        }
        
        memo.push(item)
        return memo
    }, array)
}

export function orderByFav(list){
    const fn = (item) => item.fav == true
    const sorted = sortWith([ascend(prop('insertedAt')), ], list)
    return sortBy( a => fn(a)? 1 : 2 , sorted)
}
