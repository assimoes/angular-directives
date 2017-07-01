(function () {
    'use strict';
    var app = angular.module('asv-directives', []);

    app.directive('fileUploader', function () {
        return {
            restrict: 'E',
            link: fileUploaderLink,
            scope: {
                accepts: "@accepts",
                postUrl: "@postUrl",
                fileIcon: "@fileIcon",
                colSize: "@colSize",
                maxSize: "@maxSize",
                mvcModel: "&"
            },
            template: '<div class="col-md-{{colSize}}">' +
                '<form enctype= "multipart/form-data" method= "post" > ' +
                '<input type="file" name="fileinputctl" onchange="angular.element(this).scope().changed(this)" />' +
                '<button class="btn" type="submit" ng-click="upload()" ng-disabled="!canUpload">Upload</button>' +
                '</form>' +
            '</div>'
        }
    });

    function fileUploaderLink(scope, elem, attrs) {

        scope.fileInput = undefined;
        scope.canUpload = false;

        var model = scope.mvcModel();

        scope.changed = function (fileInput) {
            scope.fileInput = fileInput;
            var fileSize = parseInt(fileInput.files[0].size);
            if (fileSize > scope.maxSize) scope.canUpload = false;
            if (fileSize <= scope.maxSize) scope.canUpload = true;
            scope.$apply();
        }

        scope.upload = function () {
            var data = new FormData();

            data.append("file-1", scope.fileInput.files[0]);
            data.append("model", JSON.stringify(model));

            $.ajax({
                type: 'POST',
                url: scope.postUrl,
                contentType: false,
                processData: false,
                data: data,
                success: function (res) {
                    // fazer algo com a mensagem de res. 
                    // Por exemplo lançar uma growl toast a indicar sucesso no upload.
                },
                error: function (xhr, status, p3, p4) {
                    var err = "Error " + status + " " + p3 + " " + p4;
                    if (xhr.responseText && xhr.responseText[0] === "{") {
                        err = JSON.parse(xhr.responseText).Message;
                        console.log(err);
                    }
                }
            });

        }
    };

})();