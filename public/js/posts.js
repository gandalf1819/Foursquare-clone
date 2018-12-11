$(document).ready(function() {
  toggleTab(1);
  $('#input-tags').selectize({
    plugins: ['restore_on_backspace'],
    persist: false,
    createOnBlur: true,
    searchField: "tag",
    valueField: "tag",
    labelField: "tag",
    create: true,
    options: [],
    onInitialize: function() {
      var selectize = this;
      var url = "http://localhost:3000/tags"
      $.ajax({
        url: url,
        method: "GET",
        dataType: 'json',
        contentType: "application/json",
        success: function(data) {
          console.log("tag data =", data);
          if (data.Status == 200) {
            data.Data.forEach(function(tag) {
              selectize.addOption({
                id: tag.tag_id,
                tag: tag.tag_name
              })
            })

          }
        }
      });
    }
  });
  $('#filterTags').selectize({
    plugins: ['restore_on_backspace'],
    persist: false,
    createOnBlur: true,
    searchField: "tag",
    valueField: "tag",
    labelField: "tag",
    create: true,
    options: [],
    onInitialize: function() {
      console.log("onInitialize called===");
      var selectize = this;
      var url = "http://localhost:3000/tags"
      $.ajax({
        url: url,
        method: "GET",
        dataType: 'json',
        contentType: "application/json",
        success: function(data) {
          console.log("tag data =", data);
          if (data.Status == 200) {
            data.Data.forEach(function(tag) {
              selectize.addOption({
                id: tag.tag_id,
                tag: tag.tag_name
              })
            })

          }
        }
      });
    }
  });
  $("#startDate").datepicker({
    dateFormat: 'yy-mm-dd'
  });
  $("#endDate").datepicker({
    dateFormat: 'yy-mm-dd'
  });
  $("#eventDate").datepicker({
    dateFormat: 'yy-mm-dd'
  });
  $('#startTime').timepicker({
    timeFormat: 'HH:mm:ss'
  });
  $('#endTime').timepicker({
    timeFormat: 'HH:mm:ss'
  });
  $('#eventTime').timepicker({
    timeFormat: 'HH:mm:ss'
  });
  $('#selectState').selectize({
    create: true,
    sortField: {
      field: 'text',
      direction: 'asc'
    },
    dropdownParent: 'body'
  });
  addFilter()
  getStates()
})


function autoFill() {
  console.log("autoFIll called");
  var state = document.getElementById("selectState").value
  console.log("state selected =", state);
  var currentState = userStates[state];
  console.log("currentState=", currentState);

  document.getElementById("filterLocation").value = currentState.area_name;
  //document.getElementById("filterTags").value=currentState.tags;
  document.getElementById("noteType").value = currentState.user_type;
  document.getElementById("eventDate").value = currentState.event_date;
  document.getElementById("eventTime").value = currentState.event_time;

  var $select = $("#filterTags").selectize();
  var selectize = $select[0].selectize;
  if (currentState.tags) {
    console.log("selectize =", selectize);
    var tags = currentState.tags.split(",")
    selectize.setValue(tags)
  }
  else{
    selectize.clear()
  }


}

function toggleTab(tabId) {

  if (tabId == 1) {
    document.getElementById("friendsTab").classList.add("active");
    document.getElementById("friendRequestsTab").classList.remove("active");
    document.getElementById("newsFeedTab").classList.remove("active");
    document.getElementById("statusTab").classList.remove("active");

    document.getElementById("friendsForm").style.display = "block";
    document.getElementById("friendRequestsForm").style.display = "none";
    document.getElementById("newsFeedForm").style.display = "none";
    document.getElementById("statusForm").style.display = "none";

  } else if (tabId == 2) {
    document.getElementById("friendsTab").classList.remove("active");
    document.getElementById("friendRequestsTab").classList.add("active");
    document.getElementById("newsFeedTab").classList.remove("active");
    document.getElementById("statusTab").classList.remove("active");

    document.getElementById("friendsForm").style.display = "none";
    document.getElementById("friendRequestsForm").style.display = "block";
    document.getElementById("newsFeedForm").style.display = "none";
    document.getElementById("statusForm").style.display = "none";

  } else if (tabId == 3) {
    document.getElementById("friendsTab").classList.remove("active");
    document.getElementById("friendRequestsTab").classList.remove("active");
    document.getElementById("newsFeedTab").classList.add("active");
    document.getElementById("statusTab").classList.remove("active");

    document.getElementById("friendsForm").style.display = "none";
    document.getElementById("friendRequestsForm").style.display = "none";
    document.getElementById("newsFeedForm").style.display = "block";
    document.getElementById("statusForm").style.display = "none";

  } else if (tabId == 4) {
    document.getElementById("friendsTab").classList.remove("active");
    document.getElementById("friendRequestsTab").classList.remove("active");
    document.getElementById("newsFeedTab").classList.remove("active");
    document.getElementById("statusTab").classList.add("active");

    document.getElementById("friendsForm").style.display = "none";
    document.getElementById("friendRequestsForm").style.display = "none";
    document.getElementById("newsFeedForm").style.display = "none";
    document.getElementById("statusForm").style.display = "block";
  }
}
