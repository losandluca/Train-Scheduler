// Initialize Firebase
var config = {
    apiKey: "AIzaSyCiJRW1LSebHXvIxDYepo3YdvKvGyHpv3E",
    authDomain: "train-scheduler-6dcc0.firebaseapp.com",
    databaseURL: "https://train-scheduler-6dcc0.firebaseio.com",
    projectId: "train-scheduler-6dcc0",
    storageBucket: "",
    messagingSenderId: "125573925361"
  };
  firebase.initializeApp(config);

  var trainDatabase = firebase.database();

  $("#add-train-button").on("click", function(){

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainTime = $("#train-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var newTrainAdded = {
        name: trainName,
        destination : destination,
        trainTime: trainTime,
        frequency: frequency
    };

    trainDatabase.ref().push(newTrainAdded);

    console.log(trainName) ;
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

    alert("Your Train has been added");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");

    return false;
});

trainDatabase.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var tableName = childSnapshot.val().name;
    var tableDestination = childSnapshot.val().destination;
    var tableFrequency = childSnapshot.val().frequency;
    var tableTrainTime = childSnapshot.val().trainTime;
    if(tableTrainTime === "") {
       console.log("Invalid Input");
       return;
    }

    var arrivalTime  = tableTrainTime.split(":");
    var trainTime = moment().hours(arrivalTime[0]).minutes(arrivalTime[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var trainMinutes;
    var trainArrival;

    console.log("Train Time Message",trainTime);
    if(maxMoment === trainTime) {
        trainArrival = trainTime.format("hh:mm A");
        trainMinutes = trainTime.diff(moment(), "minutes");
    } else {
        var timeDifference = moment().diff(trainTime, "minutes");
        var trainReminder = timeDifference % tableFrequency;
        trainMinutes = tableFrequency - trainReminder;

        trainArrival = moment().add(trainMinutes, "m").format("hh:mm A");
    }

    console.log("trainMinutes:", trainMinutes);
    console.log("trainArrival:", trainArrival);

    $("#train-table > tbody").append("<tr><td>" + tableName + 
    "</td><td>" + tableDestination + "</td><td>" + tableFrequency +
    tableFrequency + "</td><td>" + trainArrival + "</td><td>" +trainMinutes +
    "</td><tr>");
});
  