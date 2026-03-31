

let TOKEN = '4d2e59443e9e64c89c5725f14c042fbd3D91C94CFE94B0EDAD6EAEC75C6C8F4A428020D3';
let data=[];
let ftp_id = 601000441; 
let id = [];
let redy =true




// execute when DOM ready
$(document).ready(function () {


  setupAutocomplete(myDataArray);
  const video = document.getElementById('qr-video');
  const camQrResult = document.getElementById('cam-qr-result');


  wialon.core.Session.getInstance().initSession("https://hst-api.wialon.eu",null,0x800);
  wialon.core.Session.getInstance().loginToken(TOKEN, "", 
    function (code) { 
      if (code){ camQrResult = wialon.core.Errors.getErrorText(code); return; }
      camQrResult.textContent = 'Зєднання з ККЗ - успішно';     
    });






  function setResult(label, result) {
    label.textContent = result.data;
    let dubl=false;
    for(let i = 0; i < id.length; i++){
        if(id[i]==result.data+inputValue){
          dubl=true;
          break;
        }
    }
    if(redy){
      if(dubl){
      redy=false;
      id.push(result.data+inputValue)
      document.body.style.backgroundColor = "#baffeeff";
      setTimeout(function(){
        document.body.style.backgroundColor = '#0a0a0b'; 
        redy=true;
      },1000);
      }else{

//         html2canvas(document.getElementById('video-container')).then(canvas => {
//     // Открывает изображение в новой вкладке или инициирует его скачивание
//     const link = document.createElement('a');
//     link.download = result.data+'.png'; // Имя файла
//     link.href = canvas.toDataURL();
//     link.click();
// });
      redy=false;
      let d = Date.now();
      let inputValue = $("#user-input").val().trim();
      let t = "||"+d+"|"+result.data+"|"+inputValue+"\n";

     let remotee= wialon.core.Remote.getInstance(); 
     remotee.remoteCall('file/write',{'itemId':ftp_id,'storageType':1,'path':'//sklad/Options.txt',"content":t,"writeType":1,'contentType':0},function (error) {
     if (error) {
     redy=true;
     return;
      }else{
      redy=true;
      id.push(result.data+inputValue)
      document.body.style.backgroundColor = "#00fa21ff";
      audio.play();
       setTimeout(function(){
        document.body.style.backgroundColor = '#0a0a0b'; 
      },1000);
      return;
     }
      }); 
      }
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


function write_jurnal(id,file_name,content,calbek){
  let remotee= wialon.core.Remote.getInstance(); 
  remotee.remoteCall('file/write',{'itemId':id,'storageType':1,'path':'//sklad/'+file_name,"content":content,"writeType":1,'contentType':0},function (error) {
    if (error) {
    return;
    }else{
    calbek();
    return;
   }
}); 
}



$('#mic-btn').click(function() { 
  recognizer.start();
});

var recognizer = new webkitSpeechRecognition();

// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
recognizer.interimResults = false;
recognizer.maxAlternatives = 1;

// Какой язык будем распознавать?
recognizer.lang = "uk-UA";

// Используем колбек для обработки результатов
recognizer.onresult = function (event) {
  var result = event.results[event.resultIndex];
  if (result.isFinal) {
    let res0 = result[0].transcript.replace(/[^а-щА-ЩЬьЮюЯяЇїІіЄєҐґ0-9\s]/g, '');
    res0 = res0.trim(); 
   $("#user-input").val(res0);
   $input[0].dispatchEvent(new Event('input', { bubbles: true }));

  } 
};


const myDataArray = ["Бор", "Карбомід", "Твікс", "Гліфасан", "Райндап"];

// Функция инициализации списка
function setupAutocomplete(items) {
    const datalist = $('#data-presets');
    datalist.empty(); // Очищаем старое
    
    items.forEach(item => {
        // Создаем элемент <option> для каждого пункта
        datalist.append($('<option>').val(item));
    });
}

