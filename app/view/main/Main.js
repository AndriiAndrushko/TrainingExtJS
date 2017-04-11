/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Application.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Application.view.main.MainController',
        'Application.view.main.MainModel',
        'Application.view.main.SchoolTree',
        'Application.view.main.Lessons'
    ],

    controller: 'main',
    viewModel: 'main',

    layout: 'border',
   
    items: [{
        xtype: 'main-schoolTree'
    },
        {
        xtype: 'main-lessons'
    }]
});
