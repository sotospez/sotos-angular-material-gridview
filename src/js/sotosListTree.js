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
