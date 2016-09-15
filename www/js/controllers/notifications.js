angular.module('generic-client.controllers.notifications', [])

    .controller('NotificationsCtrl', function ($scope) {
        'use strict';
        $scope.data = {};
        $scope.notifications = [
            {
                "id": 1,
                "title": "Updates",
                "from": "Rehive",
                "notification": "This feature is under development."
            }
        ]
    });