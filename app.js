

      //bilgi ekranları düzenlemesi

 var config = {
    apiKey: "AIzaSyAocMbZ-XS60PhwapNdAl2ahjylwxwzQpQ",
    authDomain: "nine11-b1268.firebaseapp.com",
    databaseURL: "https://nine11-b1268.firebaseio.com",
    projectId: "nine11-b1268",
    storageBucket: "nine11-b1268.appspot.com",
    messagingSenderId: "460490305616"
  };
  firebase.initializeApp(config);
 var db = firebase.firestore();

 var icons = {
          Polis: {
            icon: 'src/markpolice.png'
          },
          İtfaiye: {
            icon:  'src/markfire.png'
          },
          Ambulans: {
            icon:   'src/markmedic.png'
          }
        };

 var loc = {lat: 39.746734, lng: 39.490813};
 
var markers = [];

var popupclicked = false;
var selected;

 
function initMap() {
 var geocoder = new google.maps.Geocoder;
         var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 12, center: loc, disableDefaultUI: true,zoomControl: true, styles: 
        [
              {
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#1d2c4d"
                  }
                ]
              },
              {
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#8ec3b9"
                  }
                ]
              },
              {
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#1a3646"
                  }
                ]
              },
              {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#4b6878"
                  }
                ]
              },
              {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#64779e"
                  }
                ]
              },
              {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#4b6878"
                  }
                ]
              },
              {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#334e87"
                  }
                ]
              },
              {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#023e58"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#283d6a"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#6f9ba5"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#1d2c4d"
                  }
                ]
              },
              {
                "featureType": "poi.medical",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#d50000"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#023e58"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#3C7680"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#304a7d"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#98a5be"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#1d2c4d"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#2c6675"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#255763"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#b0d5ce"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#023e58"
                  }
                ]
              },
              {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#98a5be"
                  }
                ]
              },
              {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#1d2c4d"
                  }
                ]
              },
              {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#283d6a"
                  }
                ]
              },
              {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#3a4762"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#0e1626"
                  }
                ]
                },
                {
                  "featureType": "water",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#4e6d70"
                    }
                  ]
                }]

     
  });

 


  
 db.collection("calls").orderBy("update", "asc").onSnapshot(function(querySnapshot) {
  
        markerKaldir();
        $('ul').empty();
       
        querySnapshot.forEach(function(doc) {
           
            ekle(doc.data().id, doc.data().tip,  doc.data().konum, doc.data().ek, map, doc.data().update.toDate().toString().split(' ')[4],geocoder, doc.data().sahip, doc.data().adres);
           });

if(!$("#liste #"+selected).length)
{
 popupkapat();
 popupclicked = false;
 selected = "no";
}else{
$('#' +selected).css("background-color","#bdbdbd");
}
        
    });

}



   function ekle(id, destek, konum, ek, map, saat,geocoder, sahip, adres) {

  var numara = $('#liste li').length + 1;

   var isim, boy, kilo, kan, bagisci, cinsiyet, alerjen, ozeldurum, yas, foto;
    
   
   var lat = konum.latitude.toString().substring(0, 10);
   var lon = konum.longitude.toString().substring(0, 10);


if(destek==1){
  destek = "Ambulans"
}
if(destek==2){
  destek = "Polis"
}
if(destek==3){
  destek = "İtfaiye"
}


if(id.toString().substring(0, 8)!="dedektor"){
  $('#liste').append('<li id="'+id+'"><h2><div id="sira">'+ numara+'</div>&nbsp;'+
    destek+'</h2><b> <p id="guncel">Son güncelleme: </b>'+saat+'</p><br><br><br><p id="detaylar"><b>ID: </b>'+id+'<br><b>Adres: </b><span></span><br> <b>Enlem:</b>'+lat+' <b>Boylam:</b>'+lon+'</p></li>');
adresekle(geocoder, lat, lon,id, '#'+id+' span');
}else{
 $('#liste').append('<li id="'+id+'"><h2><div id="sira">'+ numara+'</div>&nbsp;'+
    destek+'</h2><b> <p id="guncel">Son güncelleme: </b>'+saat+'<br>Otomatik Çağrı</p><br><br><br><p id="detaylar"><b>ID: </b>'+id+'<br><b>Adres: </b><span>'+adres+'</span><br> <b>Enlem:</b>'+lat+' <b>Boylam:</b>'+lon+'</p></li>');

}

 db.collection('users').where('id', '==', id).get().then(function(querySnapshot) {
  if (querySnapshot.size > 0) {
  
      isim = querySnapshot.docs[0].data().isim;
      boy = querySnapshot.docs[0].data().boy;
      kilo = querySnapshot.docs[0].data().kilo;
      kan = querySnapshot.docs[0].data().kan;
      bagisci = querySnapshot.docs[0].data().bagisci;
      cinsiyet = querySnapshot.docs[0].data().cinsiyet;
      alerjen = querySnapshot.docs[0].data().alerjen;
      ozeldurum = querySnapshot.docs[0].data().ozeldurum;
      yas = querySnapshot.docs[0].data().yas;

      foto = querySnapshot.docs[0].data().foto;
      

markerEkle(lat, lon, map, id, destek, numara, isim, kan, cinsiyet, yas, foto, saat, adres);
  } else {
    console.log("belge yok");
  }
})
.catch(function(error) {
  console.log("hata mesajı: ", error);
});


$('#'+ id).click(function() {
 
    if(id!=selected){
      popupclicked = true;
     $('#' +selected).css("background-color","#eeeeee");
     $('#' +id).css("background-color","#bdbdbd");
    selected = id;
    map.panTo(new google.maps.LatLng(lat,lon));
     popupac(id, destek, numara,isim, kan ,cinsiyet, yas, foto, alerjen,boy, kilo,ek, saat,adres,sahip);

}else{
    
       popupkapat();
      
       $('#' +id).css("background-color","#eeeeee");
       selected ="no";
       popupclicked = false;
   }
 });

$('#'+id).mouseenter(function() {
 if(!popupclicked){
   $('#' +id).css("background-color","#e0e0e0");
  popupac(id, destek, numara,isim, kan ,cinsiyet, yas, foto, alerjen,boy, kilo,ek, saat,adres,sahip);
 }
   
 
}).mouseleave(function() {
if(!popupclicked){
  $('#' +id).css("background-color","#eeeeee");
   $('#kisibilgisi').css("opacity","0");
 }
})

}


     

 function adresekle(geocoder, lat, lon,id ,icine) {
   var adres;

        var latlng = new google.maps.LatLng(parseFloat(lat),parseFloat(lon));
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              adres = results[0].formatted_address;
              
              $(icine).append(adres);
              } else {
              window.alert('Sonuc bulunamadi');
              adres = "Adres Alınamadı";
            }
          } else {
            window.alert('hata kodu: ' + status);
            adres = "Adres Alınamadı";
          }
        });
      }

  

