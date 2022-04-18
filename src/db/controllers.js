
/**
 * @param {*} memoText 
 * @param {*} showlist example: 
 * {
 *      firstShow: 1649578673837, // apr 10, 15:18 (+7)
 *      secondShow: 1649579273837, // after 10 min
 *      thirdShow: 1649582273837, // hour
 *      fourthShow: 1649596673837, // 5 hours
 *      fifthShow: 1649665073837, // day
 *      sixthShow: 1650010673837, // 25 days
 *      seventhShow: 1659946673837, // 4 month
 *      eighthShow: 1691050673837, // 16 month
 * }
 */
export function addNewMemo(db, memoText, showlist, callback, tags = ['default'], folder = 'default') {
    let transaction = db.transaction('memos', 'readwrite')

    let memos = transaction.objectStore('memos')

    let lastid = +localStorage.getItem('last_id')

    const newMemo = {
        id: lastid + 1,
        text: memoText,
        firstShow: showlist[0],
        secondShow: showlist[0],
        thindShow: showlist[0],
        fifthShow: showlist[0],
        firstShow: showlist[0],
        firstShow: showlist[0],
        firstShow: showlist[0],
        firstShow: showlist[0],
        tags,
        folder,
        createdAt: new Date().getTime()
    }

    let request = memos.add(newMemo)

    request.onsuccess = function () {
        localStorage.setItem('last_id', lastid + 1)
        callback(false, lastid)
    }
    request.onerror = function () {
        callback('error creating new memo', false)
    }
}