angular.module('generic-client.controllers.currency_accounts', [])

    .controller('CurrenciesCtrl', function ($scope, $window, $ionicPopup, $ionicModal, $state, $stateParams, $ionicLoading, $translate, CurrencyAccounts, Conversions) {
        'use strict';

        $scope.reference = $stateParams.reference;
        $scope.accountName = $stateParams.name;

        $scope.listData = function () {
            CurrencyAccounts.currenciesList($scope.reference).success(
                function (res) {
                    var items = [];

                    for (var i = 0; i < res.data.results.length; i++) {
                        res.data.results[i].balance = Conversions.from_cents(res.data.results[i].balance);
                        items.push(res.data.results[i]);
                        console.log(res.data.results[i])
                    }

                    $scope.items = items;
                    $window.localStorage.setItem('myAccountTokens', JSON.stringify(items));
                    $scope.$broadcast('scroll.refreshComplete');
                }
            );
        };
        
        $scope.checkActive = function(item){
            return item.active==true;
        }

        $scope.setToken = function (code) {
            $ionicLoading.show({
                template: $translate.instant("LOADER_SWITCHING_ACCOUNT")
            });

            CurrencyAccounts.set($scope.reference, code).then(function (res) {
                if (res.status === 200) {
                    $ionicLoading.hide();
                    $scope.listData();
                } else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({title: $translate.instant("ERROR"), template: res.message});
                }
            }).catch(function (error) {
                $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
                $ionicLoading.hide();
            });
        };

        $scope.listData();
    })

    .controller('CurrencyAccountsCtrl', function ($scope, $window, $ionicPopup, $ionicModal, $state, $stateParams, $ionicLoading, $translate, CurrencyAccounts, Conversions) {
        'use strict';

        $scope.listData = function () {
            CurrencyAccounts.list().success(
                function (res) {
                    $scope.items = res.data.results;
                    $scope.$broadcast('scroll.refreshComplete');
                }
            );
        };

        $scope.accountSelected = function(item){
            $state.go('app.currencies', {
                    reference: item.reference,
                    name: item.name
                });
        }

        $scope.listData();
    });