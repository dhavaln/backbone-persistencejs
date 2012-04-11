App.Views.Show = Backbone.View.extend({
    initialize: function() {
		this.template = _.template(tpl.get('show'));
        this.render();
    },

    render: function() {
		if(!this.template){
			this.template = _.template(tpl.get('show'));
		}
        $(this.el).html(this.template({ model: this.model }));
        $('#app').html(this.el);
    }
});
