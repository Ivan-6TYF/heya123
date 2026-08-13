/*
==========================================================

    IvanTill <3
    letters.js
    Version: v0.5.0

    Sistema de Cartitas 💌

==========================================================
*/


// ======================================================
// 💌 BASE DE DATOS
// ======================================================


const LETTERS = [

  {

      id:"letter-001",

      emoji:"💌",

      date:"14 de Julio, 2026",

      title:"Mi primera cartita :3",

      preview:
      "Solo para ti",

      text:`

HOLIII MI PASTELITO <3 ♡

Esta es la primera cartita y es de prueba jsjs

Aquí voy a hacer muchas cartas más cuando se me ocurran hehe, para que las leas cuando quieras :3

Espero te gusten jsjs

Te amo <3


`
  },

  
  {

    id:"letter-002",

    emoji:"💌",

    date:"15 de Julio, 2026",

    title:"Mi segunda cartita!! :3",

    preview:
    "Esta también es de prueba :3",

    text:`

HOLAAA MI CARAMELITO DE MENTA

Esta también es de prueba para ver si funcionan las cosas en esta app toda pedorra bleh

Estás bien lindo mi bonito :3

jsjs baii <3

`

  },


];




// ======================================================
// ⚙️ ESTADO
// ======================================================


APP.letters = {

  current:null

};




// ======================================================
// 📦 ELEMENTOS
// ======================================================


const letterElements = {};


//PART 1 UP

//PART 1 UP

//PART 1 UP

// ======================================================
// 🚀 INICIALIZAR
// ======================================================

function initializeLetters(){

  letters.list =
      document.getElementById("lettersList");

  letters.viewer =
      document.getElementById("letterModal");

  letters.title =
      document.getElementById("letterTitle");

  letters.date =
      document.getElementById("letterDate");

  letters.emoji =
      document.getElementById("letterEmoji");

  letters.content =
      document.getElementById("letterContent");

  letters.favorite =
      document.getElementById("favoriteLetter");
  
  letters.back =
      document.getElementById("closeLetterButton");
  
  letters.overlay =
      document.getElementById("closeLetter");


  if(!letters.list){

      return;

  }



  letters.favorite.addEventListener(

      "click",
  
      toggleLetterFavorite
  
  );
  
  
  
  letters.back.addEventListener(
  
      "click",
  
      closeLetter
  
  );
  
  
  
  letters.overlay.addEventListener(
  
      "click",
  
      closeLetter
  
  );



  renderLetters();

}

//PART 2 UP
//PART 2 UP
//PART 2 UP

// ======================================================
// 💌 LISTA
// ======================================================

function renderLetters(){

  letters.list.innerHTML = "";

  LETTERS.forEach(letter=>{

      const card = document.createElement("button");

      card.className = "letter-card";

      card.innerHTML = `

          <div class="letter-card-emoji">

              ${letter.emoji}

          </div>

          <div class="letter-card-info">

              <h3>${letter.title}</h3>

              <p>${letter.preview}</p>

          </div>

      `;

      card.addEventListener(

          "click",

          ()=>openLetter(letter.id)

      );

      letters.list.appendChild(card);

  });

}

// ======================================================
// 💌 ABRIR CARTA
// ======================================================

function openLetter(id){

  const letter = LETTERS.find(

      l=>l.id===id

  );

  if(!letter){

      return;

  }

  letters.current = id;

  letters.title.textContent =
      letter.title;

  letters.date.textContent =
      letter.date;

  letters.emoji.textContent =
      letter.emoji;

  letters.content.innerHTML =
      letter.text.replace(/\n/g,"<br>");



  letters.viewer.classList.add("active");



  updateLetterFavorite();



  APP.data.lastSeen = {

      type:"letter",

      id:letter.id,

      title:letter.title,

      time:letter.date

  };



  saveData();

  renderHome();

}

// ======================================================
// ⬅ CERRAR CARTA
// ======================================================

function closeLetter(){

  letters.viewer.classList.remove("active");

}

//PART 3 UP
//PART 3 UP
//PART 3 UP

// ======================================================
// ❤️ FAVORITOS
// ======================================================

function toggleLetterFavorite(){

  if(!letters.current){

      return;

  }

  const index = APP.data.favorites.findIndex(

      item=>

          item.type==="letter" &&
          item.id===letters.current

  );



  if(index===-1){

      APP.data.favorites.push({

          type:"letter",

          id:letters.current

      });

  }

  else{

      APP.data.favorites.splice(index,1);

  }



  saveData();

  renderHome();

  updateLetterFavorite();

}



// ======================================================
// ❤️ ACTUALIZAR BOTÓN
// ======================================================

function updateLetterFavorite(){

  if(!letters.current){

      return;

  }

  const favorite = APP.data.favorites.some(

      item=>

          item.type==="letter" &&
          item.id===letters.current

  );



  letters.favorite.classList.toggle(

      "active",

      favorite

  );

}



// ======================================================
// ❤️ ABRIR DESDE FAVORITOS
// ======================================================

function openFavoriteLetter(id){

  changePage("letters");

  openLetter(id);

}

//PART 4 UP
//PART 4 UP
