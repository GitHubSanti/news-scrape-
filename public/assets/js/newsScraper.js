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
        if (status=="success") {
          
        }
      });
    }
  });
});
