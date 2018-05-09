import { computed } from '@ember/object';
import Droplet from './sq-file-droplet';
import FileSaver from './../mixins/filesaver';

export default Droplet.extend(FileSaver, {

    //

    working: computed('uploading', 'processing', 'saving', 'deleting', function() {
        return ( this.get('uploading') || this.get('processing') || this.get('saving') || this.get('deleting') );
    }),

    //

	onComplete(data, self) {

        self.save(data, self).then(function() {

            self.sendAction('complete');

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
