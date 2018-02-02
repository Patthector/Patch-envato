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
    $("#icon-menu").hide("slide",{direction:"left"});
    $("#nav").toggle("slide",{direction:"left"},200);

  });
  $("#icon-menu-gosht").click(function(e){
    e.preventDefault();
    $("#nav").toggle("slide",{direction:"left"},500);
    $("#icon-menu").show("slide",{direction:"left"});
  });

  $("#link-search").click(function(e){
    e.preventDefault();
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
    if(currentScrollPosition > lastScrollPosition){ //BOTTOM
        if(currentScrollPosition<100){
          var newPosition = currentScrollPosition - 100;
          $(".logo").css("transform","translateY("+newPosition+"px)");
        }
        else{
          $(".logo").css("transform","translateY(0px)");
        }
    }
    else{ //TOP
      if(currentScrollPosition < 106){
        var newPosition = currentScrollPosition - 106;
        $(".logo").css("transform","translateY("+newPosition+"px)");
      }
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
      ///SETTING THE HEIGHTS OF ALL THE CARDS
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
    let height = 0;
    if(o==0){//it is the header
      array = card.children();
      height +=20+60;
    }
    else{
      array = card.children().eq(1);//just the children of article
    }
    for (var i = 0; i < array.length; i++) {
      if(array.eq(i).css("display") === "none" || array.eq(i).hasClass("not-count")){
        //if the child/div is a "card__img-to-the-left-layout" DONT COUNT IT
        continue;
      }
      else if(array.eq(i).hasClass("card__post--img-to-the-left-layout") || array.eq(i).hasClass("card__post--img-to-the-right-layout")){
        console.log("Inside floating layout");
        height = FloatingLayouts(array.eq(i));
        console.log("Total height:",height);
        break;
      }
      else{
        height += array.eq(i).height();
      }
      //ADD THE MARGIN&&PADDING OF PARAGRAPHs,DIVs,HEADINGs
      //height += 10 + 12;
    }
    if(o<0){//NON FOR THE HEADER
    height +=12+40+15;//15 is margin bottom
                      /*40 is the height of metainfo
                      /*12 is the margin of the text (headings and paragraphs)*/
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
      else if(array.eq(i).hasClass("container-img--left")
           || array.eq(i).hasClass("container-img--right"))
      {
        floatImgHeight += array.eq(i).height();
      }
      else{
        contentHeight += array.eq(i).height();
        console.log(contentHeight);
      }
    }
    return Math.max(floatImgHeight,contentHeight);
  }
  //
  //END OF THE GRID
  //
  //CreatingTheGrid();
  $(window).on('load',function(){
    console.log("LOADING");
    CreatingTheGrid();
  })
  $(window).on('resize',function(){
    console.log("RESIZING");
    CreatingTheGrid();
  })
  $(window).on('orientationchange',function(){
    console.log("ORIENTATIONCHANGE");
    CreatingTheGrid();
  })

});
