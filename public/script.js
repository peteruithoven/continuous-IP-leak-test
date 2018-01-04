var list = document.getElementById('list');
var prevIP;
var ipFoundCounter;
var currIPElem;

setInterval(update, 500);

function update() {
  // using old school XMLHttpRequest for timeouts
  var req = new XMLHttpRequest();
  req.responseType = 'json';
  req.timeout = 500;
  req.open('GET', `api/ip?${(new Date()).getTime()}`);
  req.onload  = function() {
   var ip = req.response.ip;
   console.log('ip: ', ip);
   if (ip === prevIP) {
     ipFoundCounter++;
     updateListItem(currIPElem, `${ip} x ${ipFoundCounter}`);
   } else {
     ipFoundCounter = 1;
     prevIP = ip;
     currIPElem = addListItem(`${ip}`)
   }
  };
  req.send(null);
};

function addListItem(text) {
  var li = document.createElement('li');
  li.textContent = text;
  list.appendChild(li);
  return li;
}
function updateListItem(listItem, text) {
  listItem.textContent = text;
}
