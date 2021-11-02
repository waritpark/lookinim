
var numberElement = 1;
$(':radio[id=multiple]').click(function () {
    $("#multipleform").show();
    $("#simpleform").hide();
});
$(':radio[id=simple]').click(function () {
    $("#multipleform").hide();
    $("#simpleform").show();
});
$('.addelement').click(function () {
    if (numberElement !== 1) {
        $("#buttonremove" + numberElement).hide();
    }
    numberElement += 1;
    $('#elements').append('<div id="element-' + numberElement + '" class="d-flex flex-wrap"><div class="d-flex flex-wrap"><div class="col-12 col-md-4"><input type="text" class="form-control" id="InputElement' + numberElement + '" placeholder="Element"></div><div class="col-12 col-md-3"><input type="text" class="form-control" id="InputNameElement' + numberElement + '" placeholder="Nom Element"></div><div class="col-12 col-md-3"><select type="" class="form-control" id="Inputtype' + numberElement + '" placeholder="Type"><option value="">--Please choose an option--</option><option value="dog">Dog</option><option value="cat">Cat</option><option value="hamster">Hamster</option><option value="parrot">Parrot</option><option value="spider">Spider</option><option value="goldfish">Goldfish</option></select></div><button id="buttonremove' + numberElement + '" onclick="remove(' + numberElement + ')";" type="button" class="removeelement btn btn-info">Supprimer</button></div>');
});
function remove(e){
    $("#buttonremove" + (e-1)).show();
    console.log($('#element-'+ e));
    $('#element-'+ e).remove();
    numberElement = e-1;
}
