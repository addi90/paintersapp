///<reference path="../../../typings/tsd.d.ts"/>

(():void => {
    'use strict';

    angular
        .module('painter')
        .service('painters.service', PainterService);

    PainterService.$inject = ["$q", "FirebaseAppToken", "FirebaseAppUrl"];

    function PainterService(
        $q: angular.IQService,
        FirebaseAppToken,
        FirebaseAppUrl
    ): painter.interfaces.IPainterService {
        // Initialise firebase
        var users = [
            {
                avatar: "svg-1",
                content: 'Renaissance painter, scientist, inventor, and more. Da Vinci is one of most famous painters for his iconic Mona Lisa and Last Supper.',
                name: 'Leonardo Da Vinci'
            }
        ];
        var ref = (new Firebase(FirebaseAppUrl));
        ref.authWithCustomToken(FirebaseAppToken, authCallback);

        return {
            loadAllPainters: loadAllPainters,
            setData: setData
        };

        /**
         * Load all painters
         * @returns {IPromise<T>}
         */
        function loadAllPainters () {
            var defer = $q.defer();
            ref.once('value', (snapshot) => {
                users = snapshot.val();
                users = users && users['members'] ? users['members'] : users;
                defer.resolve(users);
            });
            return defer.promise;
        }

        /**
         * Set data to firebase
         * @param child
         * @param data
         */
        function setData(child, data) {
            ref.child(child)
                .set(data);
        }

        /**
         * Callback for authorisation
         * @param error
         * @param authData
         * @returns {IPromise<T>}
         */
        function authCallback (error, authData) {
            var defer = $q.defer();
            if (error) {
                defer.reject(error);
            } else {
                defer.resolve({ authInfo: authData});
            }
            return defer.promise;
        }
    }
})();