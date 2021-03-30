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

