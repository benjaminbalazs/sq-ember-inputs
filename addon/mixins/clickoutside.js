import Ember from 'ember';

export default Ember.Mixin.create({

	_didInsertElement: Ember.on('didInsertElement', function() {

		var self = this;
		var container = this.$();

		var eventNamespace = 'mousedown.' + Ember.guidFor(this);

		Ember.$(document).on(eventNamespace, function(e) {

			if (!container.is(e.target) && container.has(e.target).length === 0) {
				self.clickoutside();
			} else {
				return false;
			}

		});

	}),

	_willDestroyElement: Ember.on('willDestroyElement', function() {

		var eventNamespace = 'mousedown.' + Ember.guidFor(this);
    	Ember.$(document).off(eventNamespace);

	}),

});
