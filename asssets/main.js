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

  })