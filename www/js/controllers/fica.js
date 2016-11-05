angular.module('generic-client.controllers.fica', [])

    .controller('FicaRequirementsCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {};
    })

    .controller('FicaIdCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {type: "id"};

        $scope.submit = function (type) {
            $state.go('app.fica_camera_upload', {
                type: $scope.data.type
            });
        };
    })

    .controller('FicaIdSelfieCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {type: "id_selfie"};

        $scope.submit = function (type) {
            $state.go('app.fica_camera_upload', {
                type: $scope.data.type
            });
        };
    })

    .controller('FicaProofOfAddressCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {type: "proof_of_address"};

        $scope.submit = function (type) {
            $state.go('app.fica_camera_upload', {
                type: $scope.data.type
            });
        };
    })

    .controller('FicaCameraUploadCtrl', function ($scope, Upload, Auth, API, $ionicLoading, $ionicPopup) {
        'use strict';
        $scope.submit = function () {
            //console.log($scope.form.file.$valid);
            if ($scope.form.file.$valid && $scope.file) {
                $scope.upload($scope.file);
            }
        };

        // upload on file select or drop
        $scope.upload = function (file) {
            $ionicLoading.show({
                template: 'Uploading...'
            });
            Upload.upload({
                url: API + "/users/document/",
                data: {file: file, document_category: "", document_type: ""},
                headers: {'Authorization': 'JWT ' + Auth.getToken()}
            }).then(function (resp) {
                $ionicLoading.hide();
                $ionicPopup.alert({title: "Success", template: "Upload complete."});
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                $ionicLoading.hide();
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };
    });
