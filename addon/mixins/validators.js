import Ember from 'ember';

export default Ember.Mixin.create({

	//

	validator_password(text) {
		return this.anything(text);
	},

	//

	validator_number(text) {
		if ( text ) {
			var pattern = /^(0|[1-9][0-9]*)$/;
			return pattern.test(text);
		} else {
			return false;
		}
	},

	//

	validator_email(text) {
		if ( text ) {
			var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
			return pattern.test(text);
		} else {
			return false;
		}
	},

	//

	validator_empty(text) {
		if ( text ) {
			return !/([^\s])/.test(text);
		} else {
			return !( typeof(text) === 'boolean' );
		}
	},

	//

	validator_anything(text) {
		if ( text ) {
			return text.length > 3;
		} else {
			return text;
		}
	},

	//

	validator_youtube(text) {
		var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  		return (text.match(p)) ? RegExp.$1 : false;
	},

	//

	validator_phone(text) {
		var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
  		if ( text.value.match(phoneno) ) {
      		return true;
        } else {
        	return false;
        }
	},

});
