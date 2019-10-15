mapboxgl.accessToken = 'pk.eyJ1IjoibWVhdGJhbGx0a28iLCJhIjoiY2sxamZja281MDJuMTNucGU5OXhrazNjZCJ9.b4nnGEfq4Z3mTHC5i18-yg';
            
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/light-v10',
center: post.coordinates,
zoom: 5
});

// add markers to map
// create a HTML element for each feature
var el = document.createElement('div');
el.className = 'marker';

// make a marker for each feature and add to the map
new mapboxgl.Marker(el)
.setLngLat(post.coordinates)
.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
.setHTML('<h3>' + post.title + '</h3><p>' + post.location + '</p>'))
.addTo(map);
// add toggle logic to review edit button
$('.toggle-edit-form').on('click', function(){ //CANNOT USE ARROW FUNCTION WITH JQUERY HMM
    //toggle the edit button text on click
    $(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit');
    //toggle visibility of the edit review form
    $(this).siblings('.edit-review-form').toggle();
});