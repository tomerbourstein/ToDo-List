// 1. create a Light Mode and Dark Mode switch.
// 2. print to the console every new todo.
// 3. add that new todo to the list.
// 4. when an assigment is checked, change style so it would appear deleted. ----- DONE
// 5. create a filter for checked, unchecked and all with the links at the bottom nav bar.
// 6. create a countdown of assigment left that is still active at the bottom left.
// 7. clear from the console the assigments that are checked after clicking remove at bottom right.
// 8. when hovering over an assigment reapear the delete button.
// 9. clicking the delete button deltes one assigment from the list.
// 10. Dark mode and Light mode changes the Moon and Sun image respectively. ----- DONE all is left to refresh the image when theme mode changes.


var themeImageSource = $('.toggleMode').attr("src", '\images/icon-sun.svg');
var mqL = window.matchMedia('(prefers-color-scheme: dark)');
var inputValue = $("#newAssignment").val();
var numberOfLi = $("#list li").length;




// create a box of new assignment.
function createNewDiv(inputValue) {
  // variables for duplicating the new assignment box with all classes.
  var li = $(`<li class=" list-group-item assignmentDiv"></li"`)
  var div = $(`<div class="innerDivGroup"></div>`)
  var input = $(`<input class="checkboxRoundAndStyle" type="checkbox" name="checkbox">`)
  var span = $(`<span class="assigmentText countLi"></span>`);
  var a = $(`<a class=" crossImage crossImageNoDisplay" href="javascript:void(0)"> <img class="changeSize" src="images/icon-cross.svg" alt="delete todo button."> </a>"`)


  // if statment that prevent empty press on the ENTER key.
  // creating the duplication of the elements from the variables above in a fade in of 350 ms.
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    span.append(inputValue);
    div.append(input, span);
    li.hide().append(div, a).fadeIn(350);
    $("#list").append(li);
    numberOfLi++;
  }

  // when called, change the number of assignment left to number of unchecked boxes.
  boxCounter();


  // looping through every new assignment adding event listener on mouseover and mouseout.
  // changing it sibling anchor to display the cross Image.
  for (i = 0; i < numberOfLi; i++) {
    $(".assignmentDiv").mouseover(function() {
      $(this).find("a").removeClass("crossImageNoDisplay");
    });

    $(".assignmentDiv").mouseout(function() {
      $(this).find("a").addClass("crossImageNoDisplay");
    });
  }


  // every checkbox that is checked changing the style of its sibling Span to look checked
  // and changing the number of unchecked boxes on every press.
  $(".checkboxRoundAndStyle").change(function() {
    var sibling = $(this).next();
    var parent = $(this).parent().parent();
    if (this.checked) {
      sibling.addClass("itemIsChecked").removeClass("countLi");
      parent.addClass("crossedItem");
    } else {
      sibling.removeClass("itemIsChecked").addClass("countLi");
      parent.removeClass("crossedItem");
    }
    boxCounter();
  });


  // event listener on crossImage the removing the parent box of the clicked cross in a 300 ms fade out.
  // and changing the number of items left on the list.
  $(".crossImage").click(function() {
    $(this).parent().fadeOut(300, function() {
      $(this).remove();
      boxCounter();
      numberOfLi--
    });
  });
}


// changes the counter of the unchecked assignments. if the counter is 0 changes to "No items left".
function boxCounter() {
  var uncheckedAssignments = $('#list .countLi').length;
  if (uncheckedAssignments === 0) {
    $(".howManyLeft").text("No items left");
  } else {
    $(".howManyLeft").text(uncheckedAssignments + " items left");
  }
}

// event listener on changing inputValue.
// $("#newAssignment").change(function() {
// });

// event listener on keyprees if ENTER key that calls createNewDiv(), prevents clicking ENTER again, clearing the input.
// else giving inputValue the new event value and waiting for ENTER keyprees.
$("#newAssignment").keypress(function(event) {
  if (event.keyCode === 13) {
    createNewDiv(inputValue);
    event.currentTarget.value = "";
    event.preventDefault();
    inputValue = "";
  } else {
    inputValue = $(this).val();

  }
});




// checking the prefers-color-scheme if it is dark and calling changeThemeImage().
if (mqL.matches === true) {
  changeThemeImage();
}


// changes the Theme Image to moon
function changeThemeImage() {
  $('.toggleMode').attr("src", '\images/icon-moon.svg');
}



// looping through every new assignment adding event listener on mouseover and mouseout.
// changing it sibling anchor to display the cross Image.
var i;
for (i = 0; i < numberOfLi; i++) {
  $(".assignmentDiv").mouseover(function() {
    $(this).find("a").removeClass("crossImageNoDisplay");
  });

  $(".assignmentDiv").mouseout(function() {
    $(this).find("a").addClass("crossImageNoDisplay");
  });
}


// event on clicking on the filter bar.
// active hiding all checked boxes and changing style to text, removing other filter's style.
$(".activeState").click(function() {
  $(".allState, .clickToRemove").removeClass("filterPressed");
  $(".activeState").addClass("filterPressed");
  $("#list > .assignmentDiv").show();
  $("#list > .crossedItem").hide();
});
// all displaying back all checked boxes and changing style to text, removing other filter's style.
$(".allState").click(function() {
  $(".activeState, .clickToRemove").removeClass("filterPressed");
  $(".allState").addClass("filterPressed");
  $("#list > .crossedItem").show();
  $("#list > .assignmentDiv").show();
});
// completed hiding all unchecked boxes and displaying all checked ones
// and changing style to text, removing other filter's style.
$(".clickToRemove").click(function() {
  $(".activeState, .allState").removeClass("filterPressed");
  $(".clickToRemove").addClass("filterPressed");
  $("#list > .assignmentDiv").hide();
  $("#list > .crossedItem").show();
});



// event listener on Completed anchor that remove all checked parent boxes.
$(".completedCounter").click(function() {
  $("#list > .crossedItem").fadeOut(300, function() {
    $(this).remove();
    numberOfLi = $("#list li").length;
  });
});


// turns the ul #list into a sortable list via mouse drag.
$(".list-group").sortable();
$(".list-group").disableSelection();
