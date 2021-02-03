
var numero = 0;
var elemento = document.getElementsByClassName("photoswipe thumbnail__image");
var toma = [];
var i;
for (i = 0;
  i < elemento.length; i++) { toma.push(elemento[i].href) };
console.log(toma);

function download(content, fileName, contentType) {
  var numero = 0;
  var elemento = document.getElementsByClassName("photoswipe thumbnail__image");
  var toma = [];
  var i;
  for (i = 0;
    i < elemento.length;
    i++) { toma.push(elemento[i].href) };
  console.log(toma);
  var myJsonString = JSON.stringify(toma);
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName; a.click();
};
download(myJsonString, 'json.txt', 'text/plain');