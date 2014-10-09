/**
 * Created by sotiris on 8/10/2014.
 */


var app = angular.module('app', [
    'ngAnimate',
    'ngMaterial',
    'sotos-angular-material-gridview'
]);


/**
 * Run the angular
 */
app.run([function(){

}]);


/**
 * Boot the angular
 */
angular.element(window).ready(function() {
    angular.bootstrap(document, [ "app" ]);
});





app.controller('listCtrl',['$scope','$http', function ($scope,$http) {

    $scope.item={id:0};
    $scope.headers=[
        {id:'id',header:'id',show:true,flex:5},
        {id:'title',header:'Title',show:true,flex:30},
        {id:'subtitle',header:'SubTitle',show:true,flex:30},
        {id:'orderid',header:'Order',show:true},


    ];

    $scope.items=[];


angular.forEach([1,2,3,4,5],function(v,k,item){

    $scope.items.push({id:v,title:'title'+v,subtitle:'sub title'+k+v,orderid:v+1});
});



    $scope.addNew=function(item){
         item.id= $scope.items.length+1;
        $scope.items.push(item);
        $scope.item={id:0};
    };
    $scope.save=function(item){

        $scope.items[$scope.items.indexOf(item)]=item;
        $scope.item={id:0};
    };


$scope.onEditBtn=function(item){
$scope.item=item;
};

$scope.onDeleteBtn=function(item){
    $scope.items.splice($scope.items.indexOf(item),1);
};





//==============================================
    $scope.itemsReal = [];
    $scope.additemsReal = function() {
        var newWidth = 200 +  $scope.itemsReal.length;
        $scope.itemsReal.push({
            id: $scope.itemsReal.length+1,
            image: 'http://placekitten.com/' + newWidth + '/201',
            date:1288323623006+ ($scope.itemsReal.length*100000000),
            amount:$scope.itemsReal.length*568.36,
            icon:['sgv-edit','sgv-github','sgv-eye'][$scope.itemsReal.length % 3],
            title: ['More','felis','Lots of','Surplus'][$scope.itemsReal.length % 4] + ' ' +
                ['Sed', 'Pellentesque', 'adipiscing', 'Cutes'][$scope.itemsReal.length % 4],
            descr: ['Curabitur','Extra','malesuada of','Surplus'][$scope.itemsReal.length % 4] + ' ' +
                ['pretium', 'rhoncus', 'vestibulum', 'Cutes'][$scope.itemsReal.length % 4]
        });
    };

    for (var i=0; i<15; i++) {
        $scope.additemsReal();
    }

    $scope.headersReal=[
        {id:'id',header:'id',show:false,flex:5},
        {id:'id',header:'ID',show:true,flex:5,type:'number'},
        {id:'image',header:'Photo',show:true,flex:10,type:'image'},
        {id:'title',header:'Title',show:true,flex:30},
        {id:'date',header:'Date',show:true,type:'date'},
        {id:'icon',header:'ico',show:true,flex:5,type:'icon'},
        {id:'amount',header:'Cur',show:true,type:'currency'},
        {id:'descr',header:'Description',show:false},
    ];


//==============================================
    $scope.itemsParent = [];
    $scope.additemsParent = function(parent) {
        var newWidth = 200 +  $scope.itemsParent.length;

        $scope.itemsParent.push({
            id: $scope.itemsParent.length+1,
            parent_id:parent,
            title: ['More','felis','Lots of','Surplus'][$scope.itemsParent.length % 4] + ' ' +
                ['Sed', 'Pellentesque', 'adipiscing', 'Cutes'][$scope.itemsParent.length % 4],
            descr: ['Curabitur','Extra','malesuada of','Surplus'][$scope.itemsParent.length % 4] + ' ' +
                ['pretium', 'rhoncus', 'vestibulum', 'Cutes'][$scope.itemsParent.length % 4]
        });
    };

    for (var i=0; i<3; i++) {
        $scope.additemsParent(0);


    }
    for (var k=0; k<3; k++) {
        $scope.additemsParent(1);



    }
    for (var u=0; u<4; u++) {
        $scope.additemsParent(2);
        $scope.additemsParent(6);

    }
    for (var p=0; p<2; p++) {
        $scope.additemsParent(3);
        $scope.additemsParent(4);
        $scope.additemsParent(5);
        $scope.additemsParent(8);
    }



}]);

