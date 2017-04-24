Ext.define('Application.view.main.SchoolTree', {
    extend: 'Ext.tree.Panel',
    xtype: 'main-schoolTree',
    title: 'School Tree',
    flex: 0.2,
    region: 'west',
    margin: '5 5 5 5', 
    listeners: {
        itemclick: 'onNameClick',
        itemdblclick: function(main, record) {
            var scores = main.up().up().down('main-lessons').getStore().data.items;
            var template = '';
            var name = record.data.firstName + ' ' + record.data.lastName;
            scores.forEach(function(item){
                
                template+= '<div class="subject-box"> <span>'+item.data.lessons+'<br>'+ item.data.score+ '</span></div>'
            });          
            var freshWindow =  Ext.create('Ext.window.Window',{
                    extend : 'Ext.panel.Panel',
                    title:'Lessons/Scores of '+ name,
                    layout:'card',
                    region: 'center',
                    margin: '5 5 5 5', 
                    width: '100%',
                    height: '100%',
                    draggable: false,
                    items: [{
                        xtype: 'panel',
                        title: false,
                        type: 'vbox',
                        html: `<div id="dragdrag" class="default-position-row"> <h2>Default container</h2>`+template+`</div>
                               <div class="moving-position-row"> <h2>To drop container</h2> </div>`,
                        margin: '5 5 5 5',
                        flex: 0.5,
                        region: 'west'
                    }],
                    tbar:[{
                        xtype: 'button',
                        text: 'Back',
                        handler: function(){
                            freshWindow.close()

                        }
                    }],
                });

                freshWindow.show()
            var tables = Ext.get('dragdrag').select('div');
            Ext.each(tables.elements, function(el) {
                var dd = Ext.create('Ext.dd.DD', el, 'dragdragDDGroup', {
                    isTarget: false,
                    ignoreSelf: false
                });
                 Ext.apply(dd);
            });
        }
    },
     buttons: [
    {
        text:"Edit ",
        handler: 'editButton',
        width: '150px',
        region: 'east'

     }],

    editing:true,
    store: {

            root: {
            text: 'School',
            expanded: true,
            expandable: false

    },
            proxy: {
            type: 'ajax',
            url : 'resources/school.json',
            reader: {
                type: 'json'
            }
        }
    }
});
