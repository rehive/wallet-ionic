angular.module('generic-client.controllers.send', [])

    .controller('SendCtrl', function ($scope, $state, $window) {
        'use strict';

        $scope.data = {};
        $scope.currency = JSON.parse($window.localStorage.getItem('myCurrency'));

        $scope.submit = function (form) {
            if (form.$valid) {
                $state.go('app.send_to', {
                    amount: form.amount.$viewValue,
                    note: form.note.$viewValue,
                    currency: $scope.currency
                });
            }
        };
    })

    .controller('SendToCtrl', function ($scope, $state, $stateParams, ContactsService) {
        'use strict';
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.note = $stateParams.note;
        $scope.currency = $stateParams.currency;

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
                    to: form.to.$viewValue,
                    currency: $scope.currency
                });
            }
        };
    })

    .controller('SendConfirmCtrl', function ($scope, $state, $stateParams, $ionicLoading, $translate, Transaction, $ionicPopup, Conversions) {
        'use strict';
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.note = $stateParams.note;
        $scope.to = $stateParams.to;
        $scope.currency = $stateParams.currency;

        if ($scope.note === null) {
            $scope.note = ''
        }

        $scope.submit = function (amount, note, to, currency) {
            $ionicLoading.show({
                template: $translate.instant("LOADER_SENDING")
            });

            Transaction.create(Conversions.to_cents(amount), note, to).then(function (res) {
                if (res.status === 201) {
                    $ionicLoading.hide();
                    $state.go('app.send_success', {
                        amount: amount,
                        note: note,
                        to: to,
                        currency: currency
                    });
                } else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({title: $translate.instant("ERROR"), template: res.data.message});
                }
            }).catch(function (error) {
                $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
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
        $scope.currency = $stateParams.currency;
    });
