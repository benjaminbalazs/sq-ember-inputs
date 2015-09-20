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
	
			if ( typeof(data.store) !== 'undefined' ) {

				if ( data.get('id') !== this.get('value.id') ) {

					this.set('input.focus', true);
					this.set('value', data);
					this.set('display', data.get('name'));
					this.set('input.focus', false);
					this.sendAction('change', data);

				}

			} else {

	//			if ( data.id !== this.get('value') ) {

					this.set('input.focus', true);

					if ( typeof(data.get) === 'undefined' ) {
						this.set('value', data.id);
						this.set('display', data.name);
					} else {
						this.set('value', data.get('id'));
						this.set('display', data.get('name'));
					}

					this.set('input.focus', false);
					this.sendAction('change', data);

	//			}

			}

			return true;
		},

	},

	// VALIDATION ----------------------------------------------------

	validate() {
		this.get('input').validate();
	},

	isValid : Ember.computed('input.isValid', function() {
		return this.get('input.isValid');
	}),

	//

	didInsertElement() {

		this.set('input', this.get('childViews')[0] );

	},

	// AUTO UPDATE DISPLAY ON DATA ----------------------------------

	display : Ember.computed('value', 'value.name','items.@each.name', function() {
		if ( typeof(this.get('value')) === 'object' ) {
			return this.get('value.name');
		} else {
			if ( this.get('items') ) {
				var self = this;
				var name;
				this.get('items').forEach(function(item) {
					if ( String(item.get('id')) === String(self.get('value')) ) {
						name = item.get('name');		
					}
				});
				return name;
			} else {
				return this.get('value');
			}
		}
	}),

	//

	internals : Ember.computed('items', 'items.@each.id', 'items.@each.name', function() {
		return this.get('items');
	}),

});
