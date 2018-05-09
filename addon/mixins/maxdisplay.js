import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';

export default Mixin.create({

	maxcount: computed('value',function() {

        if ( this.get('value') ) {
            return this.get('value').length + '/' + this.get('maxlength');
        } else {
            return null;
        }

    }),

});
