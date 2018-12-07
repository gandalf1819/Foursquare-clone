var notesMap={};

function registerUser() {

  var firstName = document.getElementById("inputFirstName").value;
  var lastName = document.getElementById("inputLastName").value;
  var email = document.getElementById("inputRegisterEmail").value;
  var password = document.getElementById("inputRegisterPassword").value;

  if (!firstName) {
    toastr.error("Please enter First Name!")
    return
  }
  if (!lastName) {
    toastr.error("Please enter Last Name!")
    return
  }
  if (!email) {
    toastr.error("Please enter Email!")
    return
  }
  if (!password) {
    toastr.error("Please enter Password!")
    return
  }

  var registerData = {
    "firstName": firstName,
    "lastName": lastName,
    "email": email,
    "password": password
  }
  $.ajax({
    url: "http://localhost:3000/auth/register/",
    method: "POST",
    data: JSON.stringify(registerData),
    dataType: 'json',
    contentType: "application/json",
    success: function(data) {
      if (data.Status == 200) {
        toastr.success(data.Message);
      } else {
        toastr.error(data.Message)
      }

    },
  });
}

function followUser(followerId, action, event) {
  var data = {
    "followerId": parseInt(followerId),
  }
  var url = "http://localhost:9090/"
  url += (action == "Follow") ? "follow/" : "unfollow/";
  $.ajax({
    url: url,
    method: "POST",
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: "application/json",
    success: function(data) {
      action = (action == "Follow") ? "UnFollow" : "Follow";
      event.target.setAttribute("onclick", "followUser('" + followerId + "','" + action + "',event)");
      event.target.innerHTML = action
    },
  });
}

function signIn() {
  var email = document.getElementById("inputLoginEmail").value;
  var password = document.getElementById("inputLoginPassword").value;

  if (!email) {
    toastr.error("Please enter Email!")
    return
  }
  if (!password) {
    toastr.error("Please enter Password!")
    return
  }

  var data = {
    "email": email,
    "password": password
  }
  var url = "http://localhost:3000/auth/login";
  $.ajax({
    url: url,
    method: "POST",
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: "application/json",
    success: function(data) {
      if (data.Status == 200) {
        toastr.success(data.Message)
        location.href = "http://localhost:3000/posts/";
      } else {
        toastr.error(data.Message)
      }
    },
  });
}


function addPost() {
  var startDate = document.getElementById("startDate").value;
  var endDate = document.getElementById("endDate").value;
  var startTime = document.getElementById("startTime").value;
  var endTime = document.getElementById("endTime").value;
  var status = document.getElementById("status").value;
  var tags = document.getElementById("input-tags").value;
  var radiusOfInterest = document.getElementById("radiusOfInterest").value;
  var sharedWith = document.getElementById("sharedWith").value;
  var interval = document.getElementById("interval").value;
  var areCommentsAllowed = document.getElementById("areCommentsAllowed").value;
  console.log("tags =", tags);
  if (!status) {
    toastr.error("Please enter status!!")
    return
  }
  if (!radiusOfInterest) {
    toastr.error("Please enter Radius Of Interest!!")
    return
  }
  if (!startDate) {
    toastr.error("Please enter Start Date!!")
    return
  }
  if (!startTime) {
    toastr.error("Please enter startTime!!")
    return
  }
  if (!tags) {
    toastr.error("Please enter tags!!")
    return
  }

  if (!endTime) {
    endTime = null
  }

  if (!interval) {
    interval = null
  }

  //write condition for location
  tags = tags.split(",")
  var data = {
    "latitude": 40.69440700,
    "longitude": -73.98652500,
    "area_name": "NYU Tandon",
    "tags": tags,
    "note": status,
    "shared_with": sharedWith,
    "radius_of_interest": radiusOfInterest,
    "start_date": startDate,
    "end_date": endDate,
    "start_time": startTime,
    "end_time": endTime,
    "interval": interval,
    "are_comments_allowed": areCommentsAllowed
  }
  console.log("data =", data);
  var url = "http://localhost:3000/notes/"

  $.ajax({
    url: url,
    method: "POST",
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: "application/json",
    success: function(data) {
      if (data.Status == 200) {
        toastr.success(data.Message);
      } else {
        toastr.error(data.Message)
      }
    },
  });
}

