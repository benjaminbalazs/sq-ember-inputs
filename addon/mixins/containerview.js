import Mixin from '@ember/object/mixin';
import { on } from '@ember/object/evented';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';

export default Mixin.create({

    _initContainerView: on('init', function() {

        this.set('registeredViews', ArrayProxy.create({ content: A([]) }));

    }),

    registerView(view) {

        this.get('registeredViews').pushObject(view);

    },

    destroyView(view) {

        this.get('registeredViews').removeObject(view);

    },

});
