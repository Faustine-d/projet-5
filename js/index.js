 ////// Requête API //////
let apiFetchCameras = async function () {
  try {
    let response = await fetch ("http://localhost:3000/api/cameras");
      if (response.ok) {
        let data = await response.json ();
        camera = data;  }

      else {
        console.error(response.status);
        alert ("Erreur API");
      }
  } 

  catch (e) {
    console.log(e);
    }

}

// Appareils photos
let camera = [];
onload = async function () {
  await apiFetchCameras ();
    try{
      if (camera.length >= 0) {
        indexFill () ;
        console.log ("Cameras OK");
        }
      else{
        console.log ("Cameras ERREUR");
      }
    }
    catch (e) {
      console.log (e);
      alert ("serveur indisponible")
    }
}

function indexFill () {
  for (let i = 0; i < camera.length; i++)  {
      let cardscameras = `
      
                  <div class="card col-md-4 gy-5 gx-5" >
                      <img class="card-img-top" width="100%" height="300" src="${camera[i].imageUrl}">
                          <div class="card-body">
                              <div class="card-title-price">
                                   <h5 class="card-title">${camera[i].name}</h5>
                                   <h5 class="card-price">${camera[i].price/1000}€</h5>
                              </div>
                              <p class="card-text">${camera[i].description}</p>
                               <a href="pageproduit.html?id=${camera[i]._id}" class="btn btn-primary">Page produit</a>
                          </div>
                  </div></div>
              `;

      document.querySelector('.row').innerHTML += cardscameras
  };
};
