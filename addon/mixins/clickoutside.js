import $ from 'jquery';
import { guidFor } from '@ember/object/internals';
import { on } from '@ember/object/evented';
import Mixin from '@ember/object/mixin';

export default Mixin.create({

	ignoreTag: null,

	_didInsertElement: on('didInsertElement', function() {

		var self = this;
		var element = this.$();

		var eventNamespace = 'mouseup.' + guidFor(this) + ' touchend.' + guidFor(this);

		$(document).bindFirst(eventNamespace, function(event) {

			if ( !element.is(event.target) && element.has(event.target).length === 0 ) {

				self.execute(event, element);


			} else if ( $(event.target).hasClass('clickthrough') ) {

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

	_willDestroyElement: on('willDestroyElement', function() {

		var eventNamespace = 'mouseup.' + guidFor(this) + ' touchend.' + guidFor(this);

    	$(document).off(eventNamespace);

	}),

});
