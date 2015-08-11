import Ember from 'ember';
import Inputviews from '.././mixins/inputviews';

export default Ember.Component.extend(Inputviews, {

	classNames: "sq-input-form",

	//
	processing: false,

	// ACTIONS
	
	actions : {

		submit() {

			this.validate();
			
			if ( this.get('isValid') ) {
				this.sendAction('submit');
			}
			
		}

	},

});
