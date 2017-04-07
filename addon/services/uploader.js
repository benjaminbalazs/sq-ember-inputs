import Ember from 'ember';
import config from 'ember-get-config';

export default Ember.Service.extend({

	store : Ember.inject.service(),
	session: Ember.inject.service(),
	fastboot: Ember.inject.service(),

	init() {

		this._super();
		
		if ( this.get('fastboot.isFastBoot') !== true ) {
			$.fn.formatter.addInptType('D', /[a-z0-9]/);
			$.fn.formatter.addInptType('U', /[a-z0-9.-]/);
		}
	},

	upload(type, data, onProgress, onUploaded, authenticate) {

		var url =  "/" + config.APP.api_namespace + "/upload/" + type;

		var headers = { 'Access-Control-Allow-Origin': '*' };

		if ( authenticate ) {
			headers = this.get('session.headers');
		}

		return new Ember.RSVP.Promise(function(resolve, reject) {

			Ember.$.ajax({

			        url: url,
			        type: 'POST',
			        contentType: false,
			        data: data,
			        dataType: 'json',
			        processData: false,
			        crossDomain: true,
			        headers: headers,
			        xhr: function(){
				        var xhr = new window.XMLHttpRequest();
				        xhr.upload.addEventListener("progress", function (evt) {
				            if (evt.lengthComputable) {
				                var percentComplete = (evt.loaded / evt.total)*100;
				                percentComplete = Math.round(percentComplete) + '%';
				                if ( onProgress ) {
				                	onProgress(percentComplete);
				                }
				            }
				        }, false);
				        xhr.upload.addEventListener("load", function () {
				        	if ( onUploaded ) {
				        		onUploaded();
				        	}
				        }, false);
				        return xhr;
		    		},

		    }).done(function(data) {
				resolve(data);
		    }).fail(function(error) { // IF FAILED
		  		reject(error);
		  	});

		});

	},

});
