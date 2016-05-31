angular.module('generic-client.controllers.settings', [])

    .controller('SettingsCtrl', function ($scope) {
        'use strict';
        $scope.data = {};
    })

    .controller('PersonalDetailsCtrl', function ($scope, $ionicModal, $state) {
        'use strict';
        $scope.data = {"username": "@helgie", "name": "Helghardt"};

        $scope.submit = function (name, surname) {
            $state.go('app.settings', {
                profile_picture: $scope.data.profile_picture,
                name: $scope.data.name,
                surname: $scope.data.surname,
                nationality: $scope.data.nationality,
                passport_id: $scope.data.passport_id
            });
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

