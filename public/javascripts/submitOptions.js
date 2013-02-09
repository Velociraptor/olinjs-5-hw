$(function () {
  $('#changeForm').on('submit', function (newColor) {
    $.post("/changeOptions", $(this).serialize());
    //console.log(this.bgColorText);
    return false;
  });
});