console.log("Boun giorno");

$(document).ready(function() {

  $("#icon-menu").click(function(e){
    e.preventDefault();
    $("#nav").toggleClass("nav--mobile-show");
    $("#icon-menu").toggleClass("icon-menu--moved");
  });

  $("#link-search").click(function(e){
    e.preventDefault();
    $("#header__search-bar").toggleClass("header__search-bar--show");

    $("#header__search-bar__button-exit").click(function(e){
        $("#header__search-bar").removeClass("header__search-bar--show");
    });
  });

  //
  //THE GRID
  //
  function CreatingTheGrid(){
    let grid = $("#main");
    let children = grid.children();
    for (let i = 0; i < children.length; i++) {
      ///SETTING ALL THE HEIGHTS OF THE CARDS
      BuildingCard(children.eq(i));
    }
  }

  function BuildingCard(card){
    let array = card.children();
    let height = 0;
    for (var i = 0; i < array.length; i++) {
      if(array.eq(i).css("display") === "none"){
        continue;
      }
      height += array.eq(i).height();
      //ADD THE MARGIN&&PADDING OF PARAGRAPHs,DIVs,HEADINGs
      //height += 10 + 12;
    }
    let repetitions = Math.ceil(height / 10);/*10px*/
    card.css(`grid-row-end`,`span ${repetitions}`);
  }
  //
  //END OF THE GRID
  //
  CreatingTheGrid();

});
