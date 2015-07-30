import Ember from 'ember';

export default Ember.Mixin.create({

	//

	clickoutside : function() {

	},

	//

	_didInsertElement: Ember.on('didInsertElement', function() {

		var self = this;
		var container = this.$();

		var eventNamespace = 'click.' + Ember.guidFor(this);

		$(document).on(eventNamespace, function(e) {
		      
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				self.clickoutside();
			} else {
				return false;
			}
			
		}); 

	}),

	//

	_willDestroyElement: Ember.on('willDestroyElement', function() {

		var eventNamespace = 'click.' + Ember.guidFor(this);
    	$(document).off(eventNamespace);

	}),

});