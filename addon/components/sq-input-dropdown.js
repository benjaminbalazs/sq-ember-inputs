import Ember from 'ember';
import Validators from '../mixins/validators';
import ClickOutside from '../mixins/clickoutside';
import Visuals from '../mixins/visuals';

export default Ember.Component.extend(Visuals,Validators,ClickOutside, {

	// PARAMETERS

	required: false,
	criteria: null,
	initialValidation: false,

	// SETTINGS

	classNames: ['sq-input-dropdown'],
	classNameBindings: ['focus'],

	// INIT, DEFINE WHAT IS SELECTED  -------------------------------

	init() {

		this._super();
		this.value_observer();

	},

	didInsertElement() {

		this.set('input', this.get('childViews')[0] );

	},

	// CLICK ---------------------------------------------------------

	click() {
		if ( !this.get('focus') ) {
			this.set('focus', true);
		} else {
			this.set('focus', false);
		}
	},

	// CLICK OUTSIDE

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

				if ( typeof(data.store) !== 'undefined' ) {
					this.set('value', data);
				} else {
					this.set('value', data.get('id'));
				}

				this.set('input.focus', false);
				this.sendAction('change', data);

				return true;

			}

		},

	},

	//

	value_observer: Ember.observer('value', 'items', function() {
		if ( this.get('items') ) {
			this.select(this.getSelectedModel());
		}
	}),

	//

	getSelectedModel() {
		if ( typeof(this.get('value')) === 'object' ) {
			return this.get('value');
		} else if ( typeof(this.get('value')) === 'boolean' ) {
			return this.get('items').findBy('id', this.get('value'));
		} else {
			return this.get('items').findBy('id', String(this.get('value')));
		}
	},

	//

	select(data) {

		if ( this.get('selected') ) {
			let item = this.get('childViews').findBy('model.id', this.get('selected.id'));
			item.set('selected', false);
		}

		if ( data ) {

			var self = this;

			Ember.run.later(function() { // A LITTLE HACK FOR FIRST START
				let item = self.get('childViews').findBy('model.id', data.get('id'));
				if ( item ) {
					item.set('selected', true);
				}
			});

			this.set('selected', data);

		}

	},

	// VALIDATION ----------------------------------------------------

	validate() {
		this.get('input').validate();
	},

	isValid : Ember.computed('input.isValid', function() {
		return this.get('input.isValid');
	}),

	//

	internals : Ember.computed('items', 'items.@each.id', 'items.@each.name', function() {
		return this.get('items');
	}),

});
