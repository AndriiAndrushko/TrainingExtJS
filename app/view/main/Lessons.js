Ext.define('LessonsModel', {
	
    extend: 'Ext.data.Model',

    fields: [ 'name', 'email', 'phone' ]

});

Ext.define('Application.view.main.Lessons', {
	extend: 'Ext.grid.Panel',
	store: {
            storeID: 'lessonsstore',
			model: 'LessonsModel',
			proxy:{
				type: 'ajax',
				url: 'resources/lessons.json',
				reader: {
					type: 'json',
					rootProperty: 'data.user2',
					 keepRawData: true

					    }
					},
			autoLoad: true
			},
    xtype: 'main-lessons',
    title:'Lessons',
    listeners: {
    	  itemclick: 'onTreeItemClick'
    },
	columns: [
		        {
		            text: 'Lessons',
		            dataIndex: 'lessons',
		            flex: .3
		        },
		        {
		            text: 'Score',  
		            dataIndex: 'score',
		            flex: .3
		           
		        },
		        {
		            text: 'Need Improvement',   
		            dataIndex: 'needImprovement',
		            flex: .3
		        }
		    ],
    region: 'center',
   	flex: 0.8,
    margin: '5 5 5 5',
    renderTo: Ext.getBody()
})