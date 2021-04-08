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

const memosNotifications = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MEMO_NOTIFICATIONS':
            return [...state, action.payload]
        case 'WIPE_MEMO_NOTIFICATIONS':
            return []
        default: 
            return state
    }
}

// Combining them
const allReducers = combineReducers({
    memos,
    memosNotifications
})

// Exporting reducers
export default allReducers