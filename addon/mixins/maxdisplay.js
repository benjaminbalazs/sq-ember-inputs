import Ember from 'ember';

export default Ember.Mixin.create({

	maxcount: Ember.computed('value',function() {

        if ( this.get('value') ) {
            return this.get('value').length + '/' + this.get('maxlength');
        } else {
            return null;
        }

    }),

});
