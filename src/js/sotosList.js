


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
