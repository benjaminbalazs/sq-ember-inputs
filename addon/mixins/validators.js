import Ember from 'ember';

export default Ember.Mixin.create({

	getCardType(number) {

	    // visa
	    var re = new RegExp("^4");
		if ( number.match(re) != null ) {
			return "visa";
		}
	    // Mastercard
	    re = new RegExp("^5[1-5]");
	    if (number.match(re) != null) {
			return "mastercard";
		}

	    // AMEX
	    re = new RegExp("^3[47]");
	    if (number.match(re) != null) {
			return "amex";
		}

	    // Discover
	    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
	    if (number.match(re) != null) {
			return "discover";
		}

	    // Diners
	    re = new RegExp("^36");
	    if (number.match(/^5018|5020|5038|5893|6304|67(59|61|62|63)|0604/) != null) {
			return "diners";
		}

	    // JCB
	    re = new RegExp("^35(2[89]|[3-8][0-9])");
	    if (number.match(re) != null) {
			return "jcb";
		}

	    // Visa Electron
	    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
	    if (number.match(re) != null) {
			return "visa-electron";
		}

	    return "unknown";

	},

	//

	getCardLength(number) {

		var type = this.getCardType(number);

		if ( type === 'diners' ) {
			return 14;
		}

		if ( type === 'amex' ) {
			return 15;
		}

		if ( type === "unknown" ) {
			return 14;
		}

		return 16;

	},

	//

	validator_card(text) {

		if ( text ) {
			text = text.split(' ').join('');
			return ( text.length >= this.getCardLength(text) );
		} else {
			return false;
		}
	},

	//

	validator_expiry_month(text) {
		if ( text ) {
			var array = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30','31'];
			return ( array.indexOf(text) !== -1 );
		} else {
			return false;
		}
	},

	validator_expiry_year(text) {
		if ( text ) {
			var array = ['15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
			return ( array.indexOf(text) !== -1 );
		} else {
			return false;
		}
	},

	validator_expiry(text) {
		if ( text ) {
			text = text.split('/').join('');
			return ( text.length === 4 );
		} else {
			return false;
		}
	},

	//

	validator_cvv(text) {
		if ( text ) {
			text = text.split('/').join('');
			return ( text.length >= 3 );
		} else {
			return false;
		}
	},

	//

	validator_analytics(text) {
		return (/^ua-\d{4,9}-\d{1,4}$/i).test(text.toString());
	},

	//

	validator_password(text) {
		return this.validator_anything(text);
	},

	//

	validator_price(text) {
		if ( text ) {
			var pattern = /^(0|.[1-9][0-9]*)$/;
			return pattern.test(text);
		} else {
			return false;
		}
	},

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

	validator_phone(string) {
		if ( string ) {
			return ( string.length > 8 );
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
