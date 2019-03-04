$(document).ready(function() {
  // Fabricated way of reloading page. Hope recode with Promise
  function reloadPage() {
    setTimeout(() => {
      location.reload();
    }, 500);
  }
  // Function to add new comment to article
  $(document).on("click", ".add-comment-btn", function(event) {
    // Prevents rerendering of page due to pressing "add comment" submit button
    event.preventDefault();
    // Object to pass to MongoDB
    var toMongoDB = {};
    let commentId = $(this).attr(`id`);
    let commentTextField = `[article-id=${commentId}]`;
    if (commentTextField) {
      let url = `/newComment/${commentId}`;
      toMongoDB.readerComment = $(commentTextField)
        .val()
        .trim();
      console.log(toMongoDB);
      if (toMongoDB.readerComment !== "") {
        $.post(url, toMongoDB, function(dbres, status) {
          if (status == "success") {
            reloadPage();
          }
        });
      }
    }
  });

  $(document).on("click", ".scrape-new", function(event) {
    event.preventDefault();
    $.get("/scrape", function(dbres, status) {
      // Creating delay to ensure all new articles are displaying on webpage
      if (status == "success") {
        reloadPage();
      }
    });
  });

  // Function to delete comments
  $(document).on("click", ".prior-comment", function(event) {
    let deletecomment = commentId => {
      let urlEndPoint = `/eraseComment/${commentId}`;
      $.ajax({
        url: urlEndPoint,
        type: `PUT`,
        success: function() {
          console.log(`Put fxn executed!`);
        }
      });
    };

    let comment = $(this).html();
    let commentId = $(this).attr(`comment-id`);
    if (
      confirm(
        `Are you sure you want to delete the following comment?\n${comment}`
      )
    ) {
      deletecomment(commentId);
    }
  });

  // Acquire all articles and associated comments
  // $.getJSON("/articles", function(data) {
  //   console.log(data)
  // });
});
