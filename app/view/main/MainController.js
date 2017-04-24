/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Application.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

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
                       return
                   }
            } 
    },

    selectAllButton: function(){
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

    inverseSelectionsButton: function(){
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

    editButton: function(){
        var selectedItem = this.getView().query('main-schoolTree')[0].getSelectionModel().selected.items[0].data;
        var schoolTree = this.getView().query('main-schoolTree')[0];
        var temprotaryObj = {};
        var editForm = Ext.create('Ext.window.Window',{
                title: 'Edit User Form',
                height: '400px',
                width: 400,
                layout: 'fit',
                bodyPadding: 20,
                items: [{
                    extend: 'Ext.form.FormPanel',
                    xtype: 'form',
                    items:[
                            {   
                                id: 'firstName',
                                xtype:'textfield', 
                                fieldLabel: 'First Name',
                                value: selectedItem.firstName,
                                validator : function(firstName){
                                    if(firstName.length>2){
                                        return true
                                    }else{
                                        return 'Type your fuckin Name!'
                                    }
                                }                               
                            },{  
                                xtype:'textfield',
                                id: 'lastName',
                                fieldLabel: 'Last Name',
                                value: selectedItem.lastName,
                                validator : function(lastName){
                                    if(lastName.length>2){
                                        return true
                                    }else{
                                        return '"'+lastName+'"' + '- what? Are you stupid? Too short'
                                    }
                                }

                            },{  
                                id: 'email',
                                xtype:'textfield',
                                vtype: 'email',
                                allowBlank: false,
                                fieldLabel: 'Email',
                                value: selectedItem.email

                            },{   
                                id: 'age',
                                xtype:'numberfield',
                                fieldLabel: 'Age',
                                value: selectedItem.age,
                                validator : function(age){
                                    if((Math.round(age) == age) && age>1 ){
                                        return true
                                    }else{
                                        return 'Oh God, type real age!'
                                    }
                                }

                            },{   
                                id: 'birthDay',
                                xtype:'datefield',
                                fieldLabel: 'Birthday',
                                value: selectedItem.birthDay,
                                maxValue : new Date(),
                                validator : function(birthday){                        
                                    var choosenDate = new Date(JSON.stringify(birthday)).toLocaleDateString();
                                    if(choosenDate === new Date().toLocaleDateString()){
                                        return 'Wrong!' 
                                    }else{
                                        return true
                                    }
                                }
                            },{   
                                id: 'phone',
                                xtype:'textfield', 
                                fieldLabel: 'Phone',
                                value: selectedItem.phone,
                                regex: /^\d{3}-\d{3}-\d{4}$/,
                                allowBlank: false                             
                            }
                        ]
                        }],      
                buttons: [{
                            text: 'save',
                            handler: function(button){
                                var formFields =  button.up().up().down('form').getForm().getFields();
                                var userToEdit = schoolTree.getStore().data.find('userID',selectedItem.userID).data;
                                userToEdit.firstName = formFields.get('firstName').value;
                                userToEdit.lastName = formFields.get('lastName').value;
                                userToEdit.email = formFields.get('email').value;
                                userToEdit.age = formFields.get('age').value;
                                userToEdit.text = formFields.get('firstName').value + ' ' + formFields.get('lastName').value;
                                userToEdit.birthDay = formFields.get('birthDay').value;
                                schoolTree.getView().refresh(); 
                                editForm.close();
                            } 
                        },{
                            text: 'cancel',
                            handler: function(button){
                                editForm.close()
                            } 
                        }]        
            });
    editForm.show()
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
            this.getView().query('main-lessons')[0].getStore().filter('userID',userID);
            }
           
        }
 

  });
