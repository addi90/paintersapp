///<reference path="../../../typings/tsd.d.ts"/>

import interfaces = painter.interfaces;

(():void => {
    'use strict';

    angular
        .module('painter')
        .controller('PainterController', PainterController);

    PainterController.$inject = [ "painters.service", "$mdSidenav", "$mdBottomSheet", "$q"];

    function  PainterController (
        PainterService: painter.interfaces.IPainterService,
        $mdSidenav: angular.material.ISidenavService,
        $mdBottomSheet: angular.material.IBottomSheetService,
        $q: angular.IQService
    ) {
        var vm = this;
        init();

        function init (): void {
            vm.selected        = null;
            vm.painters        = <painter.interfaces.IPainter>[ ];
            vm.selectPainter   = selectPainter;
            vm.toggleList      = togglePaintersList;

            // Load all painters
            PainterService
                .loadAllPainters()
                .then((painters: [interfaces.IPainter]): void => {
                    vm.painters    = vm.painters.concat(painters);
                    // Assign first as default
                    vm.selected = painters[0];
                });
        }

        /**
         * Toggle selected painter
         */
        function togglePaintersList (): void {
            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function(){
                $mdSidenav('left').toggle();
            });
        }

        /**
         * Select a given painter
         * @param painter
         */
        function selectPainter(painter: painter.interfaces.IPainter): void {
            vm.selected = angular.isNumber(painter) ? vm.painters[painter] : painter;
            vm.toggleList();
        }
    }
})();