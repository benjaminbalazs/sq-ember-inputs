import Ember from 'ember';

export default Ember.Component.extend({

	//
	tagName: '',
	type: 'file',

	//
	value: null,

	actions: {

		change(model) {

			this.set('value', model);
			
		}

	},

	// VALIDATOR

	isValid : Ember.computed(function() {
		return true;
	}),

	validate() {

		//this.get('input').validate();

	},

});