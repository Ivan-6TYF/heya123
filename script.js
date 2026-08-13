/*
==========================================================

    IvanTill <3
    script.js
    Version: v0.2.0

==========================================================
*/

// ======================================================
// ⚙️ CONFIGURACIÓN
// ======================================================

const APP = {

  currentPage:"home",

  animationTime:300,

  data:{

      lastSeen:null,

      favorites:[]

  }

};


// ======================================================
// 📦 CARGAR DATOS
// ======================================================

function loadData(){

  const savedData = localStorage.getItem("ivantillData");


  if(savedData){

      APP.data = JSON.parse(savedData);

  }

}


// ======================================================
// 💾 GUARDAR DATOS
// ======================================================

function saveData(){

  localStorage.setItem(
      "ivantillData",
      JSON.stringify(APP.data)
  );

}

// ======================================================
// 📄 ELEMENTOS
// ======================================================

const pages = document.querySelectorAll(".page");

const navButtons = document.querySelectorAll(".nav-button");


// ======================================================
// 🚀 INICIALIZAR APP
// ======================================================

document.addEventListener("DOMContentLoaded",async()=>{

    loadData();
  
    initializeNavigation();
  
    restoreLastReason();
  
    initializeReasons();

    initializeLetters();

    initializeMemories();
  
    renderHome();
  
  });


// ======================================================
// 🧭 NAVEGACIÓN
// ======================================================

function initializeNavigation(){


  navButtons.forEach(button=>{


      button.addEventListener("click",()=>{


          const page = button.dataset.page;


          changePage(page);


      });

  });

  // <!-- FIX: botones de acceso rapido en inicio -->
  const quickActions =
      document.querySelectorAll(
          ".quick-action"
      );

  quickActions.forEach(button=>{

      button.addEventListener("click",()=>{

          const page = button.dataset.page;

          changePage(page);

      });

  });

}

// ======================================================
// 📄 CAMBIAR PÁGINA
// ======================================================

function changePage(pageID){


  if(APP.currentPage === pageID){

      return;

  }


  APP.currentPage = pageID;

  if(pageID !== "letters"){

    const viewer = document.getElementById("letterViewer");

    if(viewer){

        viewer.classList.remove("active");

    }

}

  navButtons.forEach(button=>{


      button.classList.remove("active");


  });


  document
  .querySelector(`.nav-button[data-page="${pageID}"]`)
  .classList.add("active");



  pages.forEach(page=>{


      page.classList.remove("active");


  });



  document
  .getElementById(pageID)
  .classList.add("active");

}

// ======================================================
// 🏠 INICIO
// ======================================================

function renderHome(){


  renderLastSeen();


  renderFavorites();


}


// ======================================================
// ✨ ÚLTIMO VISTO
// ======================================================

function renderLastSeen(){

  const container =
  document.querySelector(".last-seen-card");


  if(!APP.data.lastSeen){

      return;

  }


  container.innerHTML = `

      <span class="material-symbols-rounded">
          history
      </span>

      <div>

          <strong>
              ${APP.data.lastSeen.title}
          </strong>

          <p>
              ${APP.data.lastSeen.time}
          </p>

      </div>

  `;

}



// ======================================================
// ❤️ FAVORITOS
// ======================================================

