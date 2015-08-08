import Ember from 'ember';
import Validators from '../mixins/validators';
import ClickOutside from '../mixins/clickoutside';

export default Ember.Component.extend(Validators,ClickOutside, {

	// PARAMETERS
	required: false,
	criteria: null,
	initialValidation: false,

	// SETTINGS
	classNames: ['sq-input-dropdown'],
	//
	classNameBindings: ['focus'],

	// CLICK ---------------------------------------------------------

	click : function() {
		if ( !this.get('focus') ) {
			this.set('focus', true);
		} else {
			this.set('focus', false);
		}
	},

	// CLICK OUTSIDE -------------------------------------------------

	clickoutside : function() {
		if ( this.get('focus') ) {
			this.set('focus', false);
		}
	},

	// ACTIONS -------------------------------------------------------

	actions : {

		select : function(data) {
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

	isValid : Ember.computed('input.isValid', function() {
		return this.get('input.isValid');
	}),

	validate : function() {

		this.get('input').validate();

	},

	//

	initialize : Ember.on('didInsertElement', function() {

		this.set('input', this.get('childViews')[0] );

	}),

	// DEFAULT DISPLAY VALUE

	display : Ember.computed('value', function() {
		return this.get('value.name');
	}),

	//

});
