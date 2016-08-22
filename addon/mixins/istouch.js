import Ember from 'ember';

export default Ember.Mixin.create({

	isTouch() {

		//return ('ontouchstart' in window);
		//return true;
		if ( Ember.$.browser.mobile === true ) {
			return true;
		} else {
			return false;
		}

    },

});
