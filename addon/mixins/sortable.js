import Ember from 'ember';

export default Ember.Mixin.create({

    list: Ember.computed('model.@each.position', function() {
        return this.get('model').sortBy('position');
    }),

});
