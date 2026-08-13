/*
==========================================================

    IvanTill <3
    memories.js
    Version: v2.0.0

==========================================================
*/



// ======================================================
// 🌸 BASE DE DATOS
// ======================================================

const MEMORIES = [

    {

        id:"memory-001",

        category:"cute",

        image:"https://picsum.photos/500/500",

        text:
`Vi esta mariposita...

e inmediatamente pensé en ti.

Es igual de bonita que tú. 🦋`

    }

];



// ======================================================
// 📄 ESTADO
// ======================================================

const memories = {

    category:"all",

    grid:null,

    buttons:[]

};



// ======================================================
// 🚀 INICIALIZAR
// ======================================================

function initializeMemories(){

    memories.grid =

        document.getElementById(
            "memoriesGrid"
        );

    memories.buttons = [

        ...document.querySelectorAll(
            ".memory-category"
        )

    ];

    if(!memories.grid){

        return;

    }

    memories.buttons.forEach(button=>{

        button.addEventListener(

            "click",

            ()=>{

                memories.category =
                    button.dataset.category;

                updateCategories();

                renderMemories();

            }

        );

    });

    renderMemories();

}



// ======================================================
// 🎨 BOTONES
// ======================================================

function updateCategories(){

    memories.buttons.forEach(button=>{

        button.classList.toggle(

            "active",

            button.dataset.category ===
            memories.category

        );

    });

}



// ======================================================
// 🖼 TARJETAS
// ======================================================

function renderMemories(){

    memories.grid.innerHTML = "";

    const list =

        memories.category === "all"

        ? MEMORIES

        : MEMORIES.filter(

            memory=>

            memory.category===

            memories.category

        );



    list.forEach(memory=>{

        const card =

            document.createElement("article");

        card.className =

            "memory-card";



        card.innerHTML = `

            <img

                class="memory-image"

                src="${memory.image}"

                alt="">

            <div

                class="memory-content">

                <div

                    class="memory-text">

                    ${memory.text.replace(/\n/g,"<br>")}

                </div>

                <div

                    class="memory-footer">

                    <button

                        class="memory-favorite"

                        data-id="${memory.id}">

                        <span

                            class="material-symbols-rounded">

                            favorite_border

                        </span>

                    </button>

                </div>

            </div>

        `;

        // <!-- FIX: listener para boton favorito -->
        const favButton =
            card.querySelector(
                ".memory-favorite"
            );

        favButton.addEventListener(
            "click",
            ()=>{
                toggleMemoryFavorite(
                    memory.id
                );
            }
        );

        memories.grid.appendChild(card);

    });

    // <!-- FIX: actualizar estado de favoritos -->
    updateMemoryFavoriteButtons();

}


// ======================================================
// <!-- FIX: FUNCIONES DE FAVORITOS -->
// ======================================================

function toggleMemoryFavorite(id){

    const index = APP.data.favorites.findIndex(
        item=>
            item.type==="memory" &&
            item.id===id
    );

    if(index===-1){
        APP.data.favorites.push({
            type:"memory",
            id:id
        });
    }else{
        APP.data.favorites.splice(index,1);
    }

    saveData();
    renderHome();
    updateMemoryFavoriteButtons();

}


function updateMemoryFavoriteButtons(){

    const buttons =
        document.querySelectorAll(
            ".memory-favorite"
        );

    buttons.forEach(button=>{

        const id = button.dataset.id;

        const isFavorite =
            APP.data.favorites.some(
                item=>
                    item.type==="memory" &&
                    item.id===id
            );

        button.classList.toggle(
            "active",
            isFavorite
        );

        const icon =
            button.querySelector("span");

        if(icon){
            icon.textContent =
                isFavorite
                    ? "favorite"
                    : "favorite_border";
        }

    });

}


function openFavoriteMemory(id){

    changePage("memories");

    const memory = MEMORIES.find(
        m=>m.id===id
    );

    if(!memory){
        return;
    }

    memories.category = "all";

    updateCategories();

    renderMemories();

}