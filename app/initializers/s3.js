import UploaderService from 'sq-ember-inputs/services/s3';

export function initialize () {

	let app = arguments[1] || arguments[0];

	app.register('s3:service', UploaderService);

    app.inject('component', 's3', 's3:service');

}

export default {
    name: 's3',
    initialize: initialize
};
