function upgrade() {
    alert('Please use Google Chrome for best experience');
}
function SpeechRecognition(scope) {
    // When recognition produces result
    var interim_transcript = '';
    var final_transcript = '';
    if (!(window.webkitSpeechRecognition) && !(window.speechRecognition)) {
        upgrade();
    } else {
        var recognizing;
        function reset() {
            recognizing = false;
            speech.start();
        }
        var speech = new webkitSpeechRecognition() || speechRecognition();
        speech.continuous = true;
        speech.interimResults = true;
        speech.lang = 'en-US'; // check google web speech example source for more lanuages
        speech.start(); //enables recognition on default
        speech.onstart = function() {
            // When recognition begins
            recognizing = true;
        };
        speech.onresult = function(event) {
            scope.txtSearch=event.results[0][0].transcript;
            recognizing = false;
            speech.stop();
            // main for loop for final and interim results
            /*for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal ||interim_transcript!='') {
                    final_transcript += event.results[i][0].transcript;
                    scope.txtSearch=final_transcript;
                    recognizing = false;
                    speech.stop();
                    return;
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }*/
        };
        speech.onerror = function(event) {
            // Either 'No-speech' or 'Network connection error'
            console.error(event.error);
        };
        sr.onspeechend = function () {
            cope.txtSearch=event.results[0][0].transcript;
           speech.stop();
            return;
        };
        speech.onend = function() {
            // When recognition ends
            if(final_transcript!=''){
                scope.txtSearch=final_transcript;
                recognizing = false;
                return;
            }
            reset();
        };
    }
}
