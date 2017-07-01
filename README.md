# angular-directives

## Example

Add the `asv-directives` module as a dependency to your main module definition

`index.html`

```
(function () {
    'use strict';
    var app = angular.module('app', ['asv-directives']);

})();
```

Add a reference to the `asv-directives.js` script file below your angular app js file reference.

```
<html>
  <head>
...
    <script src="path/to/yourAngularApp.js" type="text/javascript"></script>
    <script src="path/to/asv-directives.js" type="text/javascript"></script>
...
  </head>
  <body>...</body>
</html>
```

Use it.

```

<file-uploader accepts="*.*" post-url="/controller/UploadAction" file-icon="file.ico" col-size="12" max-size="10000000"></file-uploader>

```
