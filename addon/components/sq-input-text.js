import Ember from 'ember';
import TextInput from './../mixins/sq-input';
import Validators from '../mixins/validators';

export default Ember.Component.extend(Validators, {

	// PARAMETERS
	required: false,
	criteria: null,
	initialValidation: false,
	disabled: false,
	rtl: false,
	maxlength: 40,

	// SETTINGS
	classNames: ['sq-input-animation', 'sq-input-text'],
	//
	classNameBindings: ['medium', 'isFilled:filled', 'isValidProxy:valid', 'isInvalidProxy:invalid', 'focus', 'disabled', 'rtl:sq-input-rtl'],

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

	// ON RESIZE

	valueDidChange() {

		var input = this.get('childViews')[0];
		var width = input.width(this.get('value'))

		var after = this.get('childViews')[1];
		after.$().css('left', width + 'px');

	},

	//

	dir: Ember.computed('rtl', function() {
		if ( this.get('rtl') ) {
			return 'rtl';
		} else {
			return 'ltr';
		}
	}),

	// METHODS --------------------------------------------------------

	init() {

		this._super();

		if ( this.get('initialValidation') ) {
			this.validate();
		}

		if ( this.get('after') ) {
			this.addObserver('value', this, this.valueDidChange);
		}

	},

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
		if ( this.get('required') !== false ) {
			if ( this.get('criteria') ) {
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
		return this.validator_empty(this.get('value'));
	}),

	isEmail : Ember.computed('value', function() {
		return this.validator_email(this.get('value'));
	}),

	isAnything : Ember.computed('value', function() {
		return this.validator_anything(this.get('value'));
	}),

	isPhone : Ember.computed('value', function() {
		return this.validator_anything(this.get('value'));
	}),

	isYoutube : Ember.computed('value', function() {
		return this.validator_youtube(this.get('value'));
	}),

	isNumber : Ember.computed('value', function() {
		return this.validator_number(this.get('value'));
	}),

	isPassword : Ember.computed('value', function() {
		return this.validator_password(this.get('value'));
	}),

});
