/*  */
/*  show comments*/
$("#post-comment").hide();

$("#btn-show-comment").click(function (e) {
  e.preventDefault();
  $("#post-comment").slideToggle();
});

/* like image */
$("#btn-like").click(function (e) {
  e.preventDefault();
  let imgId = $(this).data("id");

  $.post("/image/" + imgId + "/like").done((data) => {
    console.log(data);
    $(".likes-count").text(data.likes);
  });
});

/* delete image */
$("#btn-delete").click(function (e) {
  e.preventDefault();
  let $this = $(this);

  const response = confirm("Are you sure you want to delete");
  if (response) {
    let imgId = $this.data("id");
    console.log(imgId);
    $.ajax({
      url: "/image/" + imgId,
      type: "DELETE",
    }).done(function (result) {
      $this.removeClass("btn-danger").addClass("btn-success");
      $this.find("i").removeClass("fa-times").addClass("fa-check");
      $this.append("<span>Delete Successfully !!!</span>");
    });
  }
});
