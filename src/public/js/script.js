/*  */
/*  */
$("#btn-like").click(function (e) {
  e.preventDefault();
  let imgId = $(this).data("id");

  $.post("/image/" + imgId + "/like").done((data) => {
    console.log(data);
    $(".likes-count").text(data.likes);
  });
});
