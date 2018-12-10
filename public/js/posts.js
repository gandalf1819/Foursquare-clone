$(document).ready(function() {
  toggleTab(1);
  $('#input-tags').selectize({
    plugins: ['restore_on_backspace'],
    persist: false,
    createOnBlur: true,
    create: true
  });
  $('#filterTags').selectize({
    plugins: ['restore_on_backspace'],
    persist: false,
    createOnBlur: true,
    create: true
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
})




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
