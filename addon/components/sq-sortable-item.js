import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({

	classNames: ['sq-sortable-item'],

	attributeBindings: ['reference'],

	reference : computed('model', function() {
		return this.get('model.id');
	}),

});
