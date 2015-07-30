import Ember from 'ember';

export default Ember.Mixin.create({

	//

	email : function(text) {
		if ( text ) {
			var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
			return pattern.test(text);
		} else {
			return false;
		}
	},

	//

	empty : function(text) {
		if ( text ) {
			return !/([^\s])/.test(text);
		} else {
			return true;
		}
	},

	//

	anything : function(text) {
		if ( text ) {
			return text.length > 3;
		} else {
			return false;
		}
	},

	//

	youtube : function(text) {
		var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  		return (text.match(p)) ? RegExp.$1 : false;
	},

	//

	phone : function(text) {
		var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;  
  		if ( text.value.match(phoneno) ) {
      		return true;  
        } else {  
        	return false;  
        }  
	},

});