App.Views.IndexUser = Backbone.View.extend({

	initialize:function () {
        this.template = _.template(tpl.get('index-user'));
    },
	
    initialize: function() {
        this.render();
    },

    render: function() {
		if(!this.template){
			this.template = _.template(tpl.get('index-user'));
		}
		
        $(this.el).html(this.template({ collection: this.collection }));
        $('#app').html(this.el);
    }
});
