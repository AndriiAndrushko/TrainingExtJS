Ext.define('Application.view.main.SchoolTree', {
    extend: 'Ext.tree.Panel',
    xtype: 'main-schoolTree',
    title: 'School Tree',
    flex: 0.2,
    region: 'west',
    margin: '5 5 5 5', 
    listeners: {
        itemclick: 'changeScores'
    },
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
            },
        }
    }
});
