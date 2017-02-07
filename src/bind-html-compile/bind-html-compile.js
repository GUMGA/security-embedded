const BindHtmlCompile = ($compile) => {
    return {
      restrict: 'A',
      link: (scope, element, attrs) => {
        
        scope.$watch(() => {
            return scope.$eval(attrs.bindHtmlCompile);
          }, (value) => {
            element.html(value && value.toString());
            var compileScope = scope;
            if (attrs.bindHtmlScope) {
                compileScope = scope.$eval(attrs.bindHtmlScope);
            }
            $compile(element.contents())(compileScope);
          });

      }
    }
};

BindHtmlCompile.$inject = ['$compile'];

export default BindHtmlCompile;
