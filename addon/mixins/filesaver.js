import Ember from 'ember';

export default Ember.Mixin.create({

    saving: false,
    store: Ember.inject.service(),

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

            return Ember.RSVP.Promise.resolve();

        } catch ( error ) {

            return Ember.RSVP.Promise.reject(error);

        }

    },

});
