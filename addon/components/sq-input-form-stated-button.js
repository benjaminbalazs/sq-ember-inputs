import Ember from 'ember';

export default Ember.Component.extend({

	tagName: 'button',

	//

	classNames: ['small', 'green', 'mobile'],
	classNameBindings: ['unchanged', 'inactive'],
	attributeBindings: ['spinner'],

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
