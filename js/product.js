
 ////// récupération de l'ID dans l'URL //////
 const queryStringUrlId = window.location.search;
 const urlParams = new URLSearchParams(queryStringUrlId);
 const id = urlParams.get('id');
 console.log(id);
 
 
 ////// Requête API //////
 let getCamera = async function () {
     try {
       let res = await fetch ("http://localhost:3000/api/cameras/"+id);
         if (res.ok) {
           let choosenCamera = await res.json();
       camera=choosenCamera;
            }
   
         else {
           console.error(res.status);
           alert ("Erreur API");
         }
     } 
   
     catch (e) {
       console.log(e);
       }
   
   };
 
 //////
 let camera;
 onload= async function () {
     await getCamera ();
     
   
   try{
       if (camera!= "") {
         product () ;
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
 };
 
 /////
 function product () {
   document.getElementById("imageCamera").setAttribute("src", camera.imageUrl);
   document.getElementById("nomCamera").innerHTML = camera.name;
   document.getElementById("prixCamera").innerHTML = camera.price / 1000 + " €";
   document.getElementById("descriptionCamera").innerHTML = camera.description;
   
   camera.lenses.forEach((lense) => {
     let optionLentille = document.createElement('option');
     document.getElementById("option_lentille").appendChild(optionLentille).innerHTML = lense;
     });
  
 };
 
 
 // sélection de éléments : option de lentille / bouton ajouter au panier
 const lentille = document.getElementById('option_lentille');
 const boutonPanier = document.getElementById('btn-panier');
   console.log(boutonPanier);
 
 boutonPanier.addEventListener("click", (event)=>{
   event.preventDefault();
   window.alert("Le produit a été ajouté au panier.");
 
 const choixLentille = lentille.value;
   console.log(choixLentille);  
 
 // Récupération des valeurs de l'objet // objet
 let optionsCamera = {
   idCamera : camera._id,
   nomCamera : camera.name,
   option_lentille : choixLentille,
   imageCamera : camera.imageUrl,
   prixCamera :camera.price / 1000,
   quantite : 1,
   }
   
   console.log(optionsCamera);
 
   // local storage //
 
   // Déclaration de la variable dans laquelle on met les key et les values qui sont dans le losacl storage
 //JSON.parse pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript
 let cameraLocalStorage = JSON.parse(localStorage.getItem("optionsCamera"));
 console.log(cameraLocalStorage);
 
   //s'il y a déjà des produits dans le panier // local storage
   if(cameraLocalStorage){
     cameraLocalStorage.push(optionsCamera);
     localStorage.setItem("optionsCamera", JSON.stringify(cameraLocalStorage));
 
     console.log(cameraLocalStorage);
 
   }
 
   //s'il y a pas de produits dans le panier // local storage
   else{
     cameraLocalStorage = [];
     cameraLocalStorage.push(optionsCamera);
     localStorage.setItem("optionsCamera", JSON.stringify(cameraLocalStorage));
 
     console.log(cameraLocalStorage);
   }
 });
 
 