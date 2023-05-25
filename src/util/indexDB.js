import Papa from 'papaparse'

const fetchDataFromIndexedDB = (name) => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(name, 1);

    request.onerror = (event) => {
      console.error("IndexedDB error:", event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;

      const transaction = db.transaction(["data"], "readonly");
      const objectStore = transaction.objectStore("data");
      const getDataRequest = objectStore.getAll();

      getDataRequest.onsuccess = (event) => {
        const data = event.target.result;
        resolve(data);
      };

      transaction.onerror = (event) => {
        console.error("IndexedDB transaction error:", event.target.error);
        reject(event.target.error);
      };
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("data")) {
        db.createObjectStore("data", { keyPath: "id", autoIncrement: true });
      }
    };
  });
};

const storeDataInIndexedDB = (data, name) => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(name, 1);

    request.onerror = (event) => {
      console.error("IndexedDB error:", event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;

      const transaction = db.transaction(["data"], "readwrite");
      const objectStore = transaction.objectStore("data");

      transaction.onerror = (event) => {
        console.error("IndexedDB transaction error:", event.target.error);
        reject(event.target.error);
      };

      transaction.oncomplete = () => {
        resolve();
      };

      data.forEach((item) => {
        objectStore.add(item);
      });
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("data")) {
        db.createObjectStore("data", { keyPath: "id", autoIncrement: true });
      }
    };
  });
};

const deleteIndexedDB = (name) => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.deleteDatabase(name);

    request.onerror = (event) => {
      console.error("Error deleting IndexedDB database:", event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = () => {
      console.log("IndexedDB database deleted successfully");
      resolve();
    };
  });
};

const parseCsv = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export { fetchDataFromIndexedDB, storeDataInIndexedDB, parseCsv, deleteIndexedDB };
