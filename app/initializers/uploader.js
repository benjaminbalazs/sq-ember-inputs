import UploaderService from 'sq-ember-inputs/services/uploader';

export function initialize () {

	let app = arguments[1] || arguments[0];

	app.register('uploader:service', UploaderService);

    app.inject('component', 'uploader', 'uploader:service');

}

export default {
    name: 'uploader',
    initialize: initialize
};