function popupac(id, destek, numara,isim, kan ,cinsiyet, yas, foto, alerjen,boy, kilo,ek, saat, adres, sahip){
    $('#kisibilgisi').empty();
  
 if(id.toString().substring(0, 8)!="dedektor"){

if(destek=="Ambulans"){
   $('#kisibilgisi').append('<img id="kisifoto" src="'+foto+'" height="100px" width="100px" border-radius="50px"><div id="cizgi"></div><div id="bilgiler"><font size="5"><b>'+
numara +'&nbsp;Numaralı&nbsp;' + destek + '&nbsp;Çağrısı</b></font></font><br><br> <div id="solBilgi"> <font size="2"><b>ID:&nbsp;</b>' + id +
'<br><font size="2"><b>İsim:&nbsp;</b>' + isim.charAt(0).toUpperCase() + isim.slice(1) +
'<br><b>Cinsiyet:&nbsp;</b>' + cinsiyet.charAt(0).toUpperCase() + cinsiyet.slice(1) + '<br><b>Kan Grubu:&nbsp;</b>' + kan + '<br></font></div><div id="sagBilgi"><font size="2"><b>Boy:&nbsp;</b>' + boy +
'<br><b>Kilo:&nbsp;</b>' + kilo + '<br><b>Alerjen:&nbsp;</b>' + alerjen.charAt(0).toUpperCase() + alerjen.slice(1) + '</font><font size="2"><b><br>Ek bilgi:&nbsp;</b>' + ek.charAt(0).toUpperCase() + ek.slice(1) + '</font></div></div> </div>');
}else{
   $('#kisibilgisi').append('<img id="kisifoto" src="'+foto+'" height="100px" width="100px" border-radius="50px"><div id="cizgi"></div><div id="bilgiler"><font size="5"><b>'+
numara +'&nbsp;Numaralı&nbsp;' + destek + '&nbsp;Çağrısı</b></font><br><br> <div id="solBilgi"> <font size="2"><b>ID:&nbsp;</b>' + id +
'<br><font size="2"><b>İsim:&nbsp;</b>' + isim.charAt(0).toUpperCase() + isim.slice(1) +
'<br><b>Cinsiyet:&nbsp;</b>' + cinsiyet.charAt(0).toUpperCase() + cinsiyet.slice(1) + '<br><b>Kan Grubu:&nbsp;</b>' + kan + '<br></font></div><div id="sagBilgi"><font size="2"><b>Ek bilgi:&nbsp;</b>' + ek.charAt(0).toUpperCase() + ek.slice(1) + '</font></div></div></div>');
}

}else{


   $('#kisibilgisi').append('<img id="kisifoto" src="'+foto+'" height="100px" width="100px" border-radius="50px"><div id="cizgi"></div><div id="bilgiler"><font size="5"><b>'+
numara +'&nbsp;Numaralı&nbsp;' + destek + '&nbsp;Çağrısı</b></font> - Otomatik Çağrı<br><br> <div id="solBilgi"> <font size="2"><b>ID:&nbsp;</b>' + id +
'<br></div><div id="sagBilgi"><font size="2"><b>Adres: &nbsp;</b>'+adres+'</font></div></div></div>');


}

 

 $('#kisibilgisi').css("opacity","1");
}
function popupkapat(){
  $('#kisibilgisi').css("opacity","0");
   $('#kisibilgisi').empty();
    $('#' +selected).css("background-color","#eeeeee");
   popupclicked = false;
}



