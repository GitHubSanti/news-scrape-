$(document).ready(function() {
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
      $.post(url, toMongoDB, function(dbres, status) {
        if (status == "success") {
        }
      });
    }
  });

  // Function to delete comments
  $(document).on("click", ".prior-comment", function(event) {
    let deletecomment = () => {

    };
    
    let comment = $(this).html();
    if (
      confirm(
        `Are you sure you want to delete the following comment?\n${comment}`
        )
        ) {
          deletecomment()
    }
  });

  // Acquire all articles and associated comments
  $.getJSON("/articles", function(data) {
    console.log(data)
  });
});
