import $ from 'jquery';
import Mixin from '@ember/object/mixin';

export default Mixin.create({

    shake() {

        this.$().addClass('sq-shake').one('webkitAnimationEnd oAnimationEnd', function() {

            $(this).removeClass('sq-shake');

        });

    },

});
