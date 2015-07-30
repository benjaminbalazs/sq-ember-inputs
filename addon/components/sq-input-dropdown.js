import Ember from 'ember';
import Validators from '../mixins/validators';
import ClickOutside from '../mixins/clickoutside';

export default Ember.Component.extend(Validators,ClickOutside, {

	// PARAMETERS
	required: false,
	criteria: null,
	active: false,
	focus: false,

	//
	value: null,

	list : null,
	classNames: ['sq-input-dropdown'],

	classNameBindings: ['focus'],

	//

	actions : {

		select : function(data) {
			if ( data.get('id') !== this.get('value.id') ) {
				this.set('value', data);
				this.sendAction('change', data);
			}
			//this.set('focus', false);
		},

		focusIn: function() {
			//this.set('focus', true);
		},

	},

	//

	click : function() {
		if ( !this.get('focus') ) {
			this.set('focus', true);
		} else {
			this.set('focus', false);
		}
		//console.log("click");
	},

	//

	clickoutside : function() {
		if ( this.get('focus') ) {
			this.set('focus', false);
		}
	},

	//

	preview : Ember.computed('value', function() {

		return this.get('value.name');

	}),

	//

	isValid : Ember.computed('value', function() {

		return true;

	}),

	validate : function() {
		
		//this.set('isFocus', true);
		//this.set('isFocus', false);

	},

});
