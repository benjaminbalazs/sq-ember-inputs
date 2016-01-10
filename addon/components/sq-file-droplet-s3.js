import Ember from 'ember';
import Droplet from './sq-file-droplet';

export default Droplet.extend({

    //

    store: Ember.inject.service(),
    saving: false,
    //

    working: Ember.computed('uploading', 'processing', 'saving', function() {
        return ( this.get('uploading') || this.get('processing') || this.get('saving') );
    }),

    //

	onComplete(data) {

        this.set('saving', true);

        // IF RESPONSE IT OKAY
        if ( data.id ) {

            var model = this.get('store').push(data);

            // UNLOAD OLD ONE
            var current = this.get('model.'+this.get('parameter'));

            if ( current.content ) {

                var self = this;

                if ( this.get('saveremove') === true ) {
                    current.content.destroyRecord().then(function() {
                        self.save(model);
                    });
                } else {
                    this.save(model);
                }

            } else {
                this.save(model);
            }

        }

	},

    save(model) {

        var self = this;

        this.set('model.'+this.get('parameter'), model);

        this.get('model').save().then(function() {

            self.set('saving', false);
            self.sendAction('complete');

        });

    }


});
