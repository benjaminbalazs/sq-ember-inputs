import Ember from 'ember';

export default Ember.Mixin.create({

	fastboot: Ember.inject.service(),

	isTouch() {

		if ( this.get('fastboot.isFastBoot') !== true ) {

			return Ember.$.browser.mobile;

		} else {

			const userAgent = this.get('userAgent');
			return ( userAgent.get('browser.isMobile') || userAgent.get('browser.isDesktop') );

		}

    },

});
