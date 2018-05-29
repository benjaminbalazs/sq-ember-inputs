import Mixin from '@ember/object/mixin';

export default Mixin.create({

    setLang(value) {

        if ( value && this.get('ignoreLang') !== true ) {

			if ( this.isArabic(value) ) {

				this.set('language', 'ar');

			} else {

				this.set('language', 'en');

			}

		} else {

			this.set('language', this.get('service.previous_language'));

		}

    },

    isArabic(text) {
		var pattern = /[\u0600-\u06FF\u0750-\u077F]/;
		var result = pattern.test(text);
		return result;
	},

});
