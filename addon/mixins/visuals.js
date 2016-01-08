import Ember from 'ember';

export default Ember.Mixin.create({

    //

    shake() {

        this.$().addClass('sq-shake').one('webkitAnimationEnd oAnimationEnd', function() {

            Ember.$(this).removeClass('sq-shake');

        });

    },

    //


});