function markerEkle(lat,lon, map, id, destek, numara, isim, kan, cinsiyet, yas, foto, saat,adres) {

if(id.toString().substring(0, 8)!="dedektor"){

var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lon),
           id: id,
      icon: icons[destek].icon,

info: new google.maps.InfoWindow({maxWidth: 270,
        content: "<img id='kisifotoinfowindow' height='50px' width='50px' src='"+foto+"'> "+
        "<b>"+numara +" numaralı "+destek.toLowerCase() + " çağrısı:<br>isim:</b> "+
         
isim + "<br>"
+"<b>cinsiyet:</b> "+ cinsiyet +"<br>"
+"<b>kan grubu:</b> "+ kan
      
      }),
          map: map
        });
         google.maps.event.addListener(marker, 'click', function() {
      marker.info.open(map, marker);
    });
 


 
}else{

 var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lon),
           id: id,
      icon: icons[destek].icon,

info: new google.maps.InfoWindow({maxWidth: 270,
        content: "<img id='kisifotoinfowindow' height='50px' width='50px' src='"+foto+"'> "+
        "<b>"+numara +" numaralı "+destek.toLowerCase() + " çağrısı:</b><br>otomatik çağrı<br>"
       +"<b>adres:</b> "+ $("#"+id +" span").text() 
      }),
          map: map
        });
         google.maps.event.addListener(marker, 'click', function() {
      marker.info.open(map, marker);
    });

 
}
      if(!popupclicked){
    map.panTo(marker.getPosition());}
    markers.push(marker);
      
        return marker;
      }

function markerKaldir() { 

  for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
         markers = [];
      }
