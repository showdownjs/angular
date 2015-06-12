;/*! ng-showdown 11-06-2015 */
(function (angular, showdown) {
  // Conditional load for NodeJS
  if (typeof require !== 'undefined') {
    angular = require('angular');
    showdown = require('showdown');
  }

  //Check if AngularJs and Showdown is defined and only load ng-Showdown if both are present
  if (typeof angular !== 'undefined' && typeof showdown !== 'undefined') {

    (function (module, showdown) {
      'use strict';

      module
        .provider('$showdown', provider)
        .directive('sdModelToHtml', ['$showdown', '$sanitize', markdownToHtmlDirective])
        .filter('sdStripHtml', stripHtmlFilter);

      /**
       * Angular Provider
       * Enables configuration of showdown via angular.config and Dependency Injection into controllers, views
       * directives, etc... This assures the directives and filters provided by the library itself stay consistent
       * with the user configurations.
       * If the user wants to use a different configuration in a determined context, he can use the "classic" Showdown
       * object instead.
       */
      function provider() {

        // Configuration parameters for Showdown
        var config = {
          extensions: [],
          stripHtml: true
        };

        /**
         * Sets a configuration option
         *
         * @param {string} key Config parameter key
         * @param {string} value Config parameter value
         */
        /* jshint validthis: true */
        this.setOption = function (key, value) {
          config[key] = value;

          return this;
        };

        /**
         * Gets the value of the configuration parameter specified by key
         *
         * @param {string} key The config parameter key
         * @returns {string|null} Returns the value of the config parameter. (or null if the config parameter is not set)
         */
        this.getOption = function (key) {
          if (config.hasOwnProperty(key)) {
            return config.key;
          } else {
            return null;
          }
        };

        /**
         * Loads a Showdown Extension
         *
         * @param {string} extensionName The name of the extension to load
         */
        this.loadExtension = function (extensionName) {
          config.extensions.push(extensionName);

          return this;
        };

        function SDObject() {
          var converter = new showdown.Converter(config);

          /**
           * Converts a markdown text into HTML
           *
           * @param {string} markdown The markdown string to be converted to HTML
           * @returns {string} The converted HTML
           */
          this.makeHtml = function (markdown) {
            return converter.makeHtml(markdown);
          };

          /**
           * Strips a text of it's HTML tags
           *
           * @param {string} text
           * @returns {string}
           */
          this.stripHtml = function (text) {
            return String(text).replace(/<[^>]+>/gm, '');
          };
        }

        // The object returned by service provider
        this.$get = function () {
          return new SDObject();
        };
      }

      /**
       * AngularJS Directive to Md to HTML transformation
       *
       * Usage example:
       * <div sd-model-to-html="markdownText" ></div>
       *
       * @param {showdown.Converter} $showdown
       * @param {ngSanitize} $sanitize
       * @returns {*}
       */
      function markdownToHtmlDirective($showdown, $sanitize) {

        var link = function (scope, element) {
          scope.$watch('model', function (newValue) {
            var val;
            if (typeof newValue === 'string') {
              val = $sanitize($showdown.makeHtml(newValue));
            } else {
              val = typeof newValue;
            }
            element.html(val);
          });
        };

        return {
          restrict: 'A',
          link: link,
          scope: {
            model: '=sdModelToHtml'
          }
        };
      }

      /**
       * AngularJS Filter to Strip HTML tags from text
       *
       * @returns {Function}
       */
      function stripHtmlFilter() {
        return function (text) {
          return String(text).replace(/<[^>]+>/gm, '');
        };
      }

    })(angular.module('showdown', ['ngSanitize']), showdown);

  } else {
    throw new Error('ng-showdown was not loaded because one of its dependencies (AngularJS or Showdown) was not met');
  }

})(angular, showdown);

//# sourceMappingURL=ng-showdown.js.map