import { Promise as EmberPromise } from 'rsvp';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';

export default Mixin.create({

    saving: false,
    store: service(),

    async save(data) {

        this.set('saving', true);

        try {

            var model = this.get('store').push(data);

            await model.reload();

            var holder = this.get('model');

            holder.set(this.get('parameter'), model);

            await holder.save();

            if ( this.get('isDestroyed') === false && this.get('isDestroying') === false ) {

                this.set('saving', false);

            }

            return EmberPromise.resolve();

        } catch ( error ) {

            return EmberPromise.reject(error);

        }

    },

});
