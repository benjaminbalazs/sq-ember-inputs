import Ember from 'ember';

export default Ember.Mixin.create({

	isTouch() {

		var el = document.createElement('div');
   		el.setAttribute('ongesturestart', 'return;'); // or try "ontouchstart"
   		return typeof el.ongesturestart === "function";

    },

});
