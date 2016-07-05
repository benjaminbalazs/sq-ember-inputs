import Ember from 'ember';

export default Ember.Mixin.create({

	isTouch() {

		return ('ontouchstart' in window);

    },

});
