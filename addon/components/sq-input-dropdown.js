import Ember from 'ember';
import Validators from '../mixins/validators';
import ClickOutside from '../mixins/clickoutside';

export default Ember.Component.extend(Validators,ClickOutside, {

	// PARAMETERS
	required: false,
	criteria: null,
	initialValidation: false,
	value: null,

	// SETTINGS
	classNames: ['sq-input-dropdown'],
	classNameBindings: ['focus'],

	// CLICK ---------------------------------------------------------

	click() {
		if ( !this.get('focus') ) {
			this.set('focus', true);
		} else {
			this.set('focus', false);
		}
	},

	// CLICK OUTSIDE -------------------------------------------------

	clickoutside() {
		if ( this.get('focus') ) {
			this.set('focus', false);
		}
	},

	// ACTIONS -------------------------------------------------------

	actions : {

		select(data) {
			if ( data.get('id') !== this.get('value.id') ) {
				this.set('input.focus', true);
				this.set('value', data);
				this.set('input.focus', false);
				this.sendAction('change', data);
			}
			return true;
		},

	},

	//

	validate() {

		this.get('input').validate();

	},

	isValid : Ember.computed('input.isValid', function() {
		return this.get('input.isValid');
	}),

	//

	initialize : Ember.on('didInsertElement', function() {

		this.set('input', this.get('childViews')[0] );

	}),

	//

	display : Ember.computed('value', function() {
		return this.get('value.name');
	}),

	//

});
