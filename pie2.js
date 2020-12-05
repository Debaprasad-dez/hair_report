function sliceSizex(dataNumx, dataTotalx) {
    return (dataNumx / dataTotalx) * 360;
  }
  function addSlicex(sliceSizex, pieElementx, offset, sliceIDx, colorx) {
    $(pieElementx).append("<div class='slicex "+sliceIDx+"'><span id='secc'></span></div>");
    var offset = offset - 1;
    var sizeRotation = -179 + sliceSizex;
    $("."+sliceIDx).css({
      "transform": "rotate("+offset+"deg) translate3d(0,0,0)"
    });
    $("."+sliceIDx+" #secc").css({
      "transform"       : "rotate("+sizeRotation+"deg) translate3d(0,0,0)",
      "background-color": colorx
    });
  }
  function iterateSlices(sliceSizex, pieElementx, offset, dataCount, sliceCount, colorx) {
    var sliceIDx = "s"+dataCount+"-"+sliceCount;
    var maxSize = 179;
    if(sliceSizex<=maxSize) {
      addSlicex(sliceSizex, pieElementx, offset, sliceIDx, colorx);
    } else {
      addSlicex(maxSize, pieElementx, offset, sliceIDx, colorx);
      iterateSlices(sliceSizex-maxSize, pieElementx, offset+maxSize, dataCount, sliceCount+1, colorx);
    }
  }
  function createPie2(dataElement, pieElementx) {
    var listData = [];
    $(dataElement+" span").each(function() {
      listData.push(Number($(this).html()));
    });
    var listTotal = 0;
    for(var i=0; i<listData.length; i++) {
      listTotal += listData[i];
    }
    var offset = 0;
    var colorx = [
      "#FF0018", 
      "#FF8092", 
      "#FFBCD4" 
    
    ];
    for(var i=0; i<listData.length; i++) {
      var size = sliceSizex(listData[i], listTotal);
      iterateSlices(size, pieElementx, offset, i, 0, colorx[i]);
      $(dataElement+" li:nth-child("+(i+1)+")").css("border-color", colorx[i]);
      offset += size;
    }
  }
  createPie2(".pieID2.legend", ".pieID2.pie2");
  