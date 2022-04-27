import * as controllers from "./controllers"

export function searchNotCheckedMemos(callback) {
    let openRequest = indexedDB.open("memos", 1)

    openRequest.onsuccess = function () {
        let db = openRequest.result
        controllers.searchUnresolvedMemos(db)
            .then(res => callback(false, res))
            .catch(err => callback(err, false))
    }
}

/**
 * 
 * @param {string} text memo text
 * @param {Function} callback (err, response)
 * @param {int} startShowAt 
 */
export function addNewMemo(text, callback, startShowAt = false) {
    if (typeof startShowAt !== 'number')
        return callback('startShowAt must be integer')
    if (typeof text !== 'string')
        return callback('text must me string')
    if (!text)
        return callback('text must have at least one character')
    let openRequest = indexedDB.open("memos", 1)

    openRequest.onsuccess = function () {
        let db = openRequest.result
        controllers.addNewMemo(db, text, startShowAt)
            .then(res => callback(false, res))
            .catch(err => callback(err, false))
    }
}

export function markMemoRepeated(memoId, callback = (err, res) => { }) {
    let openRequest = indexedDB.open("memos", 1)

    openRequest.onsuccess = function () {
        let db = openRequest.result
        controllers.handleMemoRepeated(db, memoId)
            .then(res => callback(false, res))
            .catch(err => callback(err, false))
    }
}