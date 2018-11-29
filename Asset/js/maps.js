var mymap = L.map('mapid').setView([-6.921980, 107.606940],11);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/"> openstreetmap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/"> CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 20,
		id:'mapbox.streets',
		accessToken:
		'pk.eyJ1IjoicmFrYWlxYmFsc3kiLCJhIjoiY2pucXY4MmQ1MDFwOTNwcW1ucDV3cnJwbiJ9.uuQ8RGp41ZzQVuxsp4jTcw'
}).addTo(mymap);

	let lokasi = [-6.957230, 107.712032];
	let sponsor = "GBLA STADIUM"

	var marker = L.marker(lokasi).addTo(mymap)
		.bindPopup(sponsor);


	function findLocation(x,y) {

	for (var i = 0; i<place.length; i++) {
		if(place[i].lokasi[0]==x && place[i].lokasi[1]==y) {
			return i;
		}
	}

	return -1;
}

function showLocation(e) {
	let ix = findLocation(e.latlng.lat,e.latlng.lng);
	if (ix>=0) {
		img.src = place[ix].pict;
		ket.textContent=place[ix].review;
	}
}

let gmb = document.getElementById("pct");
let rev = document.getElementById("review");
let img = document.createElement('img');
let ket = document.createElement('p');
pct.appendChild(img);
rev.appendChild(ket);

/*let st0 = "Stadion GBLA yang terletak di Gede Bage Bandung, yang merupakan homebase dari club persib bandung";
let st1 = "Stadion Arcamanik yang berada di kawasan arcamanik kota Bandung, yang biasa menjadi tempat latihan club persib bandung";
let st2 = "Stadion Siliwangi berada di kawasan militer di jalan siliwangi kota bandung, Stadion ini pernah menjadi homebase club persib bandung";
let st3 = "Stadion Sidolig berada di jalan ahmad yani kota bandung, stadion ini sering dipakai latihan oleh club persib bandung, dan sering disebut sebagai stadion persib";
let st4 = "Stadion Sijalak Harupat berada di soreang Kab Bandung, stadion ini pernah menjadi homebase club persib bandung beberapa musim sebelumnya";

	let place =[{"lokasi": [-6.957230, 107.712032], "sponsor": "GBLA STADIUM", "pict":"Asset/img/gbla.jpg","review": st0 },
				{"lokasi": [-6.910491, 107.673364], "sponsor": "ARCAMANIK STADIUM","pict":"Asset/img/arcamanik.jpg","review": st1 },
				{"lokasi": [-6.910275, 107.619710], "sponsor": "SILIWANGI STADIUM", "pict":"Asset/img/siliwangi.jpg","review": st2 },
				{"lokasi": [-6.916975, 107.629527], "sponsor": "SIDOLIG STADIUM", "pict":"Asset/img/sidolig.jpg","review": st3},
				{"lokasi": [-6.996434, 107.529621], "sponsor": "SIJALAK HARUPAT STADIUM", "pict":"Asset/img/jalak.jpg","review": st4}]; */

//awal async


const URL="../../data/peta.json";
//f(URL);	

//awal biasa
	fetch(URL)
	.then(function(response) {
		if (response.status !==200) { //HTTP status
			console.log('Error. Status Code: '+response.status);
			throw response.statusText;
		}
		return response.json()
	})
	.then(resp => {
		let place = resp.place;
		localStorage.setItem('place', JSON.stringify(resp.place))
	})				
	.catch(function(err) {
		console.log(err);
	});  

	let place = JSON.parse(localStorage.getItem('place'));

				for(var i of place) {
					 marker = L.marker(i.lokasi).addTo(mymap)
						.bindPopup(i.sponsor);
						marker.on('click', showLocation);
				}