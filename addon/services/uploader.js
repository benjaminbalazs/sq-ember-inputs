import Ember from 'ember';
import config from 'ember-get-config';

export default Ember.Service.extend({

	store : Ember.inject.service(),
	session: Ember.inject.service(),
	fastboot: Ember.inject.service(),
	request: Ember.inject.service(),

	init() {

		this._super();

		if ( this.get('fastboot.isFastBoot') !== true ) {
			$.fn.formatter.addInptType('D', /[a-z0-9]/);
			$.fn.formatter.addInptType('U', /[a-z0-9.-]/);
		}
	},

	upload(type, data) {

		var headers = this.get('session.headers');

		return this.get('request').factory('POST', 'upload/' + type, headers, data);

	},

});
