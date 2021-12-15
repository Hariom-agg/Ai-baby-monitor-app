
 video = "";
 ses = "";
 object = [];
alert_sound = "";

function preload()
{
    alert_sound = loadSound("alarm.mp3");
}


function setup()
{
  canvas = createCanvas(380,380);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  video.size(380,380);
  objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
  document.getElementById("status").innerHTML = "Status = Detecting Objects";

}

function modelLoaded()
{
  console.log("MODELLOADED!")
  ses = "true";
  
}

function gotResults(error,results)
{
   if(error)
   {
      console.log(error);
   }
      console.log(results);
      object = results;
}

function draw()
{
 image(video , 0, 0, 380 , 380);

 if(ses != "")
 {
objectDetector.detect(video , gotResults);
    for( i= 0; i < object.length; i++)
    {
       document.getElementById("status").innerHTML = "Status: Object Detected"
        fill("red");
        textSize(20);
        text(object[i].label ,object[i].x + 15 , object[i].y + 15);
        noFill();
        stroke("red");
        rect(object[i].x , object[i].y , object[i].width , object[i].height);

    }
 }

 if( object[i].label == person )
 {
     document.getElementById("found").innerHTML = "baby found";
     alert_sound.stop();
 }
else
{
  document.getElementById("found").innerHTML = "baby not found";
  alert_sound.play();
}
    
if(object[i].length < 0)
{
  document.getElementById("found").innerHTML = "baby not found";
  alert_sound.play();
}
 
}

