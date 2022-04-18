import { addNewMemo } from './controllers'


export function initdb() {

    let openRequest = indexedDB.open("memos", 1)

    openRequest.onupgradeneeded = function (event) {
        var request = event.target;
        var db = request.result;
        var txn = request.transaction;

        if (!db.objectStoreNames.contains("memos")) {
            let memos = db.createObjectStore("memos", { keyPath: "id" })
            memos.createIndex('created_index', 'createdAt')
            memos.createIndex('folder_index', 'folder')
        }
        else {
            let memos = txn.objectStore('memos')
            memos.createIndex('created_index', 'createdAt')
            memos.createIndex('folder_index', 'folder')
        }
    }

    openRequest.onsuccess = function () {
        console.log('opened db');
        let db = openRequest.result
    }
}