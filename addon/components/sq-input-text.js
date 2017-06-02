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

	classNameBindings: ['defaultClass:sq-input-text', 'persistent', 'medium', 'large', 'small', 'tiny', 'isFilled:filled', 'isValidProxy:valid', 'isInvalidProxy:invalid', 'focus', 'disabled'],
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

		},

		//

		registerBeforeChild(child) {
			this.set('beforeChild', child);
			this.align();
		},

		registerAfterChild(child) {
			this.set('afterChild', child);
			this.align();
		},

		registerInputChild(child) {
			this.set('inputChild', child);
			this.align();
		},

	},

	// ON RESIZE

	valueDidChange() {

		this.sendAction('change');

		this.align();

		this.setLang(this.get('value'));

	},

	align() {

		this.alignBefore();
		this.alignAfter();

		if ( this.get('autoSize') === true && this.get('inputChild') ) {

			let input = this.get('inputChild');

			if ( input ) {

				let width = input.width(this.get('value'));

				if ( this.get('afterChild') ) {
					width = width + this.get('afterChild').width(this.get('after'));
				}

				if ( this.get('beforeChild') ) {
					width = width + this.get('beforeChild').width(this.get('before'));
				}

				Ember.$(this.get('element')).css('width', width + 'px');

			}

		}

	},

	alignBefore() {

		if ( this.get('beforeChild') && this.get('inputChild') ) {

			var width = this.get('beforeChild').width(this.get('before'));
			this.get('inputChild').$().css('padding-left', width + 'px');

			if ( this.get('afterChild') ) {
				this.get('afterChild').$().css('padding-left', width + 'px');
			}

		}

	},

	alignAfter() {

		if ( this.get('afterChild') && this.get('inputChild') ) {

			let width = this.get('inputChild').width(this.get('value'));
			this.get('afterChild').$().css('left', width + 'px');

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

	willDestroy() {

		this._super();

		this.removeObserver('value', this, this.valueDidChange);

	},

	validate() {

		this.set('focus', true);
		this.set('focus', false);

	},

	//

	didInsertElement() {

		this.align();

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
