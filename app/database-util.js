var Crud = function(entity){

	var dbEntity = entity;

	var crud = {
		readOne: function(model, success) {
			db.load(function() {
				dbEntity.load(model.id, function(item) {
					model.set(item.toJSON());
					success.success(model); // Success callback (will render the page)
				});
			}, auto_sync);
		},
		readAll: function(model, success) {
			db.load(function() {
				dbEntity.listItems().list(function(results) { // Asynchronously fetches the results matching the query
					var resp = [];
					results.forEach(function(item) { // Iterate over the results
						resp.push(item.toJSON());
					});
					success.success(resp); // Success callback (will render the page)
				});
			}, auto_sync);
		},
		createAction: function(model, success) {
			var item = new dbEntity();
			// The constructor automatically generates an id
			dbEntity.convertModel(item, model);
			item.deleted  = false;
			item.dirty    = true;
			// item.lastChange = getEpoch(new Date());
			persistence.add(item); // Add to database
			model.set(item.toJSON());

			// Save changes in localStorage (if using) and sync with server
			db.save(function() {
				//success.success(model); // Success callback (will render the page)
				console.log("model saved");
			}, item);
		},
		updateAction: function(model, success) {
			dbEntity.load(model.id, function(item) {
				dbEntity.convertModel(item, model);
				item.deleted  = false;
				item.dirty    = true;
				// item.lastChange = getEpoch(new Date());
				model.set(item.toJSON());

				// Save changes in localStorage (if using) and sync with server
				db.save(function() {
					success.success(model); // Success callback (will render the page)
				}, item);
			});
		},
		deleteAction: function(model, success) {
			dbEntity.load(model.id, function(item) {
				item.deleted  = !item.deleted; // Allow undo
				item.dirty    = true;
				model.set(item.toJSON());

				// Save changes in localStorage (if using) and sync with server
				db.save(function() {
					success.success(model); // Success callback (will render the page)
				}, item);
			});
		}
	}

	return crud;
};

var CrudWrapper = function(crud){

	var dbCrud = crud;
	
	hybridSync = function(method, model, success, error) {
		switch (method) {
		  case "read":
			  if (model.id) {
				  dbCrud.readOne(model, success); 
			  } else {
				  dbCrud.readAll(model, success); // Useful for index view
			  }
			  break;
		  case "create":
			  dbCrud.createAction(model, success);
			  break;
		  case "update":
			  dbCrud.updateAction(model, success);
			  break;
		  case "delete":
			  dbCrud.deleteAction(model, success);
			  break;
		}
	};

	return hybridSync;
};