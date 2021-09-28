// Déclaration de la variable local storage
let cameraLocalStorage = JSON.parse(localStorage.getItem("optionsCamera"));
console.log(cameraLocalStorage);


// sélection de la classe où injecter les données du local storage
const listeProduitPanier =  document.getElementById("containeur-produit-panier");
console.log(listeProduitPanier);

// si le panier est vide, afficher "le panier est vide"
if(cameraLocalStorage === null){
const panierVide = `
    <div> Votre panier est vide </div>
    <div class="col-sm-12  col-md-6">
        <a href="index.html" class="btn btn-block btn-light">Continuer mes achats</a>
    </div> `;
listeProduitPanier.innerHTML = panierVide;
}

// le panier n'est pas vide, afficher les produits
else{

    let listeProduitPanier =[];
    for (let i = 0; i < cameraLocalStorage.length; i++) {
      

        listeProduitPanier= `<div>
        <div class="col-12">
            <div class="table-responsive">
                <table class="table table-striped">
                   
                    <tbody>
                        <tr>
                            <td><img width="100px" height="100px" src="${cameraLocalStorage[i].imageCamera}" id="imageCamera" /> </td>
                            <td >${cameraLocalStorage[i].nomCamera}</td>
                            <td>${cameraLocalStorage[i].option_lentille}</td>
                            <td><form role="form">
                                    <div class="form-group">
                                       <select class="form-control" name="choixQuantite" id="choixQuantite">
                                          <option selected value="">${cameraLocalStorage[i].quantite}</option>
                                          <option value="2">2</option>
                                          <option value="3">3</option>
                                          <option value="4">4</option>
                                        </select>
                                    </div>
                                </form>
                              </td>
                            <td class="text-right" id="prix-camera">${cameraLocalStorage[i].prixCamera} €</td>
                            <td class="text-right"><input type="button" value="Supprimer"class="btn btn-sm btn-danger" id="btn-supprimer"></td>
                        </tr>
                     </tbody>    
                        
        </div>
    </div>`;
        
    document.querySelector(".row").innerHTML += listeProduitPanier;
     

    }
};




/////////////////////////////////////// SUPPRESSION DE PRODUITS PRÉSENTS DANS LE PANIER /////////////////////////////////////// 


// Sélectionner tous les boutons "supprimer" de la page
let boutonSupprimer = document.querySelectorAll("#btn-supprimer"); // console.log(boutonSupprimer);

// Supprimer le produit sélectionné
for (let index = 0; index < boutonSupprimer.length; index++) {
  boutonSupprimer[index].addEventListener("click", (event)=>{
    event.preventDefault();
    // Sélection de l'id du produit à supprimer
    let id_produit_suppression  = cameraLocalStorage[index].idCamera; // console.log(id_produit_suppression);
    // Supprimer le produit du local storage
    cameraLocalStorage.splice(index, 1);
    localStorage.setItem("optionsCamera", JSON.stringify(cameraLocalStorage));
    location.reload();
    window.alert("Supprimer le produit du panier.");
  })
}

// Vider tout le panier
//localStorage.removeItem('optionsCamera');


/////////////////////////////////////// MODIFICATION DE LA QUANTITÉ (ET DU PRIX) DES PRODUITS PRÉSENTS DANS LE PANIER /////////////////////////////////////// 


// Calculer/Changer le prix par produit en fonction de la quantité sélectionné 
/* const quantiteModel = document.getElementById("choixQuantite"); 
//const quantiteSelectionne = document.querySelector("");
quantiteModel.addEventListener("change", function(){
  let quantite = quantiteModel.value;
  console.log(quantite);
  localStorage.setItem("optionsCamera", JSON.stringify(cameraLocalStorage));
    location.reload();
}); */


/**Retourne la valeur du select selectId*/
/* function getSelectValue(selectId)
{
	/**On récupère l'élement html <select>*/
/* 	var selectElmt = document.getElementById(selectId);
	return selectElmt.options[selectElmt.selectedIndex].value;
}

var selectValue = getSelectValue('choixQuantite');
console.log(selectValue); */ 


// sélectionner toutes les listes  

/* var quantite = document.getElementById("choix-quantite");
var valeur = liste.options[liste.selectedIndex].value
// CalculerPrixModel(id,this.options[this.selectedIndex].value)
//var valeurselectionnee = selectElmt.options[selectElmt.selectedIndex].value;

console.log(quantite);
CalculerPrixModel
 */
 
  
  
/////////////////////////////////////// LE CALCUL DU PRIX DE LA COMMANDE /////////////////////////////////////// 


// calcul prix
let prixTotal = [];
for (let index = 0; index < cameraLocalStorage.length; index++) {
  
  let prixSousTotal =  cameraLocalStorage[index].prixCamera;
 
 
  // mettre le Sous-Total dans la variables "prixTotal"
  //———————————————————————————————— La méthode push() ajoute un ou plusieurs éléments à la fin d'un tableau et retourne la nouvelle taille du tableau.
  prixTotal.push(prixSousTotal);
  console.log(prixTotal);
}
  // additionner les prix du tableau (sous-total) avec la méthode reduce()
  //———————————————————————————————— La méthode reduce() applique une fonction qui est un « accumulateur » et qui traite chaque valeur d'une liste (de la gauche vers la droite) afin de la réduire à une seule valeur.
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalSousTotal = prixTotal.reduce(reducer, 0);
  const fraisDePort = 6.90
  console.log(totalSousTotal);
 


affichagePrixTotal();

