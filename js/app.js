console.log("Boun giorno");

$(document).ready(function() {

  $("#nav li").mouseenter(function(e){
    if("nav__menu__submenu__item" === e.currentTarget.classList[1]){
      var w = $(this).children().eq(0).width();

      $(this).children().eq(1).css('left',w+5);
    }
  });

  $("#icon-menu").click(function(e){
    e.preventDefault();
    //$("#nav").toggleClass("nav--mobile-show");
    //
    //$("#icon-search").toggleClass("icon-search--clicked");
    $("#icon-menu").hide("slide",{direction:"left"});
    $("#nav").toggle("slide",{direction:"left"},200);

  });
  $("#icon-menu-gosht").click(function(e){

    $("#nav").toggle("slide",{direction:"left"},500);
    $("#icon-menu").show("slide",{direction:"left"});
  });

  $("#link-search").click(function(e){
    e.preventDefault();
    console.log("clicking the lupo");
    $("#header__search-bar").show("slide",{direction:"right"});

    $("#header__search-bar__button-exit").click(function(e){
        $("#header__search-bar").hide("slide",{direction:"right"});
    });
  });

  $("#arrow-to-the-top").click(function(e){
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 700);
  });
  var lastScrollPosition = 0;
  $( window ).scroll(function(e) {
    var currentScrollPosition = $(this).scrollTop();
    if(currentScrollPosition > 150){
        //$("#header").css('position','fixed');
        //$("#header__main-heading").css('visibility','hidden');
        //$("#header").css('margin-bottom',53);
    }
    else{
      console.log("scrolling TOP");
      //$("#header").css('position','relative');
      //$("#header").css('margin-top',53);
    }
    lastScrollPosition = currentScrollPosition;
});

  //
  //THE GRID
  //
  function CreatingTheGrid(){
    let grid = $("#main");
    let children = grid.children();
    for (let i = 0; i < children.length; i++) {
      ///SETTING ALL THE HEIGHTS OF THE CARDS
      if(i==0){//if is the header
        BuildingCard(children.eq(i),i);
      }
      else{
        BuildingCard(children.eq(i));//get just the article
      }
    }
  }

  function BuildingCard(card,o=-1){
    let array;
    if(o==0){
      array = card.children();
    }
    else{
      array = card.children().eq(1);//just the children of article
    }
    let height = 0;
    for (var i = 0; i < array.length; i++) {
      if(array.eq(i).css("display") === "none" || array.eq(i).hasClass("not-count")){
        //if the child/div is a "card__img-to-the-left-layout" DONT COUNT IT
        continue;
      }
      else if(array.eq(i).hasClass("card__img-to-the-left-layout") || array.eq(i).hasClass("card__img-to-the-right-layout")){
        height = FloatingLayouts(card);
        console.log("Inside floating layout");
        console.log(height);
        break;
      }
      else{
        height += array.eq(i).height();
      }
      //ADD THE MARGIN&&PADDING OF PARAGRAPHs,DIVs,HEADINGs
      //height += 10 + 12;
    }
    if(i>0){//NON FOR THE HEADER
    height +=12+40;//40 is margin bottom
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
