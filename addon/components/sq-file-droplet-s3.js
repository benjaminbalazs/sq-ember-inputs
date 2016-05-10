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

	onComplete(data) {

        var self = this;

        this.set('saving', true);

        if ( data.id ) {

            var model = this.get('store').push({ data:data });
            model.reload().then(function() {

                self.save(model);

            });

        }

	},

    save(model) {

        var self = this;

        var holder = this.get('model');

        holder.set(this.get('parameter'), model);

        holder.save().then(function() {

            self.set('saving', false);
            self.sendAction('complete');

        }).catch(function(error) {
            console.log(error);
        });

    },

    //

    deleting: false,

    delete() {

        var self = this;

        this.set('deleting', true);

        var holder = this.get('model');
        holder.set(this.get('parameter'), null);

        holder.save().then(function() {

            self.set('deleting', false);

        });

    }


});
