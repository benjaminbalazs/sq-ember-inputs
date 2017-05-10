import Ember from 'ember';

export default Ember.Mixin.create({

	fastboot: Ember.inject.service(),

	isTouch() {

		if ( this.get('fastboot.isFastBoot') !== true ) {

			if ( Ember.$.browser.mobile === true ) {
				return true;
			} else {
				return false;
			}

		} else {

			const userAgent = this.get('userAgent');
			return ( userAgent.get('browser.isMobile') || userAgent.get('browser.isDesktop') );

		}

    },

});
