import Ember from 'ember';
import Inputviews from '.././mixins/inputviews';

export default Ember.Component.extend(Inputviews, {

	classNames: "sq-input-form",
	classNameBindings: ['disabled'],

	actions : {

		submit(status) {

			this.validate();

			if ( this.isValid() ) {
				this.sendAction('submit', status);
			} else {
				this.shake();
			}

		}

	},

	shake() {

		var inputs = this.inputs();
		for ( var i=0; i < inputs.length; i++) {
			var view = inputs[i];
			if ( view.get('isValid') === false ) {
				view.shake();
			}
		}

	},

});
