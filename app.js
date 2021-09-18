const text = document.getElementById("text");


const player = document.getElementById('player');
const start = document.getElementById("start");

let recorder;
let started = false;
let chunks = [];

start.addEventListener("click", (() => {
    if (started) {
        start.innerText = "start";
        started = false;
        recorder.stop();
    }
    else {
        start.innerText = "stop";
        started = true;
        chunks = [];
        recorder.start();
    }
}));

const handleSuccess = function(stream) {
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => {
        chunks.push(e.data);
        if(recorder.state == 'inactive'){
            let blob = new Blob(chunks, {type: "audio/mpeg" });
            let url = URL.createObjectURL(blob);
            player.src = url;
            //sendData(blob)
        };
    };
};

//navigator.mediaDevices.getUserMedia({ audio: true, video: false })
//.then(handleSuccess);


text.addEventListener("click", function(evt) {
    const bcr = this.getBoundingClientRect();
    const percent_clicked = (evt.clientX - bcr.left) / bcr.width;
    player.currentTime = percent_clicked * player.duration;
    console.log(text.innerHTML);
    if (player.paused)
    {
        player.play();
    }
    else
    {
        player.pause()
    }
    player.play();
    console.log(player.paused)
});



setInterval(function(){
    const sectionPlayed = (player.currentTime / player.duration) * 100
    text.style.background = `linear-gradient(to right, red ${sectionPlayed}%, white ${sectionPlayed}%)`;
}, 1);