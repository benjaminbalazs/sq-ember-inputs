import Ember from 'ember';

export default Ember.Component.extend({

	classNames: ['sq-sortable-item'],

	attributeBindings: ['reference'],

	reference : Ember.computed('model', function() {
		return this.get('model.id');
	}),

});
