/**
 * A Persistence.js adapter for Backbone.js
 *
 * David Francisco (hello@dmfranc.com)
 * -----------------------------------------------------------------------------------
 * Replacement for Backbone.Sync() to handle saving using the persistence.js library
 * Why should I care?
 * Using this adapter with persistence.js, you can save your data using HTML5 WebSQL
 * database, saving data in memory, with HTML5 localStorage, Google Gears, etc..
 * But more important is that it also supports synchronization with a remote server.
 *
 * Including this adapter in your backbone.js project you can:
 * - Save your data locally (WebSQL, localStorage, etc.)
 * - Sync with a remote server when changes happens and both user and server are online
 * Synchronization works both ways (supports multiple clients)
 *
 *
 * new changes by Dhaval Nagar (dhaval.b.nagar@gmail.com)
 **/

var supports_webdatabase = !!window.openDatabase
var using_localstorage = !supports_webdatabase

if (supports_webdatabase) {
    
	// Empty methods which would be implemented by persistence.store.memory
    persistence.loadFromLocalStorage = function(callback) { callback(); };
    persistence.saveToLocalStorage = function(callback) { callback(); };
	
    // Use WebSQL
    persistence.store.websql.config(persistence, "webapp", 'database', 5 * 1024 * 1024);
}
else { // Use localStorage
    persistence.store.memory.config(persistence, 'database', 5 * 1024 * 1024, '1.0');
}

var ItemEntity = persistence.define('Item4', {
	name: "TEXT",
	category: "TEXT",
	dirty: "BOOL",  // Required for syncing
	deleted: "BOOL" // Required to simulate deletions
});

ItemEntity.convertModel = function(item, model){
	item.name     = model.get('name');
	item.category = model.get('category');
};

ItemEntity.listItems = function(){
	return ItemEntity.all().order("name", true);
};

var UserEntity = persistence.define('User', {
	first_name: "TEXT",
	last_name: "TEXT",
	dirty: "BOOL",
	deleted: "BOOL"
});

UserEntity.convertModel = function(item, model){
	item.first_name = model.get('first_name');
	item.last_name = model.get('last_name');
};

UserEntity.listItems = function(){
	return UserEntity.all().order("first_name", true);
};

// Confs
persistence.debug = false;

// persistence.reset();
var session = persistence;

// Sync local database with server
db = {
    
    // Load elements from localStorage (if used) and sync with server (if dontSync == false)
    load: function(callback, dontSync) {
        persistence.loadFromLocalStorage(function() { // if using localStorage
            if (using_localstorage)
                console.log("All data loaded from localStorage!");
            if (window.navigator.onLine && !dontSync) {
                db.sync(callback); // Sync to server
            } else {
                callback();
            }
        });
    },
    // Save elements to localStorage (if used) and sync with server (if dontSync == false)
    save: function(callback, item, dontSync) {
        persistence.saveToLocalStorage(function() { // if using localStorage
            if (using_localstorage)
                console.log("All data saved to localStorage!");
            if (window.navigator.onLine && !dontSync) {
                db.sync(callback, item); // Sync to server
            } else {
                persistence.flush(); // Flush the new changes
                callback();
            }
        });
    }
}

var itemCrud = new Crud(ItemEntity);
var itemSync = CrudWrapper(itemCrud);

var userCrud = new Crud(UserEntity);
var userSync = CrudWrapper(userCrud);