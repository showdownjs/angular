ng-showdown
================

Angular integration for Showdown

## Usage

Make sure you've got ngSanatize installed and loaded into your applications modules.

Add showdown to your module load

**Example**:

``` js
var myApp = angular.module('myApp',  ['ngSanitize', 'showdown']);
```

Where you want to convert markdown to html use the sdModelToHtml directive like so:

``` html
<div data-sd-model-to-html="markdownText" ></div>
```

If you want to configure the showdown extensions you can do so in your controller using the `$showdown` provider like so:

``` js
myApp.controller('MyController', ['$showdown', function($showdown){
	$showdown.setOption('extensions', ['myExtension']);
});
```

*See [showdown documents](https://github.com/showdownjs/showdown) for full set of options*
