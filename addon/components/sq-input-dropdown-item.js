import Ember from 'ember';

export default Ember.Component.extend({

	tagName: 'li',
	
	classNames: ['sq-align-left'],
	classNameBindings: ['selected'],

	click() {
		this.sendAction('select', this.get('model'));
	},

});