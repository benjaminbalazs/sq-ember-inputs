import Ember from 'ember';

export default Ember.Mixin.create({

	//

	validator_card(text) {
		if ( text ) {
			text = text.split(' ').join('');
			return ( text.length === 16 );
		} else {
			return false;
		}
	},

	//

	validator_expiry(text) {
		if ( text ) {
			text = text.split('/').join('');
			return ( text.length === 4 );
		} else {
			return false;
		}
	},

	validator_cvv(text) {
		if ( text ) {
			text = text.split('/').join('');
			return ( text.length === 3 );
		} else {
			return false;
		}
	},

	//

	validator_password(text) {
		return this.validator_anything(text);
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
			return text.length >= 2;
		} else {
			return false;
		}
	},

	//

	validator_youtube(text) {
		var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  		return (text.match(p)) ? RegExp.$1 : false;
	},

	//

	validator_domain(text) {
		if ( text ) {
			if ( text.length > 2 ) {
				if ( text.substring(0,4) === 'www.' ) {
					return false;
				} else if ( text.split('.').length === 1 || text.split('.').length > 3 ) {
					return false;
				} else if ( text.indexOf('..') !== -1 ) {
					return false;
				} else {
					if ( (text.length - text.indexOf('.')) >= 3 && text.indexOf('.') >= 2 ) {
						return true;
					} else {
						return false;
					}
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	},

	//
	/*
	validator_phone(text) {
		if ( text ) {
			if ( text) {
				var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
		  		if ( text.value.match(phoneno) ) {
		      		return true;
		        } else {
		        	return false;
				}
			} else {
				return false;
			}
        } else {
			return false;
		}
	},
	*/
});
