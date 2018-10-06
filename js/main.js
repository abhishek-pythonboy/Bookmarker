// listen to form submit and run the function
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save bookmark
function saveBookmark(e){
  // get form values only
  var siteName = document.getElementById('siteName').value;
  var siteURL = document.getElementById('siteURL').value;

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
  // prevent form from submitting
  e.preventDefault();
}