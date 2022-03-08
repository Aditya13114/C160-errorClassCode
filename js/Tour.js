AFRAME.registerComponent("tour", {
  schema:{  
    state:{type:"string", default:"places-list"},
    selectedCard:{type:"string", default:"#card1"} 
  },
   init:function(){
    this.placesContainer = this.el;
    this.createCards();
  },
   tick:function(){
    const {state} = this.el.getAttribute("tour");
    if(state === "View"){
      this.hideEl([this.placesContainer]);
      this.showView();
    }
  },

  hideEl:function(elList){
    elList.map(el=>{
      el.setAttribute("visible", false)
    })
  },

  showView:function(){
    const {selectedCard} = this.data;
    const skyEl = document.querySelector("#main-container")
    skyEl.setAttribute("material", {
      src: `./assets/360_images/${selectedCard}/place-0.jpg`,
      color: "white"
    })
  },

  createCards:function(){
    const thumbnailsRef = [
      {
        id: "taj-mahal",
        title: "TAJ MAHAL",
        url: "./assets/taj_mahal.png"
      },

      {
        id: "budapest",
        title: "BUDAPEST",
        url: "./assets/budapest.jpg"
      },

      {
        id: "eiffel-tower",
        title: "EIFFEL TOWER",
        url: "./assets/eiffel_tower.jpg"
      },

      {
        id: "new-york-city",
        title: "NEW YORK CITY",
        url: "./assets/new_york_city.png"
      }
    ];

    let previousXPosition = -60

    for(var item of thumbnailsRef){
      const posX = previousXPosition+25;
      const posY = 10;
      const posZ = -40;
      const position = {x:posX, y:posY, z:posZ};
      previousXPosition = posX

      //Making the border for thumbnails
      const borderEl = this.createBorder(position, item.id)
      
      //Adding the thumbnail element
      const thumbnail = this.createThumbnail(item);
      borderEl.appendChild(thumbnail);

      //Adding the title for each thumbnail
      const titleEl = this.createTitleEl(position, item);
      borderEl.appendChild(titleEl);
      this.placesContainer.appendChild(borderEl)
    }

  },

  createBorder:function(position,id){
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("id",id)
    entityEl.setAttribute("visible",true)
    entityEl.setAttribute("geometry", {primitive:"ring", radiusInner:9, radiusOuter:10});
    entityEl.setAttribute("position", position);
    entityEl.setAttribute("material", {color: "#0077CC", opacity:1});
    entityEl.setAttribute("cursor-listener", {})
    return entityEl
  },

  createThumbnail:function(item){
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("visible",true)
    entityEl.setAttribute("geometry", {primitive:"circle", radius:9});
    entityEl.setAttribute("material", {src:item.url});
    entityEl.setAttribute("cursor-listener", {})
    return entityEl
  },  

  createTitleEl:function(position,item){
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("visible",true)
    entityEl.setAttribute("text", {font:"exo2bold", align:"center", width:70, color:"#E65100", value: item.title});
    const elPosition = position;
    elPosition.y = -20
    entityEl.setAttribute("position", elPosition);
    return entityEl
  },
  

})