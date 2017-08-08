import Ember from 'ember';

export default Ember.Mixin.create({

	ignoreTag: null,

	_didInsertElement: Ember.on('didInsertElement', function() {

		var self = this;
		var element = this.$();

		var eventNamespace = 'mousedown.' + Ember.guidFor(this) + ' touchstart.' + Ember.guidFor(this);

		Ember.$(document).bindFirst(eventNamespace, function(e) {

			if ( !element.is(e.target) && element.has(e.target).length === 0 ) {

				self.execute(event, element);


			} else if (  Ember.$(e.target).hasClass('clickthrough') ) {

				self.execute(event, element);

			}

		});

	}),

	execute(event) {

		if ( this.get('stopPropagation') ) {

			event.preventClickOutside = true;
			this.clickoutside();

		}

		if ( !event.preventClickOutside ) {

			this.clickoutside();
		}

	},

	_willDestroyElement: Ember.on('willDestroyElement', function() {

		var eventNamespace = 'mousedown.' + Ember.guidFor(this) + ' touchstart.' + Ember.guidFor(this);

    	Ember.$(document).off(eventNamespace);

	}),

});
