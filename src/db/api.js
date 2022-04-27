import * as controllers from "./controllers"

/**
 * Search for not repeated memos, second callback argument is array of objects:
 * {
 *  countShows: number,
 *  folder: string,
 *  id: number,
 *  startTime: number,
 *  tags: string[],
 *  text: string,
 *  timeNextShow: number
 * }
 * @param {Function} callback (err, memo_list)
 */
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
 * @param {string} text memo text
 * @param {Function} callback (err, idOfCreatedMemo)
 * @param {int} startShowAt date.getTime(), not required, all chain of showing
 * will start after that time. Must be 10 sec later
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

/**
 * Should be called after repeating memo
 * @param {int} memoId id of memo in db
 */
export function markMemoRepeated(memoId, callback = (err, res) => { }) {
    let openRequest = indexedDB.open("memos", 1)

    openRequest.onsuccess = function () {
        let db = openRequest.result
        controllers.handleMemoRepeated(db, memoId)
            .then(res => callback(false, res))
            .catch(err => callback(err, false))
    }
}