///<reference path="../../typings/tsd.d.ts"/>

(():void => {
    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = [ "$mdThemingProvider", "$mdIconProvider" ];

    function config(
        $mdThemingProvider: angular.material.IThemingProvider,
        $mdIconProvider: angular.material.IIconProvider
    ) {

        // Set default theme
        $mdThemingProvider
            .theme('default')
            .primaryPalette('blue')
            .accentPalette('red');

        // Set icons
        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu"       , "./assets/svg/menu.svg"        , 24)
            .icon("share"      , "./assets/svg/share.svg"       , 24)
            .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
            .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
            .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
            .icon("phone"      , "./assets/svg/phone.svg"       , 512);
    }
})();