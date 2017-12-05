import Ember from 'ember';

export default Ember.Mixin.create({

	ignoreTag: null,

	_didInsertElement: Ember.on('didInsertElement', function() {

		var self = this;
		var element = this.$();

		var eventNamespace = 'mouseup.' + Ember.guidFor(this) + ' touchend.' + Ember.guidFor(this);

		Ember.$(document).bindFirst(eventNamespace, function(event) {

			if ( !element.is(event.target) && element.has(event.target).length === 0 ) {

				self.execute(event, element);


			} else if ( Ember.$(event.target).hasClass('clickthrough') ) {

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

		var eventNamespace = 'mouseup.' + Ember.guidFor(this) + ' touchend.' + Ember.guidFor(this);

    	Ember.$(document).off(eventNamespace);

	}),

});
