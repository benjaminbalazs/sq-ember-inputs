/*
upload(file) {

    var self = this;

    //
    this.set('uploading', true);

    //
    var data = new FormData();
    data.append('file', file);

    //
    var current = null;
    if ( this.get('autoremove') ) {
        current = this.get('value.id');
    }

    self.set('percentage', '0%');

    this.get('uploader').upload( this.get('type'), current, data, this.onProgress, this.onUploaded).then(function(data) {

        self.onComplete(data);

    }).catch(function() {

        self.onFail();

    }).finally(function() {

        self.set('uploading', false);
        self.set('processing', false);

    });

},

// PUSH NEW TO STORE
if ( data.push ) {

    var model = self.get('store').push(data.data);

    // REMOVE OLD ONE FROM STORE
    if ( current ) {
        var previous_model = self.get('store').peekRecord(type, current);
        if ( previous_model ) {
            self.get('store').deleteRecord(previous_model);
        }
    }

    resolve(model);

} else {

    resolve(data.data);

}


*/
