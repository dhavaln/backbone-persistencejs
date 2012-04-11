App.Views.Notice = Backbone.View.extend({
    className: "success",
    displayLength: 5000,
    defaultMessage: '',

    initialize: function() {
        _.bindAll(this, 'render');
        this.message = this.options.message || this.defaultMessage;
        this.render();
    },

    render: function() {
        var view = this;

        $(this.el).html(this.message);
        $(this.el).hide();
        $('#notice').html(this.el);
        $(this.el).slideDown();
        window.setTimeout(function() {
            $(view.el).slideUp();
            window.setTimeout(function() {
                view.remove();
            }, 2000);
        }, this.displayLength);
        return this;
    }
});

App.Views.Error = App.Views.Notice.extend({
    className: "error",
    defaultMessage: function(error) {
        return error ? error : 'Uh oh! Something went wrong. Please try again.';
    }
});