function addFilter() {
  var eventDate = document.getElementById("eventDate").value;
  var eventTime = document.getElementById("eventTime").value;
  var tags = document.getElementById("filterTags").value;
  var noteType = document.getElementById("noteType").value;
  var state = document.getElementById("selectState").value;
  console.log("tags =", tags);
  if (!eventDate) {
    eventDate = null;
  }
  if (!eventTime) {
    eventTime = null;
  }
  if (!tags) {
    tags = null;
  }
  if (!noteType) {
    noteType = null;
  }
  if (!state) {
    state = null
  }

  //write condition for location
  if (tags)
    tags = tags.split(",")
  var data = {
    "state": state,
    "latitude": 40.69440700,
    "longitude": -73.98652500,
    "area_name": "NYU Tandon",
    "tags": tags,
    "user_type": noteType,
    "event_date": eventDate,
    "event_time": eventTime
  }
  console.log("data =", data);
  var url = "http://localhost:3000/filters/"

  $.ajax({
    url: url,
    method: "POST",
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: "application/json",
    success: function(data) {
      if (data.Status == 200) {
        console.log("data =", data);
        var filterId;
        if (data.Data && data.Data.filter_id) {
          filterId = data.Data.filter_id;
          url = "http://localhost:3000/notes?filter_id="+filterId
          $.ajax({
            url: url,
            method: "GET",
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: "application/json",
            success: function(data) {
              if (data.Status == 200) {
                console.log("notes data =", data);
                addElementsToEventsList(data.Data)
              } else {
                toastr.error(data.Message)
              }
            },
          });
        }

      } else {
        toastr.error(data.Message)
      }
    },
  });
}

function addElementsToEventsList(data){
console.log("add Elements to Events List called");
  var postsElem = document.getElementById("postsList");
  postsElem.innerHTML=""
  data.forEach(function(post){
    notesMap[post.note_id]=post
    postsElem.innerHTML+=`<div class='col-xs-12'>
    <div class ='col-xs-6'>
        <div class="label-text text-left margin-t18"><strong>
    `+post.first_name+" "+post.last_name+`</strong></div><div class="label-text text-left">-
    `+post.description+`</div></div>
    <div class ='col-xs-3 margin-t18'>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onclick="displayDataInModal(`+post.note_id+`)">
        Details
      </button>
    </div></div>`
    console.log("notesMap =", notesMap);
  })
}

function displayDataInModal(noteId){
  console.log("noteId=",noteId);
  console.log("notesMap =",notesMap);
  console.log("data to be shown in data modal =", notesMap[noteId]);

  var modalBody = document.getElementById("modalBody");
  modalBody.innerHTML=`<div class="col-xs-12 padding-left-none">
    <div class="label-text text-left">
        <strong>`+notesMap[noteId].first_name+` `+notesMap[noteId].last_name+`</strong>
    </div>
    <div class="label-text text-left">`+notesMap[noteId].description+`</div>
  </div>
  <div class="clearfix"></div>
  <div class="col-xs-12 padding-left-none">
    <div class="col-xs-4 padding-left-none">
      <label for="modalLoc" class="pull-left margin-t1">Location:</label>
      <input type="text" id="modalLoc" class="form-control" placeholder="Location" value ="`+notesMap[noteId].area_name+`" disabled>
    </div>
    <div class="col-xs-4 padding-left-none">
        <label for="modalStartDate" class="pull-left margin-t1">Start Date:</label>
        <input type="text" id="modalStartDate" class="form-control" placeholder="Start Date" value ="`+notesMap[noteId].start_date+`" disabled>
    </div>
    <div class="col-xs-4 padding-left-none">
        <label for="modalEndDate" class="pull-left margin-t1">End Date:</label>
        <input type="text" id="modalEndDate" class="form-control" placeholder="End Date" value ="`+notesMap[noteId].end_date+`" disabled>
    </div>
  </div>
  <div class="clearfix"></div>
  <div class ="col-xs-12 padding-left-none">
    <div class="col-xs-4 padding-left-none">
        <label for="modalStartTime" class="pull-left margin-t1">Start Time:</label>
        <input type="text" id="modalStartTime" class="form-control" placeholder="Start Time" value ="`+notesMap[noteId].start_time+`" disabled>
    </div>
    <div class="col-xs-4 padding-left-none">
        <label for="modalEndTime" class="pull-left margin-t1">End Time:</label>
        <input type="text" id="modalEndTime" class="form-control" placeholder="End Time" value ="`+notesMap[noteId].end_time+`" disabled>
    </div>
  </div>
  <div class="clearfix"></div>`;
  if(notesMap[noteId].are_comments_allowed == "Yes"){
    modalBody.innerHTML+=`<div class="col-xs-12 margin-t1 padding-left-none">
    <div class="label-text text-left">
        <strong>Comments</strong>
    </div>
  </div>
  <div class="clearfix"></div>
  <div class="col-xs-12 margin-t1 padding-left-none">`;

  notesMap[noteId].comments.forEach(function(comment){
    modalBody.innerHTML+=`<div class="label-text text-left">`+comment.comment+`- <strong>`+comment.first_name+` `+comment.last_name+`</strong></div>`
  })

    modalBody.innerHTML+=`<div class="form-group margin-t1 padding-left-none">
        <textarea rows="2" id="commentSection" class="form-control" placeholder="Add comment"></textarea>
    </div>
  </div>
  <div class="clearfix"></div>`
  }
}

function logout() {
  var url = "http://localhost:3000/auth/logout/"
  $.ajax({
    url: url,
    method: "DELETE",
    dataType: 'json',
    contentType: "application/json",
    success: function(data) {
      if (data.Status == 200) {
        toastr.success(data.Message);
        location.href = "http://localhost:3000/login/";
      } else {
        toastr.error(data.Message)
      }
    },
  });
}
