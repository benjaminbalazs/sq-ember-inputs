import Ember from 'ember';

export default Ember.Component.extend({

	tagName: 'button',

	//

	classNames: ['green', 'mobile'],
	classNameBindings: ['unchanged', 'inactive', 'small'],
	attributeBindings: ['spinner'],
	small: true,

	green: Ember.computed('dirty', function() {
		return this.get('dirty');
	}),

	unchanged: Ember.computed('dirty', function() {
		return !this.get('dirty');
	}),

	inactive: Ember.computed('dirty', function() {
		return !this.get('dirty');
	}),

	spinner: Ember.computed('saving', function() {
		return this.get('saving');
	}),

	//

	click() {
		this.get('submit')();
	}

});
