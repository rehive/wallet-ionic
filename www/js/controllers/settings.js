angular.module('generic-client.controllers.settings', [])

    .controller('SettingsCtrl', function ($scope) {
        'use strict';
        $scope.data = {};
    })

    .controller('PersonalDetailsCtrl', function ($scope, $ionicPopup, $ionicModal, $state, $ionicLoading, PersonalDetails) {
        'use strict';

        var getPersonalDetails = PersonalDetails.get();

        getPersonalDetails.success(
            function (res) {
                $scope.data = {"first_name": res.first_name, "last_name": res.last_name, "email_address": res.email, "nationality": res.nationality};
            }
        );

        getPersonalDetails.catch(function (error) {

        });

        $scope.submit = function (form) {
            $ionicLoading.show({
                template: 'Saving Info...'
            });

            if (form.$valid) {

                PersonalDetails.create(form.first_name.$viewValue, form.last_name.$viewValue, form.email_address.$viewValue, form.nationality.$viewValue).then(function (res) {

                    if (res.status === 200) {
                        $ionicLoading.hide();
                    } else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({title: "Error", template: res.data.message});
                    }
                }).catch(function (error) {
                    $ionicPopup.alert({title: 'Authentication failed', template: error.message});
                    $ionicLoading.hide();
                });
            }
        };
    })

    .controller('MobileNumberCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {"mobile_number": "+27842490903"};

        $scope.submit = function (mobile_number) {
            $state.go('app.profile', {
                mobile_number: $scope.data.mobile_number
            });
        };
    })

    .controller('EmailAddressCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {"email_address": "helghardt@gmail.com"};

        $scope.submit = function (email_address) {
            $state.go('app.profile', {
                email_address: $scope.data.email_address
            });
        };
    })

    .controller('ListAddressesCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {};
        var addresses = [{"address": "14 High Hill"}, {"address": "66 Albert Rd"}]
        $scope.addresses = addresses
    })

    .controller('AddAddressCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {};
        $scope.addressList = [
            {default: "Default", checked: false},
        ];

        $scope.submit = function () {
            $state.go('app.list_addresses', {});
        };
    })

    .controller('ListBankAccountsCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {};
        var accounts = [{"account": "FNB 543645"}, {"account": "Standard 654654"}]
        $scope.accounts = accounts
    })

    .controller('AddBankAccountCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {};

        $scope.submit = function (bank_name, branch_name, account_number, account_holder_name, account_type) {
            $state.go('app.list_bank_accounts', {});
        };
    })

    .controller('SecurityCtrl', function ($scope) {
        'use strict';
        $scope.data = {};
    })

    .controller('ResetPasswordCtrl', function ($scope) {
        'use strict';
        $scope.data = {};
    })

    .controller('TwoFactorCtrl', function ($scope) {
        'use strict';
        $scope.data = {};
    })

    .controller('PinCtrl', function ($scope) {
        'use strict';
        $scope.pinList = [
            {text: "Opening app", checked: true},
            {text: "Sending or requesting money", checked: true},
            {text: "Reset password", checked: true},
            {text: "Deposting or withdrawing", checked: true}
        ];
    });

