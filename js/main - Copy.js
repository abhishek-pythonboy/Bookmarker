// listen to form submit and run the function
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save bookmark
function saveBookmark(e){
  // get form values only


  var siteName = document.getElementById('siteName').value;
  var siteURL = document.getElementById('siteURL').value;

  if (validateForm(siteName, siteURL)!) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteURL
  }


  /*
    // loca storage test
    localStorage.setItem('test', 'Hello world');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */

    // if bookmarks is empty
  if (localStorage.getItem('bookmarks') === null) {
    // init array
    var bookmarks = [];

    // add values to array
    bookmarks.push(bookmark);

    // stringify array and store to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // add values to array
    bookmarks.push(bookmark);

    // stringify array and store to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myForm').reset();

  fetchBookmarks();
  // prevent form from submitting
  e.preventDefault();
}

// defining function for removing of bookmark
function removeFromList(u) {
  // localStorage.removeItem('bookmarks', bookmarks[u]); wrong
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // loop thgough bookmarks
  for (i=0; i<bookmarks.length; i++) {
    // if 'u' is equal to the url of the current item in the for loop in fetchBookmarks()
    if (u == bookmarks[i].url) {
      bookmarks.splice(i, 1);
    }
  }
  // re set the rest of data in storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // re call fetchBookmarks()
  fetchBookmarks();

}

function fetchBookmarks() {
    // take data from storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // set the variable
    var bookmarksResults = document.getElementById('bookmarksResults');

    // to reset the HTML to blank, otherwise the previous HTML remains and appends with the next
    bookmarksResults.innerHTML = '';

    for (i=0; i < bookmarks.length; i++) {
      var name = bookmarks[i].name;
      var url = bookmarks[i].url;



      bookmarksResults.innerHTML += '<div class="card card-header" id="results"> <h3 style="text-align:center; margin-bottom:20px;">' + name + "</h3>" +
                                    '<a href="http://' + url + '"class="btn btn-info col-sm-6 mx-auto" style="margin-bottom:5px;">Visit</a>' +
                                    '<button type="button" class="btn btn-danger col-sm-6 mx-auto" onclick="removeFromList(\''+url+'\')">Remove</button>'
                                    "</div>";
  }

}

function validateForm(siteName, siteURL) {

  // blank form validation
  if (!siteName || !siteURL) {
    alert('Please fill in the form');
    // return false so that the form is stopped from submitting
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteURL.match(regex)) {
    return false;
  }

  // return true if all above of this function goes well
  return false;
}
