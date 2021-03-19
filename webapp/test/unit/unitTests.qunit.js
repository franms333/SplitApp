/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"Ejercicio18/Ejercicio18/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
