/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Application.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    onConfirm: function (choice) {
        if (choice === 'yes') {
        }
    },

    init :function(){
         Ext.state.Manager.setProvider(new Ext.state.CookieProvider());        
        this.getView().query('main-lessons')[0].getStore().filter('userID', 'user1');  
        var schoolTree = this.getView().query('main-schoolTree')[0];
        var lessonsGrid = this.getView().query('main-lessons')[0];
            lessonsGrid.getSelectionModel().selectionMode = "MULTI";
            lessonsGrid.store.load(function(records, operation, success){
                schoolTree.getSelectionModel().select(Ext.state.Manager.get('selectedItems.schoolTree'),true);// select first Element in tree
                Ext.state.Manager.get('selectedItems.lessonsGrid').forEach(function(elem){
                    lessonsGrid.getSelectionModel().select(elem, true);

                })
        })
    },

    storeGridMarks: function(){
            var lessonsGrid = this.getView().query('main-lessons')[0];
            var quantityofElements = lessonsGrid.getSelectionModel().getStore().getCount();

            var selectedItemsArray=[];
            for (var i=0; i<=quantityofElements; i++){
                 var isSelected = lessonsGrid.getSelectionModel().isSelected(i);
                 if(isSelected==true){
                       selectedItemsArray.push(i);
                   }
            }
            Ext.state.Manager.set('selectedItems.lessonsGrid', selectedItemsArray);
    },

     storeTreeMark: function(){
        var schoolTree = this.getView().query('main-schoolTree')[0];
            var quantityofElements = schoolTree.getSelectionModel().getStore().getCount();
            for (var i=0; i<=quantityofElements; i++){
                 var isSelected = schoolTree.getSelectionModel().isSelected(i);
                 if(isSelected==true){
                       Ext.state.Manager.set('selectedItems.schoolTree', i);
                       // console.log('catch item');
                       return
                   }
            } 
    },

    selsectAllButton: function(){
        var lessonsGrid = this.getView().query('main-lessons')[0];
        lessonsGrid.selModel.selectionMode = "MULTI";
        lessonsGrid.getSelectionModel().selectAll(true);
        this.storeGridMarks();
    },

    unSelsectAllButton: function(){
        var lessonsGrid = this.getView().query('main-lessons')[0];
            lessonsGrid.getSelectionModel().deselectAll(true);
        this.storeGridMarks()
    },

    inverseSelections: function(){
        var lessonsGrid = this.getView().query('main-lessons')[0];
        var quantityofElements = lessonsGrid.getSelectionModel().getStore().getCount();
        for (var i=0; i<=quantityofElements; i++){
                var isSelected = lessonsGrid.getSelectionModel().isSelected(i);
                if(isSelected==true){
                    lessonsGrid.getSelectionModel().deselect(i, true); 
                }else if(isSelected==false){
                    lessonsGrid.getSelectionModel().select(i, true)
                }
        }
        this.storeGridMarks()
    },

    clickOnLesson: function () {
       this.storeGridMarks()
    },

    onNameClick: function(record, node){
        var userID = node.data.userID;
        var isLeaf =node.isLeaf();
        if(isLeaf){
            var lessonsGrid = this.getView().query('main-lessons')[0];
            lessonsGrid.store.load(function(records, operation, success){
                    lessonsGrid.getSelectionModel().select(0, true);
                })
            this.storeTreeMark();
            }
        }

  });
