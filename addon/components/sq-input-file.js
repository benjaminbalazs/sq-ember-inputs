import Ember from 'ember';
import Inputviews from '.././mixins/inputviews';

export default Ember.Component.extend(Inputviews, {

	//

	tagName: '',
	namespace: 'file',
	authentication: true,

	//

	actions: {

		change(model) {

			this.set('value', model);

		}

	},

	//

	shake() {

	},

});
