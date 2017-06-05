import Ember from 'ember';

export default Ember.Component.extend({

	tagName: 'li',

	classNames: ['sq-align-left'],
	classNameBindings: ['selected'],
	attributeBindings: ['dir'],

	click() {
		this.sendAction('select', this.get('model'));
	},

	init() {

		this._super();

		if ( this.get('ignoreDirection') === true ) {
			this.set('dir', 'ltr');
		}

	},

});