function renderFavorites(){


  const container =
  document.querySelector(".favorites-container");



  container.innerHTML="";

  if(APP.data.favorites.length === 0){

      container.innerHTML = `
          <div class="empty-favorite">
              <span class="material-symbols-rounded favorite-icon">
                  favorite_border
              </span>
              <p>Aquí estarán tus favoritos.</p>
          </div>
      `;

      return;

  }

    APP.data.favorites.forEach(item=>{

      let favorite = null;
  
      if(item.type === "reason"){
  
          favorite = REASONS.find(
  
              r => r.id === item.id
  
          );
  
      }
  
      else if(item.type === "letter"){
  
          favorite = LETTERS.find(
  
              l => l.id === item.id
  
          );
  
      }
  
      // <!-- FIX: soporte para favoritos de recuerdos -->
      else if(item.type === "memory"){
  
          favorite = MEMORIES.find(
  
              m => m.id === item.id
  
          );
  
          if(favorite){
  
              favorite.title =
  
                  favorite.text.split("\n")[0] ||
  
                  "Recuerdo";
  
          }
  
      }
  
      if(!favorite){
  
          return;
  
      }

  const card=document.createElement("div");

  card.className="empty-favorite";

  card.innerHTML=`

      <span class="material-symbols-rounded">
          favorite
      </span>

      <p>
          ${favorite.title}
      </p>

  `;

  card.addEventListener("click",()=>{

    if(item.type === "reason"){

      openFavoriteReason(item.id);
  
  }else if(item.type === "memory"){
  
      // <!-- FIX: abrir recuerdo desde favoritos -->
      openFavoriteMemory(item.id);
  
  }else{
  
      openFavoriteLetter(item.id);
  
  }

  });

  container.appendChild(card);

});
}

// ======================================================
// 🌸 UTILIDADES
// ======================================================

function futureFeature(feature){

  console.log(
      `${feature} estará disponible próximamente 💜`
  );

}

// ======================================================
// ❤️ RAZONES
// Base de datos + Motor del libro
// IvanTill v0.3.1
// ======================================================

// ======================================================
// 📚 BASE DE DATOS
// ======================================================

const REASONS = [

  {
      id: "reason-001",

      emoji: "",

      title: "Todo de ti <3",

      text: `
No sabes cuanto me encantas, eres bellisima tanto por dentro como por fuera <3
`
  },
{
      id: "reason-002",

      emoji: "",

      title: "Tus ojos <3",

      text: `
Ojalá me vieras más para perderme en esa mirada :3
`
  },

{
      id: "reason-003",

      emoji: "",

      title: "Tu sonrisa <3",

      text: `
AHHH NO PUEDO, ME DERRITES QUE BONITA SONRISA TIENES
`
  },

{
      id: "reason-004",

      emoji: "",

      title: "Tu piel <3",

      text: `
Piel canela GOD
O sea.. TU PIEL ES PRECIOSA
Y suavecita..
Y calentita..
Mgh, te amo <3
`
  },

{
      id: "reason-005",

      emoji: "",

      title: "Tu cabello <3",

      text: `
AHHH ES TAN ESPONJOSITO Y LINDO, el naranja te queda muy bonito eh <3
PERO NO PUEDO, ES COMO TAN: NOM NOM, Y HUELE RICO
`
   },

{
      id: "reason-006",

      emoji: "",

      title: "Tu aroma <3",

      text: `
QUE JABÓN USAS?
ES QUE DIOS, HUELES INCREÍBLE
Inhalarme tu sueter es clave 
`
   }

];



// ======================================================
// 📄 ESTADO
// ======================================================

APP.reasons = {

  current: 0

};



// ======================================================
// 📄 ELEMENTOS
// ======================================================

const reasonElements = {};



// ======================================================
// 🚀 INICIALIZAR
// ======================================================

function initializeReasons(){

  reasonElements.emoji =
      document.getElementById("reasonEmoji");

  reasonElements.title =
      document.getElementById("reasonTitle");

  reasonElements.content =
      document.getElementById("reasonContent");

//temporal---v
      console.log(reasonElements.content);
//temporal---i

  reasonElements.progress =
      document.getElementById("book-progress");

  reasonElements.previous =
      document.getElementById("previousReason");

  reasonElements.next =
      document.getElementById("nextReason");

  reasonElements.favorite =
      document.getElementById("favoriteReason");

  reasonElements.indicator =
      document.getElementById("pageIndicator");

  reasonElements.favorite.addEventListener(
     "click",
     toggleFavorite
);



  if(!reasonElements.title){

      return;

  }



  reasonElements.previous.addEventListener(
      "click",
      previousReason
  );



  reasonElements.next.addEventListener(
      "click",
      nextReason
  );



  renderReasonBook();

}

