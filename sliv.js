

let TOKEN = '4d2e59443e9e64c89c5725f14c042fbdCA9CB0960781B27C57D1CB36A91BDACF276928E6';
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
      if (code){ camQrResult.textContent = wialon.core.Errors.getErrorText(code); return; }
      camQrResult.textContent = 'Зєднання з ККЗ - успішно'; 
    });






    function setResult(label, result) {
      // Если сканер уже в режиме ожидания (обработки), выходим
      if (!redy) return;
  
      let $input = $("#user-input");
      let inputValue = $input.val().trim();
      
      // Проверка на пустой инпут
      if (!inputValue) {
          $input.addClass('highlight');
          if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
          setTimeout(() => $input.removeClass('highlight'), 1000);
          return; 
      }
  
      let dubl = id.includes(result.data + inputValue);
  
      // ОСТАНАВЛИВАЕМ СКАНЕР (заморозка картинки)
      if (typeof qrScanner !== 'undefined') qrScanner.stop();
      redy = false; 
  
      label.textContent = result.data;
  
      if (dubl) {
          // Логика для дубликата
          document.body.style.backgroundColor = "#baffeeff";
          setTimeout(function() {
              document.body.style.backgroundColor = '#ffffff'; 
              redy = true;
              if (typeof qrScanner !== 'undefined') qrScanner.start(); // РАЗМОРОЗКА
          }, 500); // Увеличил время паузы для удобства
      } else {
          // Логика отправки в Wialon
          let d = Date.now();
          let t = "||" + d + "|" + result.data + "|" + inputValue + "\n";
  
          let remotee = wialon.core.Remote.getInstance(); 
          remotee.remoteCall('file/write', {
              'itemId': ftp_id, 
              'storageType': 1, 
              'path': '//sklad/Options.txt',
              "content": t, 
              "writeType": 1, 
              'contentType': 0
          }, function (error) {
              if (error) {
                  redy = true;
                  if (typeof qrScanner !== 'undefined') qrScanner.start();
                  return;
              } else {
                  id.push(result.data + inputValue);
                  document.body.style.backgroundColor = "#00fa21ff";
                  if (typeof audio !== 'undefined') audio.play();
                  
                  setTimeout(function() {
                      document.body.style.backgroundColor = '#ffffff';
                      redy = true;
                      if (typeof qrScanner !== 'undefined') qrScanner.start(); // РАЗМОРОЗКА
                      $input.val(""); // Очистка после успеха
                  }, 500);
              }
          }); 
      }
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

