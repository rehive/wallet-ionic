angular.module('generic-client.controllers.request', [])

    .controller('RequestCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {};

        $scope.submit = function (amount, note) {
            $state.go('app.request_from', {
                amount: $scope.data.amount,
                note: $scope.data.note
            });
        };
    })

    .controller('RequestFromCtrl', function ($scope, $state, $stateParams, ContactsService) {
        'use strict';
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.note = $stateParams.note;

        function onSuccess(contacts) {
            $scope.contacts = ContactsService.format(contacts)
        }

        function onError() {
            alert('Error!');
        }

        $scope.getValue = function () {
            ContactsService.list($scope.data.from, onSuccess, onError)
        };

        $scope.selectFrom = function (selectFrom) {
            $scope.data.from = selectFrom;
        };

        $scope.clearSearch = function () {
            $scope.contacts = [];
            $scope.data.from = "";
        };

        $scope.submit = function (amount, note, from) {
            $state.go('app.request_confirm', {
                amount: amount,
                note: note,
                from: $scope.data.from
            });
        };
    })

    .controller('RequestConfirmCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.note = $stateParams.note;
        $scope.from = $stateParams.from;

        $scope.submit = function (amount, note, from) {
            $state.go('app.request_success', {
                amount: amount,
                note: note,
                from: from
            });
        };
    })

    .controller('RequestSuccessCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.from = $stateParams.from;
    });