App.Views.EditUser = Backbone.View.extend({
    events: {
        "submit form": "save"
    },

	initialize:function () {
        this.template = _.template(tpl.get('edit-user'));
    },
	
    initialize: function() {
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
        this.render();
    },

    save: function() {
        var self = this;
        var msg = this.model.isNew() ? 'Successfully created!' : "Saved!";

        this.model.save({ first_name: this.$('[name=first_name]').val(), last_name: this.$('[name=last_name]').val() }, {
            success: function(model, resp) {
                new App.Views.Notice({ message: msg });
                Backbone.history.saveLocation('users/' + model.id);
            },
            error: function() {
                new App.Views.Error({ message: 'Error saving this user. Did you filled all attributes?' });
            }
        });

        return false;
    },

    render: function() {
		if(!this.template){
			this.template = _.template(tpl.get('edit-user'));
		}
		
        $(this.el).html(this.template({ model: this.model }));
        $('#app').html(this.el);

        // use val to fill in name, for security reasons
		this.$('[name=first_name]').val(this.model.get('first_name'));
		this.$('[name=last_name]').val(this.model.get('last_name'));

        this.delegateEvents();
    }
});
