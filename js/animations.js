///**
// * Created by Ren on 2014-11-03.
// */
//var myApp = angular.module('appAnimations', ['ngAnimate']);
//
//myApp.animation(".room", function(){
//
//
//    var animateUp = function(element, className, done) {
//        if(className != 'active') {
//            return;
//        }
//        element.css({
//            position: 'absolute',
//            top: 500,
//            left: 0,
//            display: 'block'
//        });
//
//        jQuery(element).animate({
//            top: 0
//        }, done);
//
//        return function(cancel) {
//            if(cancel) {
//                element.stop();
//            }
//        };
//    }
//
//    var animateDown = function(element, className, done) {
//        if(className != 'active') {
//            return;
//        }
//        element.css({
//            position: 'absolute',
//            left: 0,
//            top: 0
//        });
//
//        jQuery(element).animate({
//            top: -500
//        }, done);
//
//        return function(cancel) {
//            if(cancel) {
//                element.stop();
//            }
//        };
//    }
//
//    return {
//        addClass: animateUp,
//        removeClass: animateDown
//    };
//
//
//
//
//});
//
//
