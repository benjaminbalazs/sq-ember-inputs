import Ember from 'ember';
import Validators from '../mixins/validators';

export default Ember.Component.extend(Validators, {

	// PARAMETERS
	required: false,
	criteria: null,
	initialValidation: false,
	disabled: false,

	// SETTINGS
	classNames: ['sq-input-text'],
	//
	classNameBindings: ['isFilled:filled', 'isValidProxy:valid', 'isInvalidProxy:invalid', 'focus'],

	// CLICK ---------------------------------------------------------
	
	click() {
		return this.sendAction('focusIn');
	},

	// ACTIONS -------------------------------------------------------

	actions: {

		focusIn() {
			this.toggleProperty('focus');
			return true;
		},

		focusOut() {
			this.toggleProperty('focus');
			return true;
		},

	},

	//

	// METHODS --------------------------------------------------------

	initialize : Ember.on('init', function() {

		if ( this.get('initialValidation') ) {
			this.validate();
		}

	}),

	validate() {
		
		this.set('focus', true);
		this.set('focus', false);

	},

	// PROXIES -------------------------------------------------------

	isInvalidProxy : Ember.computed('focus', 'isFilled', function() {

		// INVALIDATE ONLY IF IT HAS NO FOCUS
		if ( this.get('focus') === false ) {
			return !this.get('isValid');
		}

	}),

	isValidProxy : Ember.computed('focus','isFilled', function() {

		// VALIDATE ONLY IF IT IS FILLED, OTHERWISE THERE IS NO POINT
		if ( this.get('isFilled') ) {
			return this.get('isValid');
		}

	}),

	// COMPUTED -------------------------------------------------------

	isFilled : Ember.computed('focus', 'value', function() {
		if ( this.get('focus') ) {
			return true;
		} else {
			return !this.get('isEmpty');
		}
	}),

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
