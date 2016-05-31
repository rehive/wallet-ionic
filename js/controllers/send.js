angular.module('generic-client.controllers.send', [])

    .controller('SendCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {};

        $scope.submit = function (amount, note) {
            $state.go('app.send_to', {
                amount: $scope.data.amount,
                note: $scope.data.note
            });
        };
    })

    .controller('SendToCtrl', function ($scope, $state, $stateParams, ContactsService) {
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
            ContactsService.list($scope.data.to, onSuccess, onError)
        };

        $scope.selectTo = function (selectTo) {
            $scope.data.to = selectTo;
        };

        $scope.clearSearch = function () {
            $scope.contacts = [];
            $scope.data.to = "";
        };

        $scope.submit = function (amount, note, to) {
            $state.go('app.send_confirm', {
                amount: amount,
                note: note,
                to: $scope.data.to
            });
        };
    })

    .controller('SendConfirmCtrl', function ($scope, $state, $stateParams, $ionicLoading, Transaction) {
        'use strict';
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.note = $stateParams.note;
        $scope.to = $stateParams.to;

        $scope.submit = function (amount, note, to) {
            Transaction.create(amount, note, to).success(
                $state.go('app.send_success', {
                    amount: amount,
                    note: note,
                    to: to
                })
            );
        };
    })

    .controller('SendSuccessCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.note = $stateParams.note;
        $scope.to = $stateParams.to;
    });
