import Ember from 'ember';
import Validators from '../mixins/validators';

export default Ember.Component.extend(Validators, {

	// PARAMETERS
	required: false,
	criteria: null,
	live: false,
	initialValidation: false,
	disabled: false,

	// SETTINGS
	tagName: "div",

	classNames: ['sq-input-text'],
	classNameBindings: ['isFilled:filled', 'valid', 'invalid', 'isFocus:focus'],

	//
	
	click: function() {

		return this.sendAction('focusIn');
		
	},

	// ACTIONS -------------------------------------------------------

	actions: {

		focusIn: function() {
			this.toggleProperty('isFocus');
			return true;
		},

		focusOut: function() {
			this.toggleProperty('isFocus');
			return true;
		},

		onchange : function(object) {
			this.sendAction('onchange', object);
		}

	},

	//

	// METHODS --------------------------------------------------

	initialize : Ember.on('init', function() {

		if ( this.get('initialValidation') ) {
			this.validate();
		}

	}),

	validate : function() {
		
		this.set('isFocus', true);
		this.set('isFocus', false);

	},

	invalid : Ember.computed('isFocus', 'isFilled', function() {

		// INVALIDATE ONLY IF IT HAS NO FOCUS
		if ( this.get('isFocus') === false ) {
			return !this.get('isValid');
		}

	}),

	//

	valid : Ember.computed('isFocus','isFilled', function() {

		// VALIDATE ONLY IF IT IS FILLED, OTHERWISE THERE IS NO POINT
		if ( this.get('isFilled') ) {
			return this.get('isValid');
		}

	}),

	// COMPUTED -------------------------------------------------------

	isFilled : Ember.computed('isFocus', function() {

		if ( this.get('isFocus') ) {
			return true;
		} else {
			return !this.get('isEmpty');
		}

	}),

	// IS VALID

	isValid : Ember.computed('value', function() {
		
		// ONLY HANDLE THIS IS required IS ON
		if ( this.get('required') !== false ) {

			if ( this.get('criteria') !== null ) {

				var method = "is" + Ember.String.capitalize(this.get('criteria'));
				return this.get(method);

			} else {
				return !this.get('isEmpty');
			}

		} else { // OTHERWISE, JUST PASS TRUE
			return true;
		}

	}),

	// VALIDATORS --------------------------------------------------

	isEmpty : Ember.computed('value', function() {
		return this.empty(this.get('value'));
	}),

	isEmail : Ember.computed('value', function() {
		return this.email(this.get('value'));
	}),

	isAnything : Ember.computed('value', function() {
		return this.anything(this.get('value'));
	}),

	isPhone : Ember.computed('value', function() {
		return this.anything(this.get('value'));
	}),

	isYoutube : Ember.computed('value', function() {
		return this.youtube(this.get('value'));
	}),


});