// calcul et affichage des prix "sous-total", "frais de port", "prix toal"
function affichagePrixTotal(){
  document.getElementById("sous-total").innerHTML = totalSousTotal + " €";
  document.getElementById("frais-de-port").innerHTML = fraisDePort + " €";
  document.getElementById("prix-total").innerHTML = totalSousTotal + fraisDePort  + " €";
 
}


/////////////////////////////////////// LE FORMULAIRE DE VALIDATION DE COMMANDE /////////////////////////////////////// 


//////// Afficher la div Formulaire lorsque l'on clique sur le bouton "Valider ma commande" //
function validerMaCommande() {
  var div = document.getElementById("formulaire");
  if (div.style.display === "none") {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }
}

////////// Validation formulaire (REGEX)//////////////////////////////

let formulaire = document.querySelector('#formulaireValidation');

// Validation Prénom //
// Analyse du champ Prénom au moment de la perte de focus //
formulaire.prenom.addEventListener('change', function(){
  validPrenom(this);
});
// RegEx du Prénom
const validPrenom = function(inputPrenom){
  let prenomRegExp = new RegExp('^[A-Za-z\é\è\ê\-]{2,}$');
  let testPrenom = prenomRegExp.test(inputPrenom.value);
  // Message Prénom Valide/Invalide //
  let small = inputPrenom.nextElementSibling;
  if (testPrenom) {
    small.innerHTML = "Prénom valide";
    small.style.color='green';
  }
  else{
    small.innerHTML = "Veuillez saisir votre prénom";
    small.style.color='red';
  }
};
// Validation Nom //
// Analyse du champ Nom au moment de la perte de focus //
formulaire.nom.addEventListener('change', function(){
  validNom(this);
});
// RegEx du Nom
const validNom = function(inputNom){
  let nomRegExp = new RegExp('^[A-Za-z\é\è\ê\-]{2,}$');
  let testNom = nomRegExp.test(inputNom.value);
  // Message Nom Valide/Invalide //
  let small = inputNom.nextElementSibling;
  if (testNom) {
    small.innerHTML = "Nom valide";
    small.style.color='green';
  }
  else{
    small.innerHTML = "Veuillez saisir votre nom";
    small.style.color='red';
  }
};
// Validation Email //
// Analyse du champ Email au moment de la perte de focus //
formulaire.email.addEventListener('change', function(){
  validEmail(this);
});
// RegEx du Email
const validEmail = function(inputEmail){
  let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
  let testEmail = emailRegExp.test(inputEmail.value);
  // Message Email Valide/Invalide //
  let small = inputEmail.nextElementSibling;
  if (testEmail) {
    small.innerHTML = "Email valide";
    small.style.color='green';
  }
  else{
    small.innerHTML = "Veuillez saisir votre email";
    small.style.color='red';
  }
};

// Validation Telephone //
// Analyse du champ Téléphone au moment de la perte de focus //
formulaire.telephone.addEventListener('change', function(){
  validTelephone(this);
});
// RegEx du Téléphone (France)
const validTelephone = function(inputTelephone){
  let telephoneRegExp = new RegExp('^(0|\\+33|0033)[1-9][0-9]{8}$', 'g');
  let testTelephone = telephoneRegExp.test(inputTelephone.value);
  // Message Téléphone Valide/Invalide //
  let small = inputTelephone.nextElementSibling;
  if (testTelephone) {
    small.innerHTML = "Numéro de téléphone valide";
    small.style.color='green';
  }
  else{
    small.innerHTML = "Veuillez saisir votre numéro de téléphone";
    small.style.color='red';
  }
};

// Validation Adresse //
// Analyse du champ Adresse au moment de la perte de focus //
formulaire.adresse.addEventListener('change', function(){
  validAdresse(this);
});
// RegEx de l'adresse
const validAdresse = function(inputAdresse){
  let adresseRegExp = new RegExp('^[ 0-9]+[ ,]+[ a-zA-Z,-]*$', 'g');
  let testAdresse = adresseRegExp.test(inputAdresse.value);
  // Message Adresse Valide/Invalide //
  let small = inputAdresse.nextElementSibling;
  if (testAdresse) {
    small.innerHTML = "Adresse valide";
    small.style.color='green';
  }
  else{
    small.innerHTML = "Veuillez saisir votre adresse";
    small.style.color='red';
  }
};

// Validation Code Postal //
// Analyse du code Postal au moment de la perte de focus //
formulaire.zip.addEventListener('change', function(){
  validZip(this);
});
// RegEx du code postal (France)
const validZip= function(inputZip){
  let zipRegExp = new RegExp('^(([0-8][0-9])|(9[0-5]))[0-9]{3}$', 'g');
  let testZip = zipRegExp.test(inputZip.value);
  // Message code postal Valide/Invalide //
  let small = inputZip.nextElementSibling;
  if (testZip) {
    small.innerHTML = "Code postal valide";
    small.style.color='green';
  }
  else{
    small.innerHTML = "Veuillez saisir votre code postal";
    small.style.color='red';
  }
};

// Validation Ville //
// Analyse du champ Ville au moment de la perte de focus //
formulaire.ville.addEventListener('change', function(){
  validVille(this);
});
// RegEx de la ville
const validVille = function(inputVille){
  let villeRegExp = new RegExp('^[ A-Za-z\é\è\ê\-]{3,}$');
  let testVille = villeRegExp.test(inputVille.value);
  // Message Ville Valide/Invalide //
  let small = inputVille.nextElementSibling;
  if (testVille) {
    small.innerHTML = "Ville valide";
    small.style.color='green';
  }
  else{
    small.innerHTML = "Veuillez saisir votre ville";
    small.style.color='red';
  }
};

