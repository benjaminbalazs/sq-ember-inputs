import { computed } from '@ember/object';
import Droplet from './sq-file-droplet';
import { inject as service } from '@ember/service';

export default Droplet.extend({

    s3: service(),

    async upload(file) {

		this.set('failed', false);
		this.set('uploading', true);

        try {

            const { Location } = await this.get('s3').upload(file);

            const source = encodeURIComponent(Location);

            const data = await this.request.GET("fetch/" + this.get('namespace') + "?url=" + source, true, null, null, false);

            await this.onComplete(data);

        } catch ( error ) {

            console.error(error);

            if ( this.get('isDestroyed') !== true ) {
				this.set('uploading', false);
				this.set('failed', true);
			}

        }

	},

});
