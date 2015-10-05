import UploaderService from 'sq-ember-inputs/services/uploader';

export function initialize (app) {

	app.register('uploader:main', UploaderService);

    app.inject('route', 'uploader', 'uploader:main');
    app.inject('adapter', 'uploader', 'uploader:main');
    app.inject('component', 'uploader', 'uploader:main');
    app.inject('controller', 'uploader', 'uploader:main');

}

export default {
    name: 'uploader',
    initialize: initialize
}
