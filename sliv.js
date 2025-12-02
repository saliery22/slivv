

let TOKEN = '4d2e59443e9e64c89c5725f14c042fbd3D91C94CFE94B0EDAD6EAEC75C6C8F4A428020D3';
let data=[];
let ftp_id = 601000441; 
let id = [];
let redy =true




// execute when DOM ready
$(document).ready(function () {


  const video = document.getElementById('qr-video');
  const camQrResult = document.getElementById('cam-qr-result');


  wialon.core.Session.getInstance().initSession("https://hst-api.wialon.eu",null,0x800);
  wialon.core.Session.getInstance().loginToken(TOKEN, "", 
    function (code) { 
      if (code){ camQrResult = wialon.core.Errors.getErrorText(code); return; }
      camQrResult = 'Зеднання з ККЗ - успішно';
    });






  function setResult(label, result) {
    label.textContent = result.data;
    let dubl=false;
    for(let i = 0; i < id.length; i++){
        if(id[i]==result.data){
          dubl=true;
          break;
        }
    }
    if(redy && dubl==false){
      redy=false;
      id.push(result.data)
      document.body.style.backgroundColor = "#90EE90";
      audio.play();
      setTimeout(function(){document.body.style.backgroundColor = 'white'; redy=true},1000);
    }

  // let d = Date.now();
  // let t = result.data;
  // let remotee= wialon.core.Remote.getInstance(); 
  // remotee.remoteCall('file/write',{'itemId':ftp_id,'storageType':1,'path':'//sklad/util.txt',"content":bufer,"writeType":1,'contentType':0},function (error,data) {
  //   if (error) {
  //     label.textContent = wialon.core.Errors.getErrorText(error);
  //   }else{
  //     document.body.style.backgroundColor = "#90EE90";
  //     msg('відправлено в журнал');
  //   }
  //   });
    
 


}

  const scanner = new QrScanner(video, result => setResult(camQrResult, result), {
    onDecodeError: error => {
       console.log(error);
    },
    highlightScanRegion: true,
    highlightCodeOutline: true,
});

scanner.start();


  });


