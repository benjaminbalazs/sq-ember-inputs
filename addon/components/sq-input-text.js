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
	price:false,

	type: 'text',

	// SETTINGS
	classNames: ['sq-input-animation'],

	classNameBindings: ['defaultClass:sq-input-text', 'persistent', 'medium', 'large', 'tiny', 'isFilled:filled', 'isValidProxy:valid', 'isInvalidProxy:invalid', 'focus', 'disabled'],
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

		this.align();

		this.setLang(this.get('value'));

	},

	align() {

		if ( this.get('after') ) {

			let input = this.get('childViews')[0];

			if ( input ) {
				let width = input.width(this.get('value'));
				let after = this.get('childViews')[2];
				after.$().css('left', width + 'px');
			}

		}

		if ( this.get('autoSize') === true ) {

			let input = this.get('childViews')[0];

			if ( input ) {

				let width = input.width(this.get('value'));

				if ( this.get('after') || this.get('before') ) {
					let after = this.get('childViews')[2];
					width = width + after.width(this.get('after'));
				}

				Ember.$(this.get('element')).css('width', width + 'px');

			}

		}

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

	persistent: Ember.computed('placeholder', function() {
		return ( !this.get('placeholder') );
	}),

	// METHODS --------------------------------------------------------

	init() {

		this._super();

		if ( this.get('initialValidation') ) {
			this.validate();
		}

		if ( this.get('whitespace') === false ) {
			if ( this.get('value') ) {
				this.set('value', this.get('value').replace(/\s+/, ""));
			}
		}

		this.addObserver('value', this, this.valueDidChange);
		this.valueDidChange();

		if ( this.get('criteria') === 'domain' || this.get('after') || this.get('before') ) {
			this.set('ignoreDirection', true);
		}

		if ( this.get('email') === true ) {
			this.set('capital', false);
		}

	},

	validate() {

		this.set('focus', true);
		this.set('focus', false);

	},

	//

	didInsertElement() {

		this.alignBefore();

		this.align();

	},

	//

	alignBefore() {

		if ( this.get('before') ) {

			var input = this.get('childViews')[0];

			if ( input ) {

				var before = this.get('childViews')[2];
				var width = before.width(this.get('before'));

				input.$().css('padding-left', width + 'px');

			}

		}

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
				if ( typeof(this.get('criteria')) === 'string' ) {
					let method = "is" + Ember.String.capitalize(this.get('criteria'));
					return this.get(method);
				} else if ( typeof(this.get('criteria')) === 'function' ) {
					let method = this.get('criteria');
					return method(this.get('value'));
				}
			} else {
				return !this.get('isEmpty');
			}
		} else { // OTHERWISE, JUST PASS TRUE
			return true;
		}
	}),

	// VALIDATORS --------------------------------------------------

	isPrice : Ember.computed('value', function() {
		return this.validator_price(this.get('value'));
	}),

	isPhone : Ember.computed('value', function() {
		return this.validator_phone(this.get('value'));
	}),

	isCard : Ember.computed('value', function() {
		return this.validator_card(this.get('value'));
	}),

	isExpiry : Ember.computed('value', function() {
		return this.validator_expiry(this.get('value'));
	}),

	isExpiry_year : Ember.computed('value', function() {
		return this.validator_expiry_year(this.get('value'));
	}),

	isExpiry_month : Ember.computed('value', function() {
		return this.validator_expiry_month(this.get('value'));
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
