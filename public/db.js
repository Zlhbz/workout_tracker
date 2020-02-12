let db;

const request = window.indexedDB.open("workout", 1);


request.onupgradeneeded = function (event) {
    const db = event.target.result;
    db.createObjectStore("set", { autoIncrement: true });

};

request.onsuccess = function (event) {
    db = event.target.result;
    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = function (event) {
    console.log(event.target);
};

function saveRecord(record) {
    const transaction = db.transaction(["set"], "readwrite");
    const setStore = transaction.objectStore("set");
    setStore.add(record);
}

function checkDatabase() {
    const transaction = db.transaction(["set"], "readwrite");
    const setStore = transaction.objectStore("set");
    let getAll = setStore.getAll();

    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(() => {
                    const transaction = db.transaction(["set"], "readwrite");
                    const setStore = transaction.objectStore("set");
                    setStore.clear();
                });
        }
    };
}
window.addEventListener("online", checkDatabase);