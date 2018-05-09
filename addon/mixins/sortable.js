import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';

export default Mixin.create({

    list: computed('model.@each.position', function() {
        return this.get('model').sortBy('position');
    }),

});
