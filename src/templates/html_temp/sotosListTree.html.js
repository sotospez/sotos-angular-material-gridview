angular.module('sotos-angular-material-gridview').run(['$templateCache', function($templateCache) {
    $templateCache.put('templates/sotosListTree.html',
        "<div class=\"sotos-list\" layout=\"vertical\" >\r\n    <div class=\"sotos-list-header\" layout=\"horizontal\"  layout-align=\"start end\">\r\n        <div class=\"header-text\" flex=\"{{  header.flex}}\"\r\n             ng-repeat=\"header in headers|filter:{show:true}\"\r\n             ng-click=\"orderByField(header.id)\">\r\n            {{ header.header }}\r\n            <i class=\"sgv-unsorted\" ng-show=\"header.id!=orderbyitem\"></i>\r\n            <i class=\"sgv-arrow-up\" ng-show=\"header.id==orderbyitem && reverse==true\"></i>\r\n            <i class=\"sgv-arrow-down\" ng-show=\"header.id==orderbyitem && reverse==false\"></i>\r\n        </div>\r\n        <div flex=\"20\" class=\"search-area\" layout=\"horizontal\" layout-align=\"center center\">\r\n            <!-- Single button -->\r\n            <div class=\"header-list-check btn-group\" >\r\n                <material-button  class=\"material-button-fab btn-list-check \" ng-click=\"dropOpen=!dropOpen\"><i class=\"sgv-eye\"></i></material-button>\r\n                <div class=\"dropdown material-whiteframe-z1\" role=\"menu\" layout=\"vertical\" ng-class=\"{open:dropOpen}\">\r\n                    <div ng-repeat=\"header in headers\" >\r\n                        <material-checkbox ng-model=\"header.show\" aria-label=\"{{ header.header }}\">\r\n                            {{ header.header }}\r\n                        </material-checkbox>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <material-input-group class=\"input-group material-input-group-theme-green\">\r\n                <label>search.. <i class=\"sgv-search\"></i></label>\r\n                <material-input type=\"text\" ng-model=\"search\" ></material-input>\r\n            </material-input-group>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"sotos-list-items\" >\r\n    <div  layout=\"vertical\" sotos-list-tree-item></div>\r\n</div>");
}]);