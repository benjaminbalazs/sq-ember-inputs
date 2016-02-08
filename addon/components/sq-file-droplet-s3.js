import Ember from 'ember';
import Droplet from './sq-file-droplet';

export default Droplet.extend({

    //

    store: Ember.inject.service(),
    saving: false,

    //

    working: Ember.computed('uploading', 'processing', 'saving', 'deleting', function() {
        return ( this.get('uploading') || this.get('processing') || this.get('saving') || this.get('deleting') );
    }),

    //

    init() {

        this._super();

        this.set('model.droplet', this);

    },

    willDestroy() {

        this.set('model.droplet', null);

    },

    //

	onComplete(data) {

        this.set('saving', true);

        // IF RESPONSE IT OKAY
        if ( data.id ) {

            var model = this.get('store').push(data);

            this.save(model);

            /*
            //console.log(model);
            // UNLOAD OLD ONE
            var current = this.get('model.'+this.get('parameter'));
            if ( current ) {
                if ( current.content ) {

                    var self = this;

                    if ( this.get('autoremove') === true ) {
                        current.content.destroyRecord().then(function() {
                            self.save(model);
                        });
                    } else {
                        this.save(model);
                    }

                } else {
                    console.log('tosave');
                    this.save(model);
                }
            } else {
                this.save(model);
            }
            */

        }

	},

    save(model) {

        var self = this;

        this.set('model.'+this.get('parameter'), model);

        this.get('model').save().then(function() {

            self.set('saving', false);
            self.sendAction('complete');

        });

    },

    //

    deleting: false,

    delete() {

        this.set('deleting', true);

        var current = this.get('model.'+this.get('parameter'));
        this.set('model.'+this.get('parameter'), null);

        var self = this;
        current.destroyRecord().then(function() {

            self.get('model').reload().then(function() {

                self.set('deleting', false);

            });

        });

    }


});
