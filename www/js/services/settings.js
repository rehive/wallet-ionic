/*global Firebase, console, angular */
angular.module('generic-client.services.settings', [])

    .service('PersonalDetails', function ($http, API) {
        'use strict';
        var self = this;

        self.get = function () {
            return $http.get(API + '/users/profile/');
        };

        self.create = function (first_name, last_name, id_number, nationality, language) {
            return $http.put(API + '/users/profile/', {
                first_name: first_name,
                last_name: last_name,
                id_number: id_number,
                nationality: nationality,
                language: language
            });
        };
    })

    .service('Languages', function () {
        'use strict';
        var self = this;

        self.list = function () {
            return [
                        {code: 'en', name: "English"},
                        {code: 'af', name: "Afrikaans"}
                    ]
        };
    })

    .service('Countries', function () {
        'use strict';
        var self = this;

        self.list = function () {
            return [{code: 'ZA', name: "South Africa"}]
        };
    })

    .service('Address', function ($http, API) {
        'use strict';
        var self = this;

        self.get = function () {
            return $http.get(API + '/users/address/');
        };

        self.create = function (line_1, line_2, city, state_province, country, code) {

            return $http.put(API + '/users/address/', {
                line_1: line_1,
                line_2: line_2,
                city: city,
                state_province: state_province,
                country: country,
                postal_code: code
            });
        };
    })

    .service('BankAccount', function ($http, API) {
        'use strict';
        var self = this;

        self.list = function () {
            return $http.get(API + '/users/bank_accounts/');
        };

        self.get = function (accId) {
            return $http.get(API + '/users/bank_accounts/' + accId + '/');
        };

        self.update = function (accId, name, number, type, bank_name, branch_code, swift, iban, bic) {

            return $http.put(API + '/users/bank_accounts/' + accId + '/', {
                name: name,
                number: number,
                type: type,
                bank_name: bank_name,
                branch_code: branch_code,
                swift: swift,
                iban: iban,
                bic: bic
            });
        };

        self.create = function (name, number, type, bank_name, branch_code, swift, iban, bic) {

            return $http.post(API + '/users/bank_accounts/', {
                name: name,
                number: number,
                type: type,
                bank_name: bank_name,
                branch_code: branch_code,
                swift: swift,
                iban: iban,
                bic: bic
            });
        };
    })


    .service('BitcoinWithdrawalAccount', function ($http, API) {
        'use strict';
        var self = this;

        self.list = function () {
            console.log($http.get(API + '/users/bitcoin_accounts/'));
            return $http.get(API + '/users/bitcoin_accounts/');
        };

        self.get = function (accId) {
            return $http.get(API + '/users/bitcoin_accounts/' + accId + '/');
        };

        self.update = function (accId, address) {

            return $http.put(API + '/users/bitcoin_accounts/' + accId + '/', {
                address: address
            });
        };

        self.create = function (address) {

            return $http.post(API + '/users/bitcoin_accounts/', {
                address: address
            });
        };
    })

    .service('Email', function ($http, API) {
        'use strict';
        var self = this;

        self.list = function () {
            return $http.get(API + '/users/emails/');
        };

        self.create = function (email_address, primary) {
            return $http.post(API + '/users/emails/', {
                email: email_address,
                primary: primary
            });
        };

        self.update = function (email_id, primary) {
            return $http.patch(API + '/users/emails/'+ email_id + '/', {
                primary: primary
            })
        };

        self.delete = function (email_id) {
            return $http.delete(API + '/users/emails/'+ email_id + '/');
        };

        self.resendVerification = function (email_address, company_id) {
            return $http.post(API + '/auth/email/verify/resend/', {
                identifier: email_address,
                company_id: company_id
            });
        };
    })

    .service('Mobile', function ($http, API) {
        'use strict';
        var self = this;

        self.list = function () {
            return $http.get(API + '/users/mobiles/');
        };

        self.create = function (mobile_number, primary) {
            return $http.post(API + '/users/mobiles/', {
                number: mobile_number,
                primary: primary
            });
        };

        self.update = function (mobile_id, primary) {
            return $http.patch(API + '/users/mobiles/'+ mobile_id + '/', {
                primary: primary
            })
        };

        self.delete = function (mobile_id) {
            return $http.delete(API + '/users/mobiles/'+ mobile_id + '/');
        };

        self.resendVerification = function (mobile_number, company_id) {
            return $http.post(API + '/auth/mobile/verify/resend/', {
                identifier: mobile_number,
                company_id: company_id
            });
        };
    })

    .service('TokenInfo', function ($http, API) {
        'use strict';
        var self = this;

        self.get = function () {
            return $http.get(API + '/accounts/currency/');
        };

    })

    .service('Password', function ($http, API) {
        'use strict';
        var self = this;

        self.update = function (old_password, new_password, confirm_password) {
            return $http.post(API + '/auth/password/change/', {
                old_password: old_password,
                new_password1: new_password,
                new_password2: confirm_password
            });
        };
    })

    .service('Notification', function ($http, API) {
        'use strict';
        var self = this;

        self.list = function () {
            return $http.get(API + '/users/notifications/');
        };

        self.set = function (notification, email_enabled, sms_enabled) {

            console.log(email_enabled)
            console.log(sms_enabled)

            return $http.put(API + '/users/notifications/'+ notification + '/', {
                email_enabled: email_enabled,
                sms_enabled: sms_enabled
            });
        };

    })

    .service('Document', function ($http, Auth) {
        'use strict';
        var self = this;

        self.upload = function (file, document_type, document_category) {

            var options = {
                fileKey: 'image',
                fileName: imagePath.substr(imagePath.lastIndexOf('/') + 1),
                chunkedMode: true,
                mimeType: 'image/jpg',
                headers: {'Authorization': 'JWT ' + Auth.getToken(), 'Connection': 'close'}
            };

        };
    });