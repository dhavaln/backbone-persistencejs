App.Views.ShowUser = Backbone.View.extend({
    initialize: function() {
		this.template = _.template(tpl.get('show-user'));
        this.render();
    },

    render: function() {
		if(!this.template){
			this.template = _.template(tpl.get('show-user'));
		}
        $(this.el).html(this.template({ model: this.model }));
        $('#app').html(this.el);
    }
});
