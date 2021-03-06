var targetWidget = {
  initialise: function(options) {
    if (!options.collection) {
      options.collection = new TargetCollection;
    }
    var targetView = new BoardTargetView(options);

    var operations = {
      get_current_target: function() {
    	  return $(targetView.selector +  " select").val();
    	},
    	add_target: function(target) {
    	  if (!targetView.collection.some(function(model) { return model.toJSON().name == target })) {
          targetView.ignore_previous_target = true;
    	    targetView.default_target = target;
          targetView.collection.bind("add", targetView.render);
    	    targetView.collection.add({name: target});
          targetView.collection.unbind("add", targetView.render);
        }
      },
      get_collection: function() {
        return targetView.collection;
      },
      bind_to_event: function(event, func) {
        // Note: Can't use targetView.delegateEvents as this would kill any existing bindings
        $(targetView.el).bind(event, func);
      },
      set_current_target: function(target) {
        targetView.default_target = target;
        targetView.render();
      }
    };

    if (!options.local) {
      // Bind to the global jQuery namespace
      $.widgets.target = operations;
    } else {
      // Return it to the calling code which will use it in its local namespace
      return operations;
    }
  }
};