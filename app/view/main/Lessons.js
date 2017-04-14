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
					rootProperty: 'data',
					 keepRawData: true

					    }
					},
			autoLoad: true
			},
    xtype: 'main-lessons',
    title:'Lessons',
    buttons: [
    {
	    text:"Select All ",
	    handler: 'selsectAllButton',
	    flex: 0.1
	 },{
	    text:"Unselsect All",
	    handler: 'unSelsectAllButton',
	     	flex: 0.1
	},{
	    text:"Inverse",
	    handler: 'inverseSelections',
	     	flex: 0.1
	}],
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
    margin: '5 5 5 5',
    listeners: {
        itemclick: 'clickOnItem'
    },
    renderTo: Ext.getBody()
})