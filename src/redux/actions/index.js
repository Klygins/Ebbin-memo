export const addNewMemo = (memo) => {
    return {
        type: 'ADD_NEW_MEMO',
        payload: memo
    }
}

export const removeMemo = (memoTitle) => {
    return {
        type: 'REMOVE_MEMO',
        payload: { title: memoTitle }
    }
}

export const addMemoNotifications = (memoNotification) => {
    return {
        type: 'ADD_MEMO_NOTIFICATIONS',
        payload: memoNotification
    }
}

export const wipeMemoNotifications = () => {
    return {
        type: 'WIPE_MEMO_NOTIFICATIONS'
    }
}
