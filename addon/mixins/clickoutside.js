import Ember from 'ember';

export default Ember.Mixin.create({

	ignoreTag: null,

	_didInsertElement: Ember.on('didInsertElement', function() {

		var self = this;
		var container = this.$();

		var eventNamespace = 'mousedown.' + Ember.guidFor(this);

		Ember.$(document).on(eventNamespace, function(e) {

			if ( Ember.$(e.target).hasClass('clickthrough') ) {
				self.clickoutside();
			}

			if (!container.is(e.target) && container.has(e.target).length === 0) {
				self.clickoutside();
			}

		});

	}),

	_willDestroyElement: Ember.on('willDestroyElement', function() {

		var eventNamespace = 'mousedown.' + Ember.guidFor(this);
    	Ember.$(document).off(eventNamespace);

	}),

});
