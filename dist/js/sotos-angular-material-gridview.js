/**
 * sotos-angular-material-gridview - angular directive gridview list of array items 
 * @version v0.0.2
 * @link 
 * @license MIT
 */

angular.module('sotos-angular-material-gridview',['ngAnimate','ngMaterial']);





angular.module('sotos-angular-material-gridview').directive('sotosList',[function () {
    return {
        restrict: 'E',
        scope:{
            items:'=',
            headersNames:'=',
            onDelete:'=',
            onEdit:'='
        },
        templateUrl:'templates/sotosList.html',
        link: function(scope, elem, attrs) {


            scope.orderbyitem='id';
            scope.reverse=false;
            scope.items=scope.items||[];
            scope.showDelete=attrs.showdelete||false;
            scope.showEdit=attrs.showedit||false;
            scope.headers=scope.headersNames||[];


           if(scope.headers.length===0){

                var i=1;

            angular.forEach(scope.items[0],function(val,key){

            var modelItem ={};

            modelItem.id=key;
            modelItem.header=key.charAt(0).toUpperCase() + key.substr(1);
            if(i<4){
            modelItem.show=true;
            }else{
                modelItem.show=false;
            }
              scope.headers.push(modelItem);
              i++;

            });

           }

            scope.edit=function(item){
                scope.onEdit(item);

            };


            scope.delete=function(item){
                scope.onDelete (item);

            };

            scope.orderByField=function(id){

                scope.orderbyitem=id;
                scope.reverse= !scope.reverse;


            };


            }
    };
}]);


angular.module('sotos-angular-material-gridview').directive('sotosListItem',['$compile',function ($compile) {
    return {
        restrict: 'E',
        scope:{
            item:'=',
            name:'='
        },
        link : function(scope, elem, attrs) {
            var html ='{{ item.% }}';
            //if header type is image
            if(attrs.type==='image'){
                html='<img ng-src="{{ item.% }}">';
            }

            //if header type is number
            if(attrs.type==='number' ){
                html ='{{ item.% | number}}';
            }

            //if header type is currency
            if(attrs.type==='currency' ){
                html ='{{ item.% | currency }}';
            }

            //if header type is date
            if(attrs.type==='date' ){
                html ='{{ item.% | date }}';
            }

            //if header type is icon
            if(attrs.type==='icon' ){
                html='<i class="{{ item.% }}"></i>';
            }

            elem.html(html.replace('%',scope.name));
            $compile(elem.contents())(scope);
        }
    };
}]);

/**
 * Created by sotiris on 19/9/2014.
 */





angular.module('sotos-angular-material-gridview').directive('sotosListTree',[function () {
    return {
        restrict: 'E',
        scope:{
            items:'=',
            headersNames:'=',
            onDelete:'=',
            onEdit:'='
        },
        templateUrl:'templates/sotosListTree.html',
        link: function(scope, elem, attrs) {

            scope.level=0;
            scope.parent=0;
            scope.orderbyitem='id';
            scope.reverse=false;
            scope.items=scope.items||[];
            scope.showDelete=attrs.showdelete||false;
            scope.showEdit=attrs.showedit||false;
            scope.headers=scope.headersNames||[];


            if(scope.headers.length===0){

                var i=1;

                angular.forEach(scope.items[0],function(val,key){

                    var modelItem ={};

                    modelItem.id=key;
                    modelItem.header=key.charAt(0).toUpperCase() + key.substr(1);
                    if(i<4){
                        modelItem.show=true;
                    }else{
                        modelItem.show=false;
                    }
                    scope.headers.push(modelItem);
                    i++;

                });

            }


            scope.orderByField=function(id){


                scope.orderbyitem=id;
                scope.reverse= !scope.reverse;

            };

            scope.edit=function(item){
                scope.onEdit(item);

            };


            scope.delete=function(item){
                scope.onDelete (item);

            };


        }
    };
}]);


angular.module('sotos-angular-material-gridview').directive('sotosListTreeItem',[function () {
    return {
        restrict: 'E,A',
        templateUrl:'templates/sotosListTreeItem.html'
    };
}]);

