import Component from '@ember/component';

export default Component.extend({

	tagName: 'li',

	classNames: ['sq-align-left'],
	classNameBindings: ['selected'],
	attributeBindings: ['dir'],

	click() {
		if ( !this.get('isDestroyed') ) {
			this.sendAction('select', this.get('model'));
		}
	},

	init() {

		this._super();

		if ( this.get('ignoreDirection') === true ) {
			this.set('dir', 'ltr');
		}

	},

});
