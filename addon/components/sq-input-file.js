import Component from '@ember/component';
import Inputviews from '.././mixins/inputviews';

export default Component.extend(Inputviews, {

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
