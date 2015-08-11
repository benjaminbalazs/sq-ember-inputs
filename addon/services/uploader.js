import Ember from 'ember';

export default Ember.Service.extend({

	// SERVICES

	store : Ember.inject.service(),
	session: Ember.inject.service(),
	logger: Ember.inject.service(),

	// UPLOAD --------------------------------------------------------------------

	upload(type, current, data, onProgress, onUploaded) {

		var self = this;

		return new Ember.RSVP.Promise(function(resolve, reject) {
			
			$.ajax(
				{
			        url: self.baseUrl + "/" + type,
			        type: 'POST',
			        contentType: false,
			        data: data,
			        dataType: 'json',
			        processData: false,
			        crossDomain: true,
			        headers: self.get('session.headers'),
			        xhr: function(){
				        var xhr = new window.XMLHttpRequest();
				        xhr.upload.addEventListener("progress", function (evt) {
				            if (evt.lengthComputable) {
				                var percentComplete = (evt.loaded / evt.total)*100;
				                percentComplete = Math.round(percentComplete) + '%';
				                if ( onProgress ) {
				                	onProgress(percentComplete);
				                };
				            }
				        }, false);
				        xhr.upload.addEventListener("load", function (evt) {
				        	if ( onUploaded ) {
				        		onUploaded();
				        	};
				        }, false);
				        return xhr;
		    		},
		    }).done(function(data) {

		    	// PUSH NEW TO STORE
		    	var model = self.get('store').push(data);
		    	
		    	// REMOVE OLD ONE FROM STORE
		    	if ( current ) {
		    		var previous_model = self.get('store').peekRecord(type, current);
		    		if ( previous_model ) {
		    			self.get('store').deleteRecord(previous_model);
		    		}
		    	}

		    	resolve(model);

		    }).fail(function(error) { // IF FAILED
		    	self.get('logger').error(error);
		  		reject(error);
		  	});

		});

	},

	// INIT ---------------------------------------------------------------------

	initialize : Ember.on('init', function() {
		
		var config = this.container.lookupFactory('config:environment');
		this.baseUrl =  "/" + config.APP.api_namespace + "/upload";
 
	})

});