import Ember from 'ember';
import TextInput from './../mixins/sq-input';
import Validators from '../mixins/validators';
import Visuals from '../mixins/visuals';
import MaxDisplay from '../mixins/maxdisplay';

export default Ember.Component.extend(Visuals,Validators,MaxDisplay, {

	// PARAMETERS
	required: false,
	criteria: null,
	initialValidation: false,
	disabled: false,
	rtl: false,
	maxlength: 60,
	whitespace: true,
	ignoreDirection: false,

	// SETTINGS
	classNames: ['sq-input-animation', 'sq-input-text'],
	//
	classNameBindings: ['ignoreDirection:keep-left', 'medium', 'large', 'isFilled:filled', 'isValidProxy:valid', 'isInvalidProxy:invalid', 'focus', 'disabled', 'rtl:sq-input-rtl'],

	// CLICK ---------------------------------------------------------

	click() {
		return this.sendAction('focusIn');
	},

	// ACTIONS -------------------------------------------------------

	actions: {

		focusIn() {
			this.set('focus', true);
			this.sendAction('focusIn');
		},

		focusOut() {
			this.set('focus', false);
			this.sendAction('focusOut');
		},

		enterPressed() {
			if ( this.get('isValid') ) {
				this.sendAction('enterPressed');
			} else {
				//this.set('isInvalidProxy', true);
				//this.set('isInvalidProxy', true);
			}

		}

	},

	// ON RESIZE

	valueDidChange() {

		this.sendAction('change');

		if ( this.get('after') ) {

			var input = this.get('childViews')[0];
			var width = input.width(this.get('value'));

			var after = this.get('childViews')[1];
			after.$().css('left', width + 'px');

		}

	},

	//

	dir: Ember.computed('rtl', function() {
		if ( this.get('rtl') && this.get('ignoreDirection') === false ) {
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

		this.addObserver('value', this, this.valueDidChange);

		if ( this.get('criteria') === 'domain' || this.get('after') ) {
			this.set('ignoreDirection', true);
		}

	},

	validate() {

		this.set('focus', true);
		this.set('focus', false);

	},

	// PROXIES -------------------------------------------------------

	isInvalidProxy : Ember.computed('focus','value', function() {

		// INVALIDATE ONLY IF IT HAS NO FOCUS
		if ( this.get('focus') === false ) {
			return !this.get('isValid');
		} else {
			//return false;
		}

	}),

	isValidProxy : Ember.computed('isFilled', 'value', function() {

		// VALIDATE ONLY IF IT IS FILLED, OTHERWISE THERE IS NO POINT
		if ( this.get('isFilled') ) {
			return this.get('isValid');
		} else {
			//return true;
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

	isCard : Ember.computed('value', function() {
		return this.validator_card(this.get('value'));
	}),

	isExpiry : Ember.computed('value', function() {
		return this.validator_expiry(this.get('value'));
	}),

	isCvv : Ember.computed('value', function() {
		return this.validator_cvv(this.get('value'));
	}),

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

	isDomain : Ember.computed('value', function() {
		return this.validator_domain(this.get('value'));
	}),

});
