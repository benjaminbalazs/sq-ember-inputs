import Ember from 'ember';
import TextInput from './../mixins/sq-input';
import Validators from '../mixins/validators';
import Visuals from '../mixins/visuals';
import MaxDisplay from '../mixins/maxdisplay';
import Lang from '../mixins/lang';

export default Ember.Component.extend(Visuals,Validators,MaxDisplay,Lang, {

	// PARAMETERS
	required: false,
	criteria: null,
	initialValidation: false,
	disabled: false,
	rtl: false,
	maxlength: 60,
	whitespace: true,
	ignoreDirection: false,
	defaultClass: true,
	capital:true,
	ignoreLang: false,

	type: 'text',

	// SETTINGS
	classNames: ['sq-input-animation'],

	classNameBindings: ['defaultClass:sq-input-text', 'ignoreDirection:keep-ltr', 'medium', 'large', 'tiny', 'isFilled:filled', 'isValidProxy:valid', 'isInvalidProxy:invalid', 'focus', 'disabled'],
	attributeBindings: ['dir', 'lang'],

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

		this.setLang(this.get('value'));

	},

	// DIRECTION ------------------------------------------------------

	dictionary: Ember.inject.service(),

	serviceName: 'dictionary',

	service: Ember.computed('serviceName', function() {
		return this.get(this.get('serviceName'));
	}),

	dir: Ember.computed('service.previous_direction','ignoreDirection', function() {
		if ( this.get('ignoreDirection') === true ) {
			return 'ltr';
		} else {
			return this.get('service.previous_direction');
		}
	}),

	// METHODS --------------------------------------------------------

	init() {

		this._super();

		if ( this.get('initialValidation') ) {
			this.validate();
		}

		this.addObserver('value', this, this.valueDidChange);
		this.valueDidChange();

		if ( this.get('criteria') === 'domain' || this.get('after') ) {
			this.set('ignoreDirection', true);
		}

		if ( this.get('email') === true ) {
			//this.set('type', 'email');
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
