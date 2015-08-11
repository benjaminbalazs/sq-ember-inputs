import Ember from 'ember';
import Inputviews from '.././mixins/inputviews';

export default Ember.Component.extend(Inputviews, {

	//
	tagName: '',

	//
	value: null,
	type: 'file',
	required: false,

	actions: {

		change(model) {

			this.set('value', model);
			
		}

	},

});