App.Views.Index = Backbone.View.extend({

	initialize:function () {
        this.template = _.template(tpl.get('index'));
    },
	
    initialize: function() {
        this.render();
    },

    render: function() {
		if(!this.template){
			this.template = _.template(tpl.get('index'));
		}
		
        $(this.el).html(this.template({ collection: this.collection }));
        $('#app').html(this.el);
    }
});
