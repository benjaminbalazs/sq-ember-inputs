import UploaderService from 'sq-ember-inputs/services/uploader';

export function initialize (app) {

	app.register('uploader:service', UploaderService);
	
    app.inject('component', 'uploader', 'uploader:service');

}

export default {
    name: 'uploader',
    initialize: initialize
};
