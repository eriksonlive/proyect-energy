

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

      console.log(point1);
      console.log(point2);

    const normalizedBearing = (bearing + 360) % 360;

    return {
        bearing: normalizedBearing,

        azimuth: normalizedBearing // Solar azimuth angle
      };

}