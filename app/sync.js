(function(){
	var item_sync_uri = '/items/sync.json';
	var user_sync_uri = '/users/sync.json';

	if(!persistence){
		throw ("persistence object is not initialized");
		return;
	}

	if(!db){
		throw ("database object is not initialized");
		return;
	}
	
	persistence.schemaSync(function(tx) { // First sync
		persistence.loadFromLocalStorage(function() { // if using localStorage
			ItemEntity.syncAll(persistence, item_sync_uri,
				persistence.sync.preferRemoteConflictHandler, function() {
					console.log('First sync!');
			}, function() {
				console.log('Error item syncing to server!');
			});
			
			UserEntity.syncAll(persistence, user_sync_uri,
				persistence.sync.preferRemoteConflictHandler, function() {
					console.log('First sync!');
			}, function() {
				console.log('Error user  syncing to server!');
			});
		});
	});

	db._sync = function(entityList, callback){
		console.log(JSON.stringify(entityList));
		
		var dbEntity = entityList.pop();
		console.log(dbEntity.uri);
		
		dbEntity.entity.syncAll(persistence, dbEntity.uri, persistence.sync.preferRemoteConflictHandler, function() {
				console.log('Done syncing!');
				if (item) {
					// Now that everything is synced, change the dirty boolean to false
					item.dirty = false;
					persistence.flush();
				} else {
					// Check if there are still items with dirty = true
					dbEntity.entity.all().filter('dirty','=',true).list(function(results) {
						results.forEach(function(item) {
							item.dirty = false;
						});
					});
					persistence.flush();
				}
				
				if(entityList.length > 0){
					db._sync(entityList, callback);
				}else{
					callback();
				}
		}, function() {
				console.log('Error syncing to server!');
				
				if(entityList.length > 0){
					db._sync(entityList, callback);
				}else{
					callback();
				}
		});
	};
	
	db.sync = function(callback, item) {
		console.log("sync called");
		
		//TODO check item instance and call _sync() method accordingly
		
		db._sync([
			{"entity": ItemEntity, "uri": item_sync_uri}, 
			{"entity": UserEntity, "uri": user_sync_uri}
			], callback);
	}

	// List entities to sync
	ItemEntity.enableSync(item_sync_uri);
	UserEntity.enableSync(user_sync_uri);
})();