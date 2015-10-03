import Ember from 'ember';

export default Ember.Mixin.create({

	isValid() {
		var inputs = this.inputs();
		for ( var i=0; i < inputs.length; i++) {
			var view = inputs[i];
			if ( view.get('isValid') === false ) {
				return false;
			}
		}
		return true;
	},

	inputs() {
		var childs = this.get('childViews');
		var inputs = [];
		for ( var i=0; i < childs.length; i++) {
			var view = childs[i];
			if ( view.get("required") ) {
				inputs.push(view);
			}
		}
		return inputs;
	},

	// METHODS ------------------------------------------------------------------

	validate() {

		var inputs = this.inputs();

		for (var i=0; i < inputs.length; i++) {
			var view = inputs[i];
			view.validate();
		}

	},

});
