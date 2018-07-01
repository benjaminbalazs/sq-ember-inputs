import Service from '@ember/service';
import config from 'ember-get-config';

export default Service.extend({

    initiate() {

        if ( this.shouldinit() ) {

            if ( config.S3 ) {

                this.script(document, 'script', 'aws-sdk');

            }

        }

    },

    script(d, s, id) {

        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://sdk.amazonaws.com/js/aws-sdk-2.266.1.min.js";
        fjs.parentNode.insertBefore(js, fjs);

    },

    shouldinit() {
        if ( this.get('fastboot.isFastBoot') !== true ) {
            return true;
        } else {
            return false;
        }
    },

	upload(data) {

        return new Promise(function(resolve, reject) {

            window.AWS.config.update({
                apiVersions: '2006-03-01',
                region: config.S3.bin.region,
                credentials: new window.AWS.CognitoIdentityCredentials({
                    IdentityPoolId: config.S3.bin.identityPoolId
                }),
            });

            const client = new window.AWS.S3({
                params: { Bucket: config.S3.bin.bucket },
            });

            const date = new Date();

            const random = String(Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000);

            const key = String(date.getTime()) + random;

            client.upload({
                Key: key,
                Body: data,
                ContentType: data.type,
            }, function(error, data) {
                if ( error ) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });

        });

	},

});
