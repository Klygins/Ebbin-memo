import { combineReducers } from 'redux'

// Reducers
const memos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_NEW_MEMO':
            return [...state, action.payload]
        case 'REMOVE_MEMO':
            return state.filter(function (value, index, arr) {
                return action.payload.title !== value.title
            });
        default:
            return state
    }
}

// Combining them
const allReducers = combineReducers({
    memos: memos,
    // removingMemo,
})

// Exporting reducers
export default allReducers