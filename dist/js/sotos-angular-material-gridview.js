/**
 * sotos-angular-material-gridview - angular directive gridview list of array items
 * @version v0.0.1
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
        "<div class=\"sotos-list\" layout=\"vertical\" >\r\n<div class=\"sotos-list-header\" layout=\"horizontal\"  layout-align=\"start end\">\r\n    <div class=\"header-text\" flex=\"{{  header.flex}}\"\r\n          ng-repeat=\"header in headers|filter:{show:true}\"\r\n          ng-click=\"orderByField(header.id)\">\r\n        {{ header.header }}\r\n        <i class=\"sgv-unsorted\" ng-show=\"header.id!=orderbyitem\"></i>\r\n        <i class=\"sgv-arrow-up\" ng-show=\"header.id==orderbyitem && reverse==true\"></i>\r\n        <i class=\"sgv-arrow-down\" ng-show=\"header.id==orderbyitem && reverse==false\"></i>\r\n    </div>\r\n    <div flex=\"20\" class=\"search-area\" layout=\"horizontal\" layout-align=\"center center\">\r\n        <!-- Single button -->\r\n        <div class=\"header-list-check btn-group\" >\r\n            <material-button  class=\"material-button-fab btn-list-check \" ng-click=\"dropOpen=!dropOpen\"><i class=\"sgv-eye\"></i></material-button>\r\n            <div class=\"dropdown material-whiteframe-z1\" role=\"menu\" layout=\"vertical\" ng-class=\"{open:dropOpen}\">\r\n                <div ng-repeat=\"header in headers\" >\r\n                    <material-checkbox ng-model=\"header.show\" aria-label=\"{{ header.header }}\">\r\n                        {{ header.header }}\r\n                    </material-checkbox>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <material-input-group class=\"input-group material-input-group-theme-green\">\r\n         <label>search.. <i class=\"sgv-search\"></i></label>\r\n        <material-input type=\"text\" ng-model=\"search\" ></material-input>\r\n    </material-input-group>\r\n    </div>\r\n</div>\r\n</div>\r\n<div class=\"sotos-list-items\" >\r\n<div  layout=\"vertical\"  >\r\n<div class=\"sotos-list-item animlist\"\r\n     ng-repeat=\"item in items| orderBy:orderbyitem:reverse  | filter:search\"\r\n     ng-class-odd=\"'odd'\"\r\n     ng-class-even=\"'even'\"\r\n     layout=\"horizontal\"\r\n     layout-align=\"start center\" >\r\n       <sotos-list-item  flex=\"{{  header.flex}}\" item=\"item\" ng-repeat=\"header in headers|filter:{show:true}\" name=\"header.id\" type=\"{{ header.type  }}\" >\r\n    </sotos-list-item>\r\n    <div flex=\"20\" class=\"buttons\" layout=\"horizontal\"  layout-align=\"end\">\r\n        <material-button flex=\"50\" ng-show=\"showDelete\" ng-click=\"delete(item)\"  class=\"material-button-raised material-theme-red\"><i class=\"sgv-delete\"></i> Delete</material-button>\r\n        <material-button flex=\"50\" ng-show=\"showEdit\" ng-click=\"edit(item)\" class=\"   material-button-raised material-theme-light-blue\"><i class=\"sgv-edit\"></i> Edit</material-button>\r\n    </div>\r\n</div>\r\n</div>\r\n</div>");
}]);
angular.module('sotos-angular-material-gridview').run(['$templateCache', function($templateCache) {
    $templateCache.put('templates/sotosListTree.html',
        "<div class=\"sotos-list\" layout=\"vertical\" >\r\n    <div class=\"sotos-list-header\" layout=\"horizontal\"  layout-align=\"start end\">\r\n        <div class=\"header-text\" flex=\"{{  header.flex}}\"\r\n             ng-repeat=\"header in headers|filter:{show:true}\"\r\n             ng-click=\"orderByField(header.id)\">\r\n            {{ header.header }}\r\n            <i class=\"sgv-unsorted\" ng-show=\"header.id!=orderbyitem\"></i>\r\n            <i class=\"sgv-arrow-up\" ng-show=\"header.id==orderbyitem && reverse==true\"></i>\r\n            <i class=\"sgv-arrow-down\" ng-show=\"header.id==orderbyitem && reverse==false\"></i>\r\n        </div>\r\n        <div flex=\"20\" class=\"search-area\" layout=\"horizontal\" layout-align=\"center center\">\r\n            <!-- Single button -->\r\n            <div class=\"header-list-check btn-group\" >\r\n                <material-button  class=\"material-button-fab btn-list-check \" ng-click=\"dropOpen=!dropOpen\"><i class=\"sgv-eye\"></i></material-button>\r\n                <div class=\"dropdown material-whiteframe-z1\" role=\"menu\" layout=\"vertical\" ng-class=\"{open:dropOpen}\">\r\n                    <div ng-repeat=\"header in headers\" >\r\n                        <material-checkbox ng-model=\"header.show\" aria-label=\"{{ header.header }}\">\r\n                            {{ header.header }}\r\n                        </material-checkbox>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <material-input-group class=\"input-group material-input-group-theme-green\">\r\n                <label>search.. <i class=\"sgv-search\"></i></label>\r\n                <material-input type=\"text\" ng-model=\"search\" ></material-input>\r\n            </material-input-group>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"sotos-list-items\" >\r\n    <div  layout=\"vertical\" sotos-list-tree-item></div>\r\n</div>");
}]);
angular.module('sotos-angular-material-gridview').run(['$templateCache', function($templateCache) {
    $templateCache.put('templates/sotosListTreeItem.html',
        "    <div  class=\"sotos-list-item animlist \" ng-init=\"level=level+1\"\r\n          ng-repeat=\"item in items | orderBy:orderbyitem:reverse  | filter:{parent_id:parent} | filter:search\">\r\n<div  class=\"row-item level-{{ level }}\" layout=\"horizontal\" layout-align=\"start center\" >\r\n    <sotos-list-item  flex=\"{{  header.flex}}\" item=\"item\" ng-repeat=\"header in headers|filter:{show:true}\" name=\"header.id\">\r\n    </sotos-list-item>\r\n\r\n    <div ng-init=\"parent=item.id\" flex=\"20\" class=\" buttons\" layout=\"horizontal\"  layout-align=\"end\">\r\n        <material-button flex=\"50\" ng-show=\"showDelete\" ng-click=\"delete(item)\"  class=\"material-button-raised material-theme-red\"><i class=\"sgv-delete\"></i> Delete</material-button>\r\n        <material-button flex=\"50\" ng-show=\"showEdit\" ng-click=\"edit(item)\" class=\"material-button-raised material-theme-light-blue\"><i class=\"sgv-edit\"></i> Edit</material-button>\r\n    </div>\r\n\r\n\r\n</div >\r\n\r\n        <div class=\"child\" ng-include=\"'templates/sotosListTreeItem.html'\"></div>\r\n\r\n</div>\r\n");
}]);