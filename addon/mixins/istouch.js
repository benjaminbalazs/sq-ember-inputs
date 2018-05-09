import $ from 'jquery';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';

export default Mixin.create({

	fastboot: service(),

	isTouch() {

		if ( this.get('fastboot.isFastBoot') !== true ) {

			if ( $.browser.mobile === true ) {
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
