const text = document.getElementById("text");
const originalText = text.innerText;
let newText = ""
for (i = 0; i < originalText.length; i++)
{
    newText += `<span data-num="${i}" data-name="span">${originalText[i]}</span>`
}
text.innerHTML = newText
const div = document.getElementById("text_div");

const player = document.getElementById('player');

/*const start = document.getElementById("start");


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


div.addEventListener("click", function(evt) {
    const bcr = this.getBoundingClientRect();
    const percent_clicked_width = (evt.clientX - bcr.left) / bcr.width;
    const percent_clicked_height = ((evt.clientY - bcr.top) - 22)/ (bcr.height - 44);
    console.log(Math.round((bcr.height - 43) / 37.685))
    console.log(percent_clicked_height)
    player.currentTime = percent_clicked_width * player.duration;
    console.log("clicked");
    if (player.paused)
    {
        player.play();
    }
    else
    {
        player.pause()
    }
    
    console.log(player.paused)
});
*/
let firstClick = true;
document.addEventListener("click", function(evt){
    //player.play();
    if (evt.target.dataset.name === "span")
    {
        player.play();
        if (firstClick)
        {
            setTimeout(function(){
                player.currentTime = (evt.target.dataset.num  / originalText.length)* player.duration;
            } , 500)
            
        }
        else
        {
            player.currentTime = (evt.target.dataset.num  / originalText.length)* player.duration;
        }
        firstClick = false;
    }
})

setInterval(function(){
    const sectionPlayed = Math.round((player.currentTime / player.duration) * originalText.length)
    for (i=0; i < originalText.length; i++)
    {
        if (i < sectionPlayed)
        {
            text.children[i].classList.add("color")
        }
        else
        {
            text.children[i].classList.remove("color")
        }
    }
}, 1);