// ======================================================
// 📖 MOSTRAR RAZÓN
// ======================================================

function renderReasonBook(){

  const book =
      document.querySelector(".reason-book");

  book.classList.add("changing");


  setTimeout(()=>{

      const reason = REASONS[APP.reasons.current];

      if(!reason){

          return;

      }

      reasonElements.emoji.textContent =
          reason.emoji;

      reasonElements.title.textContent =
          reason.title;

      reasonElements.content.innerHTML =
          reason.text.replace(/\n/g,"<br>");

      reasonElements.progress.textContent =
          `Página ${APP.reasons.current + 1} de ${REASONS.length}`;

      updateReasonButtons();

      saveLastSeen();

      updateFavoriteButton();

      updatePageIndicator();

      book.classList.remove("changing");

  },180);
}

// ======================================================
// ● INDICADORES AUTOMÁTICOS
// ======================================================

function updatePageIndicator(){

  reasonElements.indicator.innerHTML = "";

  REASONS.forEach((reason,index)=>{

      const dot = document.createElement("span");

      dot.className = "indicator";

      if(index === APP.reasons.current){

          dot.classList.add("active");

      }

      reasonElements.indicator.appendChild(dot);

  });

}

// ======================================================
// ❤️ ACTUALIZAR CORAZÓN
// ======================================================

function updateFavoriteButton(){

  const reason = REASONS[APP.reasons.current];

  const isFavorite =

    APP.data.favorites.some(item=>

        item.type === "reason" &&
        item.id === reason.id

    );

  reasonElements.favorite.classList.toggle(
      "active",
      isFavorite
  );

}


// ======================================================
// 🔘 ACTUALIZAR BOTONES
// ======================================================

function updateReasonButtons(){


  reasonElements.previous.disabled =

      APP.reasons.current === 0;


  reasonElements.next.disabled =

      APP.reasons.current === REASONS.length - 1;

}

// ======================================================
// ➡ SIGUIENTE RAZÓN
// ======================================================

function nextReason(){


  if(APP.reasons.current >= REASONS.length - 1){

      return;

  }

  APP.reasons.current++;

  renderReasonBook();

}


// ======================================================
// ⬅ ANTERIOR RAZÓN
// ======================================================

function previousReason(){


  if(APP.reasons.current <= 0){

      return;

  }

  APP.reasons.current--;


  renderReasonBook();

}

// ======================================================
// 💾 ÚLTIMO VISTO
// ======================================================

function saveLastSeen(){

  APP.data.lastSeen = {

      type:"reason",

      id:REASONS[APP.reasons.current].id,

      title:REASONS[APP.reasons.current].title,

      page:APP.reasons.current + 1,

      time:`Página ${APP.reasons.current + 1}`

  };

  saveData();

  renderLastSeen();

}



// ======================================================
// 📖 RECUPERAR ÚLTIMA PÁGINA
// ======================================================

function restoreLastReason(){

  if(!APP.data.lastSeen){

      return;

  }

  if(APP.data.lastSeen.type !== "reason"){

      return;

  }

  const index = REASONS.findIndex(reason=>

      reason.id === APP.data.lastSeen.id

  );

  if(index === -1){

      return;

  }

  APP.reasons.current = index;

}

// ======================================================
// 💜 ABRIR FAVORITO
// ======================================================

function openFavoriteReason(id){


  const index = REASONS.findIndex(reason=>

      reason.id === id

  );


  if(index === -1){

      return;

  }


  APP.reasons.current = index;


  changePage("reasons");


  renderReasonBook();


}

// ======================================================
// 💜 FAVORITOS
// ======================================================

function toggleFavorite(){

    const reason = REASONS[APP.reasons.current];

    const index = APP.data.favorites.findIndex(item=>

        item.type === "reason" &&
        item.id === reason.id

    );

    if(index === -1){

        APP.data.favorites.push({

            type:"reason",

            id:reason.id

        });

    }else{

        APP.data.favorites.splice(index,1);

    }

    saveData();

    renderFavorites();

    updateFavoriteButton();

}