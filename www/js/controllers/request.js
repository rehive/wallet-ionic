angular.module('generic-client.controllers.request', [])

    .controller('RequestCtrl', function ($scope, $state) {
        'use strict';

        $scope.data = {};

        $scope.submit = function (form) {
            if (form.$valid) {
                $state.go('app.request_from', {
                    amount: form.amount.$viewValue,
                    note: form.note.$viewValue
                });
            }
        };
    })

    .controller('RequestFromCtrl', function ($scope, $state, $stateParams, $translate, ContactsService) {
        'use strict';
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.note = $stateParams.note;

        function onSuccess(contacts) {
            $scope.contacts = ContactsService.format(contacts)
        }

        function onError() {
            alert($translate.instant("ERROR"));
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

        $scope.submit = function (form) {
            if (form.$valid) {
                $state.go('app.request_confirm', {
                    amount: $scope.amount,
                    note: $scope.note,
                    from: form.from.$viewValue
                });
            }
        };
    })

    .controller('RequestConfirmCtrl', function ($scope, $state, $stateParams, $ionicLoading, $translate, Transaction, $ionicPopup) {
        'use strict';
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.note = $stateParams.note;
        $scope.from = $stateParams.from;

        $scope.submit = function (amount, note, from) {
            $ionicLoading.show({
                template: $translate.instant("LOADER_LOGGING_IN")
            });

            $ionicLoading.hide();

            $ionicPopup.alert({title: $translate.instant("ERROR"), template: $translate.instant("INCOMPLETE_ERROR")});

            // Transaction.create(amount, note, from).then(function (res) {
            //     if (res.status === 201) {
            //         $ionicLoading.hide();
            //         $state.go('app.request_success', {
            //             amount: amount,
            //             note: note,
            //             from: from
            //         });
            //     } else {
            //         $ionicLoading.hide();
            //         $ionicPopup.alert({title: "Error", template: res.data.message});
            //     }
            // }).catch(function (error) {
            //     $ionicPopup.alert({title: 'Authentication failed', template: error.message});
            //     $ionicLoading.hide();
            // });
        };
    })

    .controller('RequestSuccessCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.note = $stateParams.note;
        $scope.from = $stateParams.from;
    });