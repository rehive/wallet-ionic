angular.module('generic-client.controllers', [])


    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    })


    .controller('KeypadCtrl', function ($scope, $rootScope, $state) {
        'use strict';

        $scope.viewTitle = '';
        $scope.keypadVar = '';
        $scope.action = 'Pay';

        $scope.keyPress = function (value, source) {
            if (source === 'LEFT_CONTROL') {
                if ($scope.keypadVar.indexOf('.') === -1) {
                    if ($scope.keypadVar.length === 0)
                        $scope.keypadVar += '0.';
                    else
                        $scope.keypadVar += '.';
                }
                console.log($scope.keypadVar.length)
            }
            else if (source === 'RIGHT_CONTROL') {
                $scope.keypadVar = $scope.keypadVar.substr(0, $scope.keypadVar.length - 1);
                console.log($scope.keypadVar.length)
            }
            else if (source === 'NUMERIC_KEY') {
                if ($scope.keypadVar.indexOf('.') === -1) {
                    $scope.keypadVar += value;
                } else if ($scope.keypadVar.length - $scope.keypadVar.indexOf('.') <= 2) {
                    $scope.keypadVar += value;
                }
                console.log($scope.keypadVar.length)

            }
        };

        $rootScope.scanQr = function () {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);
                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );
        }

        $scope.pay_to = function (amount, note) {
            console.log(amount);
            console.log(note);
            $state.go('app.pay_to', {
                amount: amount,
                note: note
            });
        };

        $scope.request_from = function (amount) {
            console.log(amount);
            $state.go('app.request_from', {
                amount: amount
            });
        };
    })


    .controller('PayCtrl', function ($scope, $state) {
        'use strict';
        console.log('Payment amount');
        $scope.data = {};
        console.log($scope.data.amount);
        console.log($scope.data.note);

        $scope.submit = function (amount, note) {
            console.log(amount);
            $state.go('app.pay_to', {
                amount: $scope.data.amount,
                note: $scope.data.note
            });
        };
    })


    .controller('PayToCtrl', function ($scope, $state, $stateParams, ContactsService) {
        'use strict';
        console.log('Pay to');
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.note = $stateParams.note;
        console.log($scope.amount);
        console.log($scope.data.to);

        function onSuccess(contacts) {

            console.log(contacts)
            console.log(contacts.length)

            $scope.contacts = ContactsService.formatContact(contacts)
        }

        function onError() {
            alert('Error!');
        }

        $scope.getValue = function () {

            console.log('To');
            console.log('Length');
            console.log($scope.data.to);

            ContactsService.listContacts($scope.data.to, onSuccess, onError)
        };

        $scope.selectTo = function (selectTo) {
            $scope.data.to = selectTo;
        };

        $scope.clearSearch = function () {
            console.log('Clear to input.');
            $scope.contacts = [];
            $scope.data.to = "";
        };

        $scope.submit = function (amount, note, to) {
            console.log(amount);
            console.log(note);
            console.log(to);
            $state.go('app.pay_confirm', {
                amount: amount,
                note: note,
                to: $scope.data.to
            });
        };
    })


    .controller('PayConfirmCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        console.log('Confirm payment');
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.note = $stateParams.note;
        $scope.to = $stateParams.to;
        console.log($scope.amount);
        console.log($scope.to);

        $scope.submit = function (amount, note, to) {
            console.log(amount);
            console.log(note);
            console.log(to);
            $state.go('app.pay_success', {
                amount: amount,
                note: note,
                to: to
            });
        };
    })


    .controller('PaySuccessCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        console.log('Payment success');
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.note = $stateParams.note;
        $scope.to = $stateParams.to;
        console.log($scope.amount);
        console.log($scope.note);
        console.log($scope.to);
    })


    .controller('RequestCtrl', function ($scope, $state) {
        'use strict';
        console.log('Request amount');
        $scope.data = {};
        console.log($scope.data.amount);
        console.log($scope.data.note);

        $scope.submit = function (amount, note) {
            console.log(amount);
            console.log(note);
            $state.go('app.request_from', {
                amount: $scope.data.amount,
                note: $scope.data.note
            });
        };
    })


    .controller('RequestFromCtrl', function ($scope, $state, $stateParams, ContactsService) {
        'use strict';
        console.log('Request from');
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.note = $stateParams.note;
        console.log($scope.amount);
        console.log($scope.note);
        console.log($scope.data.from);


        function onSuccess(contacts) {

            console.log(contacts)
            console.log(contacts.length)

            $scope.contacts = ContactsService.formatContact(contacts)
        }

        function onError() {
            alert('Error!');
        }

        $scope.getValue = function () {

            console.log('From');
            console.log('Length');
            console.log($scope.data.from);

            ContactsService.listContacts($scope.data.from, onSuccess, onError)
        };

        $scope.selectFrom = function (selectFrom) {
            $scope.data.from = selectFrom;
        };

        $scope.clearSearch = function () {
            console.log('Clear to input.');
            $scope.contacts = [];
            $scope.data.from = "";
        };

        $scope.submit = function (amount, note, from) {
            console.log(amount);
            console.log(note);
            console.log(from);
            $state.go('app.request_confirm', {
                amount: amount,
                note: note,
                from: $scope.data.from
            });
        };


    })


    .controller('RequestConfirmCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        console.log('Confirm payment');
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.note = $stateParams.note;
        $scope.from = $stateParams.from;
        console.log($scope.amount);
        console.log($scope.from);

        $scope.submit = function (amount, note, from) {
            console.log(amount);
            console.log(note);
            console.log(from);
            $state.go('app.request_success', {
                amount: amount,
                note: note,
                from: from
            });
        };
    })


    .controller('RequestSuccessCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        console.log('Request success');
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.from = $stateParams.from;
        console.log($scope.amount);
        console.log($scope.from);
    })

    .controller('FundCtrl', function ($scope) {
        'use strict';
        console.log('Fund account');
        $scope.data = {};
    })


    .controller('CashOutCtrl', function ($scope, $state) {
        'use strict';
        console.log('Withdraw amount');
        $scope.data = {};
        console.log($scope.data.amount);

        $scope.submit = function (amount) {
            console.log(amount);
            $state.go('app.cash_out_to', {
                amount: $scope.data.amount
            });
        };
    })


    .controller('CashOutToCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        console.log('Withdraw to');
        $scope.data = {};
        $scope.data.to = "FNB 543645"
        $scope.amount = $stateParams.amount;
        console.log($scope.amount);
        console.log($scope.data.to);

        $scope.submit = function (amount, to) {
            console.log(amount);
            console.log(to);
            $state.go('app.cash_out_confirm', {
                amount: amount,
                to: $scope.data.to
            });
        };
    })


    .controller('CashOutConfirmCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        console.log('Confirm cash_outal');
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.to = $stateParams.to;
        console.log($scope.amount);
        console.log($scope.to);

        $scope.submit = function (amount, to) {
            console.log(amount);
            console.log(to);
            $state.go('app.cash_out_success', {
                amount: amount,
                to: to
            });
        };
    })


    .controller('CashOutSuccessCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        console.log('Withdraw success');
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.to = $stateParams.to;
        console.log($scope.amount);
        console.log($scope.to);
    })


    .controller('ReceiveCtrl', function ($scope) {
        'use strict';
        console.log('Receive address');
        $scope.data = {};
    })


    .controller('PromotionCodeCtrl', function ($scope, $state) {
        'use strict';
        console.log('Promotion');
    })


    .controller('PromotionRedeemCtrl', function ($scope, $state) {
        'use strict';
        console.log('Promotion redeem');
        $scope.data = {};
        console.log($scope.data.promotion_code);


        $scope.submit = function (promotion_code) {
            console.log(promotion_code);
            $state.go('app.promotion_success', {
                promotion_code: $scope.data.promotion_code
            });
        };
    })


    .controller('PromotionSuccessCtrl', function ($scope, $state, $stateParams) {
        'use strict';
        console.log('Promotion success');
        $scope.data = {};
        $scope.amount = $stateParams.promotion_code;
        console.log($scope.promotion_code);
    })


    .controller('NotificationsCtrl', function ($scope) {
        'use strict';
        console.log('Notifications');
        $scope.data = {};
        $scope.notifications = [{
            "id": 1,
            "title": "New updates",
            "from": "ZapGo developers",
            "notification": "Download our latest app."
        },
            {
                "id": 2,
                "title": "Checkout our promotion",
                "from": "Barclays SA",
                "notification": "Go to the website for more information."
            }]
    })


    .controller('HelpCtrl', function ($scope) {
        'use strict';
        console.log('Help section');
        $scope.data = {};
    })


    .controller('SettingsCtrl', function ($scope) {
        'use strict';
        console.log('Settings');
        $scope.data = {};
    })


    .controller('PersonalDetailsCtrl', function ($scope, $ionicModal, $state) {
        'use strict';
        console.log('Personal details');
        $scope.data = {"username": "@helgie", "name": "Helghardt"};

        $scope.submit = function (name, surname) {
            console.log(name);
            console.log(surname);
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
        console.log('Mobile number');
        $scope.data = {"mobile_number": "+27842490903"};
        console.log($scope.data.mobile_number);

        $scope.submit = function (mobile_number) {
            console.log(mobile_number);
            $state.go('app.profile', {
                mobile_number: $scope.data.mobile_number
            });
        };
    })


    .controller('EmailAddressCtrl', function ($scope, $state) {
        'use strict';
        console.log('Email address');
        $scope.data = {"email_address": "helghardt@gmail.com"};
        console.log($scope.data.email_address);

        $scope.submit = function (email_address) {
            console.log(email_address);
            $state.go('app.profile', {
                email_address: $scope.data.email_address
            });
        };
    })


    .controller('ListAddressesCtrl', function ($scope, $state) {
        'use strict';
        console.log('List addresses');
        $scope.data = {};
        var addresses = [{"address": "14 High Hill"}, {"address": "66 Albert Rd"}]
        $scope.addresses = addresses
    })


    .controller('AddAddressCtrl', function ($scope, $state) {
        'use strict';
        console.log('Add address');
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
        console.log('List bank accounts');
        $scope.data = {};
        var accounts = [{"account": "FNB 543645"}, {"account": "Standard 654654"}]
        $scope.accounts = accounts
    })


    .controller('AddBankAccountCtrl', function ($scope, $state) {
        'use strict';
        console.log('Add bank');
        $scope.data = {};

        $scope.submit = function (bank_name, branch_name, account_number, account_holder_name, account_type) {
            console.log($scope.data.bank_name);
            $state.go('app.list_bank_accounts', {});
        };
    })


    .controller('FicaRequirementsCtrl', function ($scope, $state) {
        'use strict';
        console.log('Fica requirements');
        $scope.data = {};
    })


    .controller('FicaIdCtrl', function ($scope, $state) {
        'use strict';
        console.log('Fica ID instructions');
        $scope.data = {type: "id"};

        $scope.submit = function (type) {
            console.log($scope.data.type);
            $state.go('app.fica_camera_upload', {
                type: $scope.data.type
            });
        };
    })


    .controller('FicaIdSelfieCtrl', function ($scope, $state) {
        'use strict';
        console.log('Fica ID/Selfie instructions');
        $scope.data = {type: "id_selfie"};

        $scope.submit = function (type) {
            console.log($scope.data.type);
            $state.go('app.fica_camera_upload', {
                type: $scope.data.type
            });
        };

    })


    .controller('FicaProofOfAddressCtrl', function ($scope, $state) {
        'use strict';
        console.log('Fica proof of address');
        $scope.data = {type: "proof_of_address"};

        $scope.submit = function (type) {
            console.log($scope.data.type);
            $state.go('app.fica_camera_upload', {
                type: $scope.data.type
            });
        };

    })


    .controller('FicaCameraUploadCtrl', function ($scope, $state) {
        'use strict';
        console.log('Upload file');
    })


    .controller('SecurityCtrl', function ($scope) {
        'use strict';
        console.log('Security');
        $scope.data = {};
    })


    .controller('ResetPasswordCtrl', function ($scope) {
        'use strict';
        console.log('Reset password');
        $scope.data = {};
    })


    .controller('TwoFactorCtrl', function ($scope) {
        'use strict';
        console.log('Two factor');
        $scope.data = {};
    })


    .controller('PinCtrl', function ($scope) {
        'use strict';
        console.log('Pin');
        $scope.pinList = [
            {text: "Opening app", checked: true},
            {text: "Sending or requesting money", checked: true},
            {text: "Reset password", checked: true},
            {text: "Deposting or withdrawing", checked: true}
        ];
    });

window.CONTACTS = [{
    "id": 1,
    "first_name": "Patrick",
    "last_name": "Rogers",
    "country": "Cyprus",
    "ip_address": "153.88.89.148",
    "email": "progers@yata.net"
},
    {
        "id": 2,
        "first_name": "Janet",
        "last_name": "Gordon",
        "country": "Croatia",
        "ip_address": "209.73.121.212",
        "email": "jgordon@skivee.biz"
    },
    {
        "id": 3,
        "first_name": "Kathy",
        "last_name": "Hamilton",
        "country": "Armenia",
        "ip_address": "164.214.217.162",
        "email": "khamilton@rhynyx.biz"
    },
    {
        "id": 4,
        "first_name": "Stephanie",
        "last_name": "Johnson",
        "country": "Mauritius",
        "ip_address": "8.199.242.67",
        "email": "sjohnson@jabbertype.mil"
    },
    {
        "id": 5,
        "first_name": "Jerry",
        "last_name": "Palmer",
        "country": "Thailand",
        "ip_address": "230.207.100.163",
        "email": "jpalmer@avamm.org"
    },
    {
        "id": 6,
        "first_name": "Lillian",
        "last_name": "Franklin",
        "country": "Germany",
        "ip_address": "150.190.116.1",
        "email": "lfranklin@eare.mil"
    },
    {
        "id": 7,
        "first_name": "Melissa",
        "last_name": "Gordon",
        "country": "Serbia",
        "ip_address": "162.156.29.99",
        "email": "mgordon@flashset.org"
    },
    {
        "id": 8,
        "first_name": "Sarah",
        "last_name": "Burns",
        "country": "Grenada",
        "ip_address": "13.177.156.223",
        "email": "sburns@eimbee.info"
    },
    {
        "id": 9,
        "first_name": "Willie",
        "last_name": "Burton",
        "country": "Croatia",
        "ip_address": "115.133.81.82",
        "email": "wburton@dynazzy.info"
    },
    {
        "id": 10,
        "first_name": "Tina",
        "last_name": "Simmons",
        "country": "United States Virgin Islands",
        "ip_address": "113.49.63.18",
        "email": "tsimmons@devpulse.mil"
    },
    {
        "id": 11,
        "first_name": "Kenneth",
        "last_name": "Larson",
        "country": "Mexico",
        "ip_address": "92.89.76.196",
        "email": "klarson@browseblab.info"
    },
    {
        "id": 12,
        "first_name": "Philip",
        "last_name": "Welch",
        "country": "Cuba",
        "ip_address": "223.180.48.70",
        "email": "pwelch@skippad.edu"
    },
    {
        "id": 13,
        "first_name": "Nicholas",
        "last_name": "Parker",
        "country": "British Indian Ocean Territory",
        "ip_address": "200.150.119.13",
        "email": "nparker@twitternation.net"
    },
    {
        "id": 14,
        "first_name": "Nicole",
        "last_name": "Webb",
        "country": "Moldova",
        "ip_address": "47.66.237.205",
        "email": "nwebb@midel.biz"
    },
    {
        "id": 15,
        "first_name": "Clarence",
        "last_name": "Schmidt",
        "country": "China",
        "ip_address": "134.84.246.67",
        "email": "cschmidt@dazzlesphere.net"
    },
    {
        "id": 16,
        "first_name": "Jessica",
        "last_name": "Murray",
        "country": "Sao Tome and Principe",
        "ip_address": "211.30.32.109",
        "email": "jmurray@jumpxs.net"
    },
    {
        "id": 17,
        "first_name": "Willie",
        "last_name": "Schmidt",
        "country": "US Minor Outlying Islands",
        "ip_address": "158.40.109.208",
        "email": "wschmidt@babbleset.edu"
    },
    {
        "id": 18,
        "first_name": "Margaret",
        "last_name": "Evans",
        "country": "Bhutan",
        "ip_address": "252.123.77.101",
        "email": "mevans@voolia.info"
    },
    {
        "id": 19,
        "first_name": "Arthur",
        "last_name": "Morales",
        "country": "Faroe Islands",
        "ip_address": "116.5.126.29",
        "email": "amorales@brainlounge.biz"
    },
    {
        "id": 20,
        "first_name": "Charles",
        "last_name": "Perez",
        "country": "Italy",
        "ip_address": "10.43.255.4",
        "email": "cperez@avaveo.net"
    },
    {
        "id": 21,
        "first_name": "Jeffrey",
        "last_name": "Webb",
        "country": "Liechtenstein",
        "ip_address": "55.140.114.8",
        "email": "jwebb@mynte.net"
    },
    {
        "id": 22,
        "first_name": "Andrea",
        "last_name": "Simpson",
        "country": "Nauru",
        "ip_address": "22.243.12.86",
        "email": "asimpson@browsetype.mil"
    },
    {
        "id": 23,
        "first_name": "Steve",
        "last_name": "Reynolds",
        "country": "Morocco",
        "ip_address": "21.166.38.112",
        "email": "sreynolds@topiclounge.biz"
    },
    {
        "id": 24,
        "first_name": "Gerald",
        "last_name": "Reyes",
        "country": "Isle of Man",
        "ip_address": "235.115.15.46",
        "email": "greyes@voolith.biz"
    },
    {
        "id": 25,
        "first_name": "Judy",
        "last_name": "Washington",
        "country": "Sweden",
        "ip_address": "39.120.240.182",
        "email": "jwashington@oyondu.net"
    },
    {
        "id": 26,
        "first_name": "Brandon",
        "last_name": "Patterson",
        "country": "Vietnam",
        "ip_address": "18.176.165.38",
        "email": "bpatterson@skyba.org"
    },
    {
        "id": 27,
        "first_name": "Jacqueline",
        "last_name": "Stephens",
        "country": "Cambodia",
        "ip_address": "207.226.109.97",
        "email": "jstephens@fivespan.net"
    },
    {
        "id": 28,
        "first_name": "Carlos",
        "last_name": "Harrison",
        "country": "Burkina Faso",
        "ip_address": "130.22.96.6",
        "email": "charrison@yacero.gov"
    },
    {
        "id": 29,
        "first_name": "Carol",
        "last_name": "Payne",
        "country": "Estonia",
        "ip_address": "194.1.83.133",
        "email": "cpayne@brightbean.com"
    },
    {
        "id": 30,
        "first_name": "David",
        "last_name": "Baker",
        "country": "Montenegro",
        "ip_address": "39.212.209.46",
        "email": "dbaker@youspan.name"
    },
    {
        "id": 31,
        "first_name": "Justin",
        "last_name": "Watkins",
        "country": "Timor-Leste",
        "ip_address": "8.56.161.224",
        "email": "jwatkins@centimia.net"
    },
    {
        "id": 32,
        "first_name": "Roy",
        "last_name": "Meyer",
        "country": "Seychelles",
        "ip_address": "166.207.153.210",
        "email": "rmeyer@quire.com"
    },
    {
        "id": 33,
        "first_name": "Kelly",
        "last_name": "Richardson",
        "country": "Central African Republic",
        "ip_address": "74.86.34.94",
        "email": "krichardson@agivu.net"
    },
    {
        "id": 34,
        "first_name": "Howard",
        "last_name": "Mason",
        "country": "Portugal",
        "ip_address": "139.237.150.73",
        "email": "hmason@wikivu.info"
    },
    {
        "id": 35,
        "first_name": "Karen",
        "last_name": "Jackson",
        "country": "Swaziland",
        "ip_address": "143.153.219.220",
        "email": "kjackson@kazio.net"
    },
    {
        "id": 36,
        "first_name": "Christine",
        "last_name": "Bennett",
        "country": "France",
        "ip_address": "102.220.71.37",
        "email": "cbennett@pixoboo.edu"
    },
    {
        "id": 37,
        "first_name": "Ashley",
        "last_name": "Jordan",
        "country": "Svalbard and Jan Mayen Islands",
        "ip_address": "217.38.155.41",
        "email": "ajordan@oba.edu"
    },
    {
        "id": 38,
        "first_name": "David",
        "last_name": "Lopez",
        "country": "Mongolia",
        "ip_address": "87.83.224.164",
        "email": "dlopez@gevee.net"
    },
    {
        "id": 39,
        "first_name": "Andrew",
        "last_name": "Pierce",
        "country": "Vatican City State (Holy See)",
        "ip_address": "107.33.80.251",
        "email": "apierce@einti.info"
    },
    {
        "id": 40,
        "first_name": "Michael",
        "last_name": "Hughes",
        "country": "New Caledonia",
        "ip_address": "230.246.102.4",
        "email": "mhughes@roodel.name"
    },
    {
        "id": 41,
        "first_name": "Earl",
        "last_name": "Henderson",
        "country": "Wallis and Futuna Islands",
        "ip_address": "209.198.245.189",
        "email": "ehenderson@youspan.name"
    },
    {
        "id": 42,
        "first_name": "Frank",
        "last_name": "Simpson",
        "country": "Uruguay",
        "ip_address": "101.40.193.226",
        "email": "fsimpson@browseblab.edu"
    },
    {
        "id": 43,
        "first_name": "Jane",
        "last_name": "Simpson",
        "country": "New Zealand",
        "ip_address": "232.49.15.188",
        "email": "jsimpson@jayo.net"
    },
    {
        "id": 44,
        "first_name": "Sarah",
        "last_name": "Cook",
        "country": "Thailand",
        "ip_address": "91.41.176.224",
        "email": "scook@jumpxs.com"
    },
    {
        "id": 45,
        "first_name": "Marilyn",
        "last_name": "Tucker",
        "country": "Western Sahara",
        "ip_address": "146.77.96.245",
        "email": "mtucker@zoomzone.mil"
    },
    {
        "id": 46,
        "first_name": "Scott",
        "last_name": "Lewis",
        "country": "Spain",
        "ip_address": "119.197.8.105",
        "email": "slewis@kwilith.com"
    },
    {
        "id": 47,
        "first_name": "Tammy",
        "last_name": "Mills",
        "country": "Spain",
        "ip_address": "48.52.175.97",
        "email": "tmills@dabz.gov"
    },
    {
        "id": 48,
        "first_name": "Susan",
        "last_name": "Crawford",
        "country": "Slovenia",
        "ip_address": "23.120.101.112",
        "email": "scrawford@voonyx.biz"
    },
    {
        "id": 49,
        "first_name": "Barbara",
        "last_name": "Palmer",
        "country": "Oman",
        "ip_address": "143.107.3.220",
        "email": "bpalmer@blogtag.org"
    },
    {
        "id": 50,
        "first_name": "Stephanie",
        "last_name": "Diaz",
        "country": "Equatorial Guinea",
        "ip_address": "175.115.251.194",
        "email": "sdiaz@meevee.com"
    }];