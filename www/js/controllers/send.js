angular.module('generic-client.controllers.send', [])

    .controller('SendCtrl', function ($scope, $state) {
        'use strict';

        $scope.data = {};

        $scope.submit = function (form) {
            if (form.$valid) {
                $state.go('app.send_to', {
                    amount: form.amount.$viewValue,
                    note: form.note.$viewValue
                });
            }
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

        $scope.submit = function (form) {
            if (form.$valid) {
                $state.go('app.send_confirm', {
                    amount: $scope.amount,
                    note: $scope.note,
                    to: form.to.$viewValue
                });
            }
        };
    })

    .controller('SendConfirmCtrl', function ($scope, $state, $stateParams, $ionicLoading, Transaction, $ionicPopup) {
        'use strict';
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.note = $stateParams.note;
        $scope.to = $stateParams.to;

        $scope.submit = function (amount, note, to) {
            $ionicLoading.show({
                template: 'Logging In...'
            });

            Transaction.create(amount, note, to).then(function (res) {
                if (res.status === 201) {
                    $ionicLoading.hide();
                    $state.go('app.send_success', {
                        amount: amount,
                        note: note,
                        to: to
                    });                    
                } else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({title: "Error", template: res.data.message});
                }
            }).catch(function (error) {
                $ionicPopup.alert({title: 'Authentication failed', template: error.message});
                $ionicLoading.hide();
            });
        };
    })

    .controller('SendSuccessCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.note = $stateParams.note;
        $scope.to = $stateParams.to;
    });
