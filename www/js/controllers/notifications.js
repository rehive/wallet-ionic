angular.module('generic-client.controllers.notifications', [])

    .controller('NotificationsCtrl', function ($scope) {
        'use strict';
        $scope.data = {};
        $scope.notifications = [
            {
                "id": 1,
                "title": "New updates",
                "from": "ZapGo developers",
                "notification": "Download our latest app."
            },
            {
                "id": 2,
                "title": "Checkout our promotion",
                "from": "Barclays SA",
                "notification": "Go to the website for more information."
            }
        ]
    });