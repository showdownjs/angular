describe('Showdown', function () {
  var expect = window.expect,
    showdownProvider,
    markdown = '# Title',
    parsedHtml = '<h1 id="title">Title</h1>',
    parsedHtmlSafe = '<h1>Title</h1>';

  beforeEach(function () {

    module('ng-showdown', function ($showdownProvider) {
      showdownProvider = $showdownProvider;
    });

  });

  describe('markdownToHtml directive', function () {
    var scope,
      compile,
      element,
      validTemplate = '<div sd-model-to-html="someData"></div>';

    beforeEach(function () {
      // Inject in angular constructs otherwise,
      //  you would need to inject these into each test
      inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        compile = $compile;
      });
    });

    // JavaScript
    it('should have expected isolated scope', function () {
      element = createDirective(markdown);
      var isolated = element.isolateScope();
      expect(isolated.model).to.be.equal(markdown);
    });

    it('should parse markdown', function () {
      element = createDirective(markdown);
      expect(element.html()).to.be.equal(parsedHtmlSafe);
    });

    function createDirective(data, template) {
      var elm;

      // Setup scope state
      scope.someData = data;

      // Create directive
      elm = compile(template || validTemplate)(scope);

      // Trigger watchers
      scope.$apply();

      // Return
      return elm;
    }
  });

  describe('Showdown Provider', function () {

    it('should set showdown config variables', function () {
      showdownProvider.setOption('foo', 'bar');
      expect(showdownProvider.getOption('foo')).to.be.equal('bar');
    });

    it('should strip html', function () {
      expect(showdownProvider.$get().stripHtml('<p>Foo bar</p>')).to.be.equal('Foo bar');
    });

    it('should parse markdown', function () {
      expect(showdownProvider.$get().makeHtml(markdown)).to.be.equal(parsedHtml);
    });

  });

  describe('strip filter', function () {
    var stripHtmlFilter;

    beforeEach(function () {
      inject(function ($filter) {
        stripHtmlFilter = $filter('stripHtml');
      });
    });

    it('should exist', function () {
      expect(!!stripHtmlFilter).to.be.equal(true);
    });

    //Not testing full functionality here, the showdown provider gets those tests
    it('should strip html', function () {
      expect(stripHtmlFilter('<p>Foo bar</p>')).to.be.equal('Foo bar');
    });

  });

});
