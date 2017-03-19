import Ember from 'ember';

export default Ember.Mixin.create({

    saving: false,
    store: Ember.inject.service(),

    save(data, self) {

        this.set('saving', true);

        if ( !self ) {
            self = this;
        }

        if ( data.id ) {

            var model = self.get('store').push({ data:data });

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
