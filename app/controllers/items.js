App.Controllers.Items = Backbone.Router.extend({
    routes: {
        "":                 "index",
        "items/:id":        "show",
        "items/:id/edit":   "edit",
        "new":              "create",
        "items/:id/delete": "destroy",
		
		"users": "indexUser",
		"users/:id": "showUser",
		"users/:id/edit": "editUser",
		"newuser": "createUser",
		"users/:id/delete": "destroyUser"
    },

    // Show a list of items
    index: function() {
        var items = new App.Collections.Items();
        items.fetch({
            success: function() {
                new App.Views.Index({ collection: items });
            },
            error: function() {
                new Error({ message: "Error loading items." });
            }
        });
    },
	
	indexUser: function() {
        var users = new App.Collections.Users();
        users.fetch({
            success: function() {
                new App.Views.IndexUser({ collection: users });
            },
            error: function() {
                new Error({ message: "Error loading users." });
            }
        });
    },
	
    // Show a specific item
    show: function(id) {
		console.log("show item " + id);
        var item = new Item({ id: id });
        item.fetch({
            success: function(model, resp) {
                new App.Views.Show({ model: item });
            },
            error: function() {
                new Error({ message: 'Could not find that item.' });
                window.location.hash = '#';
            }
        });
    },

	showUser: function(id) {
		console.log("show user " + id);
        var user = new User({ id: id });
        user.fetch({
            success: function(model, resp) {
                new App.Views.ShowUser({ model: user });
            },
            error: function() {
                new Error({ message: 'Could not find that user.' });
                window.location.hash = '#users';
            }
        });
    },
	
    // Edits a specific item
    edit: function(id) {
        var item = new Item({ id: id });
        item.fetch({
            success: function(model, resp) {
                new App.Views.Edit({ model: item });
            },
            error: function() {
                new Error({ message: 'Could not find that item.' });
                window.location.hash = '#';
            }
        });
    },

	editUser: function(id) {
        var user = new User({ id: id });
        user.fetch({
            success: function(model, resp) {
                new App.Views.EditUser({ model: user });
            },
            error: function() {
                new Error({ message: 'Could not find that user.' });
                window.location.hash = '#users';
            }
        });
    },
	
    // Shows a blank item ready to be created
    create: function() {
        new App.Views.Edit({ model: new Item() });
    },

	createUser: function() {
        new App.Views.EditUser({ model: new User() });
    },
	
    // Delete an item (named 'destroy' instead of 'delete' because safari was complaining about it)
    destroy: function(id) {
        var item = new Item({ id: id });
        item.destroy({
            success: function(model, response) {
                new App.Views.Notice({ message: 'Action completed successfully.' });
                window.location.hash = '#';
            }
        });
    },
	
	destroyUser: function(id) {
        var user = new User({ id: id });
        user.destroy({
            success: function(model, response) {
                new App.Views.Notice({ message: 'Action completed successfully.' });
                window.location.hash = '#users';
            }
        });
    }
});

// For example, getRoute('create') should return 'new'
function getRoute(actionName) {
    var controller = new App.Controllers.Items();
    var actions = _.values(controller.routes);
    return _.keys(controller.routes)[_.indexOf(actions, actionName)];
}
