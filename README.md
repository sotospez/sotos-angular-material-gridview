sotos-angular-material-gridview
==============================

angular directive for make lists with filters and order

###v0.0.1
```
list view
<sotos-list items="items" headers-names="headers" showdelete="true" showedit="true" on-edit="onEditBtn" on-delete="onDeleteBtn"></sotos-list>
tree list view is beta
<sotos-list-tree items="items" headers-names="headers" showdelete="true" showedit="true" on-edit="onEditBtn" on-delete="onDeleteBtn"></sotos-list-tree>
```


[Demos http://sotos.gr/demos/angular-material-gridview/ ](http://sotos.gr/demos/angular-material-gridview/)


###Bower Install
```
bower install sotos-angular-material-gridview
```



###Use
```
 <sotos-list items="items" headers-names="headers" showdelete="true" showedit="true" on-edit="onEditBtn" on-delete="onDeleteBtn"></sotos-list>
```


###set the module
`var app = angular.module('app',['sotos-angular-material-gridview']);`




##Options
```

    items="items" //items json require
    headers-names="headers" //headers json
    showdelete="true"
    showedit="true"
    on-edit="onEditBtn" //callback on btn click with the item
    on-delete="onDeleteBtn" //callback on btn click with the item

```