import Mixin from '@ember/object/mixin';
import { on } from '@ember/object/evented';

export default Mixin.create({

    _childViewDidInsertElement: on('init', function() {

        this.sendAction('registerView', this);

    }),

    _childViewWillDestroyElement: on('willDestroyElement', function() {

        this.sendAction('destroyView', this);

    }),

});
