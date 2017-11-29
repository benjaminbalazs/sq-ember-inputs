import Ember from 'ember';

export default Ember.Mixin.create({

    saving: false,
    store: Ember.inject.service(),

    save(data) {

        this.set('saving', true);

        const self = this;

        if ( data.data.id ) {

            var model = self.get('store').push(data);

            return model.reload().then(function() {

                var holder = self.get('model');

                holder.set(self.get('parameter'), model);

                return holder.save().then(function() {

                    if ( self.get('isDestroyed') === false && self.get('isDestroying') === false ) {

                        self.set('saving', false);

                        return Ember.RSVP.Promise.resolve();

                    }

                });

            });

        } else {

            return Ember.RSVP.Promise.reject();

        }

    },

});
