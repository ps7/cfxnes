app = angular.module "nescoffee", [ "ui.router", "ui.bootstrap" ]

app.factory "emulator", -> new NESCoffee

app.config ($stateProvider, $urlRouterProvider, $tooltipProvider) ->
    $stateProvider
        .state "emulator",
            url: "/"
            views:
                "header":
                    templateUrl: "views/toolbar.html"
                    controller: "EmulatorController"
                "content":
                    templateUrl: "views/emulator.html"
                    controller: "EmulatorController"
             controller: "EmulatorController"
        .state "library",
            url: "/library"
            views:
                "content":
                    templateUrl: "views/library.html"
        .state "config",
            url: "/config"
            views:
                "content":
                    templateUrl: "views/config.html"
        .state "about",
            url: "/about"
            views:
                "content":
                    templateUrl: "views/about.html"

    $urlRouterProvider.otherwise "/"

    $tooltipProvider.options
        placement: "bottom"
        animation: false
        appendToBody: true

app.run ($rootScope, $state, emulator) ->
    $rootScope.$on "$viewContentLoaded", ->
        if $state.is "emulator"
            canvas = document.getElementById "emulator-canvas"
            emulator.setCanvas canvas if canvas
            emulator.step()
        else
            emulator.stop()