angular.module('sotos-angular-material-gridview').run(['$templateCache', function($templateCache) {
    $templateCache.put('templates/sotosList.html',
        "<md-toolbar class=\"md-theme-light-blue \">\r\n    <div class=\"md-toolbar-tools  \" layout=\"horizontal\"  layout-align=\"start\">\r\n        <md-button flex=\"{{  header.flex}}\"   ng-repeat=\"header in headers|filter:{show:true}\"\r\n                   ng-click=\"orderByField(header.id)\">\r\n            {{ header.header }}\r\n            <i class=\"sgv-unsorted\" ng-show=\"header.id!=orderbyitem\"></i>\r\n            <i class=\"sgv-arrow-up\" ng-show=\"header.id==orderbyitem && reverse==true\"></i>\r\n            <i class=\"sgv-arrow-down\" ng-show=\"header.id==orderbyitem && reverse==false\"></i>\r\n        </md-button>\r\n        <div  flex=\"5\"  >\r\n            <md-button  class=\"md-fab md-primary list-btn-more\" ng-class=\"{isopen:listmenu}\" ng-click=\"listmenu=!listmenu\"><i class=\"sgv-eye\"></i></md-button>\r\n            <md-content ng-show=\"listmenu\" class=\" md-whiteframe-z2 list-menu \">\r\n                <md-list  role=\"menu\">\r\n                    <md-item   ng-repeat=\"header in headers\">\r\n                        <md-item-content layout=\"horizontal\" layout-align=\"start center\">\r\n                            <md-checkbox ng-model=\"header.show\" aria-label=\"{{ header.header }}\">\r\n                                {{ header.header }}\r\n                            </md-checkbox>\r\n                        </md-item-content>\r\n                    </md-item>\r\n                </md-list>\r\n            </md-content>\r\n        </div>\r\n        <div flex=\"10\" class=\"list-search \" >\r\n            <md-text-float  class=\" md-input-group-theme-light \" flex=\"5\" label=\"search..\" ng-model=\"search\" ></md-text-float>\r\n        </div>\r\n    </div>\r\n</md-toolbar>\r\n<md-content layout-padding>\r\n    <md-list>\r\n        <md-item  ng-repeat=\"item in items| orderBy:orderbyitem:reverse  | filter:search\" >\r\n            <md-item-content layout=\"horizontal\" layout-align=\"start center\"  ng-class-odd=\"'odd'\" ng-class-even=\"'even'\"  >\r\n                <sotos-list-item  flex=\"{{  header.flex}}\" item=\"item\" ng-repeat=\"header in headers|filter:{show:true}\" name=\"header.id\" type=\"{{ header.type  }}\" >\r\n                </sotos-list-item>\r\n                <div flex=\"15\" class=\" buttons\" layout=\"horizontal\"  layout-align=\"end\">\r\n                    <md-button flex ng-show=\"showEdit\"  ng-click=\"edit(item)\"   class=\"md-primary\"><i class=\"sgv-edit\"></i> Edit</md-button>\r\n                    <md-button flex  ng-show=\"showDelete\" ng-click=\"delete(item)\"    class=\" md-warn\"><i class=\"sgv-delete\"></i> Delete</md-button>\r\n                </div>\r\n            </md-item-content>\r\n            <md-divider ></md-divider>\r\n        </md-item>\r\n\r\n    </md-list>\r\n</md-content>\r\n\r\n\r\n\r\n");
}]);
angular.module('sotos-angular-material-gridview').run(['$templateCache', function($templateCache) {
    $templateCache.put('templates/sotosListTree.html',
        "<md-toolbar class=\"md-theme-light-blue \">\r\n    <div class=\"md-toolbar-tools  \" layout=\"horizontal\"  layout-align=\"start\">\r\n        <md-button flex=\"{{  header.flex}}\"   ng-repeat=\"header in headers|filter:{show:true}\"\r\n                   ng-click=\"orderByField(header.id)\">\r\n            {{ header.header }}\r\n            <i class=\"sgv-unsorted\" ng-show=\"header.id!=orderbyitem\"></i>\r\n            <i class=\"sgv-arrow-up\" ng-show=\"header.id==orderbyitem && reverse==true\"></i>\r\n            <i class=\"sgv-arrow-down\" ng-show=\"header.id==orderbyitem && reverse==false\"></i>\r\n        </md-button>\r\n        <div  flex=\"5\"  >\r\n            <md-button  class=\"md-fab md-primary list-btn-more\" ng-class=\"{isopen:listmenu}\" ng-click=\"listmenu=!listmenu\"><i class=\"sgv-eye\"></i></md-button>\r\n            <md-content ng-show=\"listmenu\" class=\"md-whiteframe-z2 list-menu \">\r\n                <md-list  role=\"menu\">\r\n                    <md-item   ng-repeat=\"header in headers\">\r\n                        <md-item-content layout=\"horizontal\" layout-align=\"start center\">\r\n                            <md-checkbox ng-model=\"header.show\" aria-label=\"{{ header.header }}\">\r\n                                {{ header.header }}\r\n                            </md-checkbox>\r\n                        </md-item-content>\r\n                    </md-item>\r\n                </md-list>\r\n            </md-content>\r\n        </div>\r\n        <div flex=\"10\" class=\"list-search \" >\r\n            <md-text-float  class=\" md-input-group-theme-light \" flex=\"5\" label=\"search..\" ng-model=\"search\" ></md-text-float>\r\n        </div>\r\n\r\n    </div>\r\n</md-toolbar>\r\n\r\n<md-content layout-padding >\r\n            <div sotos-list-tree-item>\r\n\r\n            </div>\r\n\r\n</md-content>\r\n\r\n\r\n");
}]);
angular.module('sotos-angular-material-gridview').run(['$templateCache', function($templateCache) {
    $templateCache.put('templates/sotosListTreeItem.html',
        "<md-list ng-init=\"level=level+1\">\r\n    <md-item  ng-repeat=\"item in items| orderBy:orderbyitem:reverse | filter:{parent_id:parent} | filter:search\"\r\n            >\r\n        <md-item-content class=\"row-item level-{{ level }}\"  layout=\"horizontal\" layout-align=\"start center\"  ng-class-odd=\"'odd'\" ng-class-even=\"'even'\"  >\r\n\r\n            <sotos-list-item  flex=\"{{  header.flex}}\" item=\"item\" ng-repeat=\"header in headers|filter:{show:true}\" name=\"header.id\" type=\"{{ header.type  }}\" >\r\n            </sotos-list-item>\r\n\r\n\r\n            <div flex=\"15\" class=\" buttons\" layout=\"horizontal\"  layout-align=\"end\" ng-init=\"parent=item.id\">\r\n                <md-button flex ng-show=\"showEdit\"  ng-click=\"edit(item)\"   class=\"md-primary\"><i class=\"sgv-edit\"></i> Edit</md-button>\r\n                <md-button flex  ng-show=\"showDelete\" ng-click=\"delete(item)\"    class=\" md-warn\"><i class=\"sgv-delete\"></i> Delete</md-button>\r\n            </div>\r\n\r\n        </md-item-content>\r\n\r\n        <md-divider ></md-divider>\r\n        <div  class=\"child\" ng-include=\"'templates/sotosListTreeItem.html'\"></div>\r\n    </md-item>\r\n\r\n\r\n</md-list>\r\n\r\n");
}]);