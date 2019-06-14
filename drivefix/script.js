var driveArr = [
  {
    title: "Test Folder",
    type: "folder-close",
    date: "Nov 21, 2017",
    size: "---",
    blob: "",
    id: 6
  },
  {
    title: "File.txt",
    type: "file",
    date: "Dec 1, 2017",
    size: "25 MB",
    blob: "",
    id: 7
  },
    {
    title: "video.mp4",
    type: "facetime-video",
    date: "Nov 29, 2017",
    size: "---",
    blob: "",
    id: 8
  },
  {
    title: "audio.mp3",
    type: "music",
    date: "Nov 29, 2017",
    size: "450 KB",
    blob: "",
    id: 9
  },
  {
    title: "picture.png",
    type: "picture",
    date: "Oct 31, 2014",
    size: "---",
    blob: "",
    id: 10
  }
];
  // {
  //   title: "Test Folder",
  //   type: "folder-close",
  //   date: "Nov 21, 2017",
  //   size: "---",
  //   blob: "",
  //   id: 6
  // }
var arrSelected = [];
var arrStarred = [];
var lastClicked = "";

function closePopup() {
  console.log("test");
  $(".overlay").css("display", "none");
}
function overlay(item) {
  console.log(item);
  $(".overlay").css("display", "block");
}

$(document).ready(function() {
  draw(driveArr);
});

function draw(arr) {
  var template = ``;
  for(var i = 0; i < arr.length; i++){
    var item = arr[i];
    template +=
    `<tr class="item" ondblclick="overlay(${item.id})" onclick="select(${item.id})" id=${item.id.toString()}>
      <td><span class="glyphicon glyphicon-${item.type}"></span> <span class="title">${item.title}</span</td>
      <td>${item.date}</td>
      <td>${item.size}</td>
     </tr>`;
  }
  $("tbody").html(template);
}

$("tr").click(function(event) {  
  var itemId = event.currentTarget.id;
  console.log(itemId);
  if (arrSelected.indexOf(itemId) == -1){
  arrSelected.push(itemId);
  $("#" + itemId).css({"background-color": "#337ab7", "color":"white"});
  }
  else{
    arrSelected.splice(arrSelected.indexOf(itemId),1);
    $("#" + itemId).css({"background-color": "white", "color":"#333"});
  }
  if(arrSelected.length > 0){
    $(".edit-bar").css("display","block");
  }
  else {
    $(".edit-bar").css("display","none");
  }
});

$("#new").click(function(){
  $(".hidden-buttons").toggle();
});

document.body.addEventListener('contextmenu', function(ev) {
  console.log(ev);
  ev.preventDefault();
  lastClicked = ev.currentTarget.id;
  console.log(lastClicked);
  ev.preventDefault();    
  $(".right-click").finish().toggle(100).css({
    top: ev.pageY + "px",
    left: ev.pageX + "px"
  });
  return false;
}, false);

$(document).mousedown(function (e) {
    
    // If the clicked element is not the menu
    if (!$(e.target).parents(".right-click").length > 0) {
        
        // Hide it
        $(".right-click").hide(100);
    }
});

$(".open").click(function() {
  $(".content").html(newFileText);
  $(".overlay").css("display", "block");
});

function addLastClicked() {
  console.log("Last clicked: ", lastClicked);
  addStar(lastClicked);
}

$("#addMultipleStars").click(function() {
  for(var i = 0; i < arrSelected.length; i++) {
    addStar(arrSelected[i]);
  }
});

function addStar(id) {
  if (arrStarred.indexOf(id) == -1) {
    $("#" + id + " .title").append("<span class='glyphicon glyphicon-star'></span>");
    arrStarred.push(id);
  }
}

function select(itemId) {
  if (arrSelected.indexOf(itemId) == -1){
    arrSelected.push(itemId);
    $("#" + itemId).css({"background-color": "#337ab7", "color":"white"});
  }
  else{
    arrSelected.splice(arrSelected.indexOf(itemId),1);
    $("#" + itemId).css({"background-color": "white", "color":"#333"});
  }
  if(arrSelected.length > 0){
    $(".edit-bar").css("display","block");
  }
  else {
    $(".edit-bar").css("display","none");
  }
}

function openStarred() {
  draw(arrStarred);
}

function openDrive() {
  draw(driveArr);
}

var newFolderText = `
<h3>Edit</h3> <span onclick="closePopup()">X</span>
<hr>
Name: <input type="text">
`;
var newFileText = 
  `<h3>File Upload</h3> <span onclick="closePopup()">X</span>
  <hr>
  Name: <input type="text">
  <div>
    File Type: 
    <select>
      <option value="volvo"><span class="glyphicon glyphicon-file"></span> Text</option>
      <option value="saab"><span class="glyphicon glyphicon-facetime-video"> Video</option>
      <option value="mercedes"><span class="glyphicon glyphicon-music"></span> Audio</option>
      <option value="audi"><span class="glyphicon glyphicon-picture"></span> Image</option>
    </select>
  </div>`;