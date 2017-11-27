import Ember from 'ember';

export default Ember.Service.extend({

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

		return this.get('request').factory('POST', 'upload/' + type, this.get('session.headers'), data);

	},

});
