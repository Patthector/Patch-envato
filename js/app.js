console.log("Boun giorno");

$(document).ready(function() {

  $("#nav li").mouseenter(function(e){
    if("nav__menu__submenu__item" === e.currentTarget.classList[1]){
      var w = $(this).children().eq(0).width();
      console.log(w);
      $(this).children().eq(1).css('left',w+5);
    }
  });

  $("#icon-menu").click(function(e){
    e.preventDefault();
    $("#nav").toggleClass("nav--mobile-show");
    $("#icon-menu").toggleClass("icon-menu--clicked");
    $("#icon-search").toggleClass("icon-search--clicked");
  });

  $("#link-search").click(function(e){
    e.preventDefault();
    $("#header__search-bar").addClass("header__search-bar--show");

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
      if(array.eq(i).css("display") === "none" || array.eq(i).hasClass("not-count")){
        //if the child/div is a "card__img-to-the-left-layout" DONT COUNT IT
        continue;
      }
      else if(array.eq(i).hasClass("card__img-to-the-left-layout") || array.eq(i).hasClass("card__img-to-the-right-layout")){
        height = FloatingLayouts(card);
        break;
      }
      else{
        height += array.eq(i).height();
      }
      //ADD THE MARGIN&&PADDING OF PARAGRAPHs,DIVs,HEADINGs
      //height += 10 + 12;
    }
    if(i>0){//NON FOR THE HEADER
    height +=12;
    }

    let repetitions = Math.ceil(height / 10);/*10px*/
    card.css(`grid-row-end`,`span ${repetitions}`);
  }

  function FloatingLayouts(card){
    let array = card.children();
    let height = 0;
    let floatImgHeight = 0;
    let contentHeight = 0;
    for (var i = 0; i < array.length; i++) {

      console.log(array.eq(i));
      if(array.eq(i).css("display") === "none" || array.eq(i).hasClass("not-count")){
        //if the child/div is a "card__img-to-the-left-layout" DONT COUNT IT
        continue;
      }

      else if(array.eq(i).hasClass("card__img-to-the-left-layout") || array.eq(i).hasClass("card__img-to-the-right-layout"))
      {
        floatImgHeight += array.eq(i).height();
      }

      else{
        contentHeight += array.eq(i).height();
      }
    }
    return Math.max(floatImgHeight,contentHeight);
  }
  //
  //END OF THE GRID
  //
  CreatingTheGrid();

});
