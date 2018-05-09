import Service, { inject as service } from '@ember/service';

export default Service.extend({

	session: service(),
	fastboot: service(),
	request: service(),

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
