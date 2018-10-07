document.getElementById('myForm').addEventListener('submit', saveBookmark); // no parameter needed to call function

function saveBookmark(e) {

  var nameSite = document.getElementById('siteName').value;
  var nameUrl = document.getElementById('siteURL').value; //ok

  e.preventDefault(); // if put after validate if statement, return false will reload the page

  // add http:// if not present
  if (!/^https?:\/\//i.test(nameUrl)) {
    nameUrl = 'http://' + nameUrl;
  }

  // then validate
  if (!validateForm(nameSite, nameUrl)) {
    return false;
  }

  // shouln't make direct objects, then calling values from object will be tedious
  var bookmarkObj = {
    name : nameSite,
    url : nameUrl
  } //ok


   if (localStorage.getItem('bookmarkArray') === null) {

    var bookmarkArray = [];

    bookmarkArray.push(bookmarkObj);

    localStorage.setItem('bookmarkArray', JSON.stringify(bookmarkArray));
  } else {
    bookmarkArray = JSON.parse(localStorage.getItem('bookmarkArray'));
    bookmarkArray.push(bookmarkObj);
    localStorage.setItem('bookmarkArray', JSON.stringify(bookmarkArray));
    // always check spelling and give variables easy names
  }

  fetchBookmarks();
  document.getElementById('myForm').reset();
}


function fetchBookmarks() {
  var bookmarkArray = JSON.parse(localStorage.getItem('bookmarkArray'));

  document.getElementById('bookmarksResults').innerHTML = '';

  for (i=0; i<bookmarkArray.length; i++) {
    var nameSite = bookmarkArray[i].name;
    var nameUrl = bookmarkArray[i].url;

    document.getElementById('bookmarksResults').innerHTML += '<div class="card">' +
                                                            '<div class="card-header">' +
                                                            '<h3 class="card-title mt-2">' + nameSite + ' ' +
                                                            '<div class="float-right"><a target="_blank" class="btn btn-light mr-1" href="'+nameUrl+'">Visit</a>' +
                                                            '<button class="btn btn-danger" onclick="deleteBookmark(\''+nameUrl+'\')">Delete</button></div>'+'<h3>'+
                                                            '</div></div>';
  }
}

function deleteBookmark(nameUrl) {
  var bookmarkArray = JSON.parse(localStorage.getItem('bookmarkArray'));

  for (i=0; i < bookmarkArray.length; i++) {
    if (nameUrl == bookmarkArray[i].url) {

      bookmarkArray.splice(i, 1); // only i is needed

      localStorage.setItem('bookmarkArray', JSON.stringify(bookmarkArray));
    }
  }

  fetchBookmarks();
}

function validateForm(nameSite, nameUrl) {

  if (!nameSite || !nameUrl) {
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!nameUrl.match(regex)) {
    alert('invalid URL, please try again.');
    return false;
  }

  return true;

}
