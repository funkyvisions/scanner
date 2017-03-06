var div = document.createElement("div");

function log(text) {

    div.innerHTML = text;
    div.style.width = "100%";
    document.getElementById("log").appendChild(div);
}

function clear() {

    div.innerHTML = "";
}

function show(code) {

    log(code);

    setTimeout(function() {
        clear();
        mwbScanner.resumeScanning();
    }, 3000);
}

var app = {

    initialize: function() {

        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {

        var cc = mwbScanner.getConstants();

        var settings = [
            {"method": "MWBcloseScannerOnDecode", value: [false]},
            {"method": "MWBsetActiveCodes", "value": [cc.MWB_CODE_MASK_128 | cc.MWB_CODE_MASK_EANUPC]},
            {"method": "MWBsetScanningRect", "value": [cc.MWB_CODE_MASK_128, 0, 10, 100, 10]},
            {"method": "MWBsetScanningRect", "value": [cc.MWB_CODE_MASK_EANUPC, 0, 10, 100, 10]}
        ];

        mwbScanner.loadSettings(settings).catch(function(reason) {

            log(reason);
        });

        mwbScanner.startScanning(function(result) {

            show(result.code);

        }, 0, 10, 100, 20);

        // THIS DOESN'T WORK FOR ME (uncomment above and enable this)

        //mwbScanner.startScanning(0, 10, 100, 20).then(function(result) {
        //
        //    show(result.code);
        //});
    }
};
