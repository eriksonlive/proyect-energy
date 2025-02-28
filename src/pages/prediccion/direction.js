

export function RoofOrientation(coordinates){ //Funcion que permite encontrar la mayor distance entre coordenadas de area dibujada, que probablemente representa la dirección de caída del techo

  if (!coordinates || coordinates.length < 3) {
      throw new Error('Need at least 3 coordinates to calculate orientation');
    }
  
  //console.log(coordinates.length)
  //console.log(coordinates)
  let max_distance = 0;
  let point1 = null;
  let point2 = null;

  for (let i=0;i<coordinates.length;i++)
  {
      const current_point = coordinates[i];
      const next_point = coordinates[(i+1)%coordinates.length];

      const distance = google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(current_point.lat,current_point.lng),new google.maps.LatLng(next_point.lat,next_point.lng)
      );

      //console.log(distance)

      if (distance>max_distance)
      {
          max_distance = distance;
          //console.log(distance);
          point1= current_point;
          point2 = next_point;
      }

  }

  const bearing = google.maps.geometry.spherical.computeHeading(
      new google.maps.LatLng(point1.lat, point1.lng),
      new google.maps.LatLng(point2.lat, point2.lng)
      

    );
   

  const normalizedBearing = (bearing + 360) % 360;
  let panel_bearing1 = (normalizedBearing+90)%360;
  let panel_bearing2 = (normalizedBearing-90+360)%360;

  const panel_azimuth = most_south(panel_bearing1,panel_bearing2);


  return {
      bearing: normalizedBearing,
      lat: point1.lat, //retorno latitud del primer punto del lado mas ancho del poligono
      lon: point2.lng, //retorno longitud del primer punto del lado mas ancho del poligono
      azimuth: panel_azimuth // Solar azimuth angle
    };

}

function most_south(bearing1, bearing2) {
// Calculate how far each bearing is from south (180 degrees)
const diff1 = Math.min((bearing1 - 180 + 360) % 360, (180 - bearing1 + 360) % 360);
const diff2 = Math.min((bearing2 - 180 + 360) % 360, (180 - bearing2 + 360) % 360);

// Return the bearing that's closer to south
return diff1 < diff2 ? bearing1 : bearing2;
}