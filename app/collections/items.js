App.Collections.Items = Backbone.Collection.extend({
    model: Item,
    url: '/items',
    sync: itemSync
    // localStorage: new Store("pendingItems")
});


App.Collections.Users = Backbone.Collection.extend({
    model: User,
    url: '/users',
    sync: userSync
    // localStorage: new Store("pendingItems")
});
