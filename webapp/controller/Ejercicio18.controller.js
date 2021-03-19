sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "Ejercicio18/Ejercicio18/util/Services",
        "sap/base/Log"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller,JSONModel, Services, Log) {
		"use strict";

		return Controller.extend("Ejercicio18.Ejercicio18.controller.Ejercicio18", {
			onInit: function () {

                this.loadModelProduct();
                this.getOwnerComponent().getRouter().getRoute("RouteEjercicio18").attachPatternMatched(this._onRouteMatched, this);
            },

            loadModelProduct: async function(){
                const oResponse = await Services.getLocalJSON('Productos.json');
                const oDataProduct = oResponse[0];
                var oModelProduct = new JSONModel();
                oModelProduct.setData(oDataProduct);
                this.getOwnerComponent().setModel(oModelProduct, "ProductosJSON");

                var oProductoSeleccionado = oModelProduct.getProperty("/value/0");
                let productModel = new JSONModel();
                productModel.setData(oProductoSeleccionado);
                this.getOwnerComponent().setModel(productModel, "ProductoSeleccionadoJSON");
            },
            _onRouteMatched: function() {

                    this.getOwnerComponent().getRouter().navTo("RouteDetailView1");
                
            /*
            * Navigate to the first item by default only on desktop and tablet (but not phone).
            * Note that item selection is not handled as it is
            * out of scope of this sample
            */
            },

            onListItemPress: function (oEvent) {
            
            var oItem = oEvent.getSource();
            var oBindingContext = oItem.getBindingContext("ProductosJSON");
            var oModel = this.getOwnerComponent().getModel("ProductosJSON");
            var oProductoSeleccionado = oModel.getProperty(oBindingContext.getPath());
            
            let oModelProduct = this.getOwnerComponent().getModel("ProductoSeleccionadoJSON");
            oModelProduct.setData(oProductoSeleccionado);

            console.log(oProductoSeleccionado.codigo_producto);
            console.log(oBindingContext);
        },
        

        getSplitAppObj: function () {
			var result = this.byId("app");
			if (!result) {
				Log.info("SplitApp object can't be found");
			}
			return result;
		}
        
		});
	});