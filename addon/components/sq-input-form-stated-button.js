import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({

	tagName: 'button',

	//

	classNames: ['green', 'mobile'],
	classNameBindings: ['unchanged', 'inactive', 'small'],
	attributeBindings: ['spinner'],
	small: true,

	green: computed('dirty', function() {
		return this.get('dirty');
	}),

	unchanged: computed('dirty', function() {
		return !this.get('dirty');
	}),

	inactive: computed('dirty', function() {
		return !this.get('dirty');
	}),

	spinner: computed('saving', function() {
		return this.get('saving');
	}),

	//

	click() {
		this.get('submit')();
	}

});
