import Ember from 'ember';
import Inputviews from '.././mixins/inputviews';

export default Ember.Component.extend(Inputviews, {

	classNames: "sq-input-form",
	classNameBindings: ['disabled'],

	actions : {

		submit() {

			this.validate();

			if ( this.isValid() ) {
				this.sendAction('submit');
			}

		}

	},

});
