(function(){
var data=[["HP", "hp", "#0096D6"], ["Dell", "dell", "#007DB8"], ["Lenovo", "lenovo", "#E2231A"], ["ASUS", "asus", "#000000"], ["Acer", "acer", "#83B81A"], ["Samsung", "samsung", "#1428A0"], ["MSI", "msi", "#FF0000"], ["Apple", "apple", "#555555"], ["Toshiba", "toshiba", "#FF0000"], ["Huawei", "huawei", "#FF0000"], ["LG", "lg", "#A50034"], ["Sony", "sony", "#000000"], ["Microsoft", "microsoft", "#5E5E5E"], ["Canon", "canon", "#CC0000"], ["Epson", "epson", "#003399"], ["Brother", "brother", "#00569D"], ["Xerox", "xerox", "#D12028"], ["Ricoh", "ricoh", "#C8102E"], ["Kyocera", "kyocera", "#DF0522"], ["Lexmark", "lexmark", "#6BB43D"], ["Seagate", "seagate", "#6EBE49"], ["Western Digital", "westerndigital", "#0061AA"], ["SanDisk", "sandisk", "#ED1C24"], ["Kingston", "kingston", "#CC0000"], ["Crucial", "crucial", "#0057B8"], ["Corsair", "corsair", "#000000"], ["Intel", "intel", "#0071C5"], ["AMD", "amd", "#ED1C24"], ["NVIDIA", "nvidia", "#76B900"], ["Logitech", "logitech", "#00B8FC"], ["TP-Link", "tplink", "#4ACBD6"], ["QNAP", "qnap", "#0A5BD3"], ["Synology", "synology", "#B5B5B6"], ["Sophos", "sophos", "#0072C6"], ["Kaspersky", "kaspersky", "#006D5C"], ["Bitdefender", "bitdefender", "#ED1C24"], ["Avast", "avast", "#FF7800"], ["ESET", "eset", "#00A0B0"]];
document.querySelectorAll('.brand-strip-track').forEach(function(track){
var set=document.createElement('ul');set.className='brand-strip-set';
data.forEach(function(b){var li=document.createElement('li');var img=new Image();img.alt=b[0];img.height=34;img.loading='lazy';img.decoding='async';img.referrerPolicy='no-referrer';
img.onerror=function(){var s=document.createElement('span');s.className='brand-strip-word';s.textContent=b[0];s.style.color=b[2];if(img.parentNode)img.parentNode.replaceChild(s,img)};
img.src='https://cdn.simpleicons.org/'+b[1];li.appendChild(img);set.appendChild(li)});
var clone=set.cloneNode(true);clone.setAttribute('aria-hidden','true');
track.appendChild(set);track.appendChild(clone);
clone.querySelectorAll('img').forEach(function(i){i.alt=''});
});
})();