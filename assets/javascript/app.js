// require('dotenv').config();

// Initilizes firebase.
const config = {
    apiKey: "AIzaSyBzoKyrEIzS7-Qoas-R4byctux2dHrnNFM",
  authDomain: "train-scheduler-99d17.firebaseapp.com",
  databaseURL: "https://train-scheduler-99d17.firebaseio.com",
  projectId: "train-scheduler-99d17",
  storageBucket: "train-scheduler-99d17.appspot.com",
  messagingSenderId: "823432453940",
  appId: "1:823432453940:web:18b43fded6e5658a738f61",
  measurementId: "G-3XM3X3PCB2"
    };

firebase.initializeApp(config);

// Creates reference for firebase databse
var database = firebase.database();

// Sets initial values.
var tname = "";
var dest = "";
var trainTime = 0; 
var freq = 0;

// Pushes info to firebase when button is clicked.
$("#submit").on("click", function(event){
    event.preventDefault();
    tname = $("#trainName").val().trim();
    dest = $("#destination").val().trim();
    trainTime = $("#trainTime").val().trim();
    freq = $("#freq").val().trim();

    database.ref().push({
        train: tname,
        destination: dest,
        time: trainTime,
        frequency: freq
    });

    document.getElementById("train-form").reset();
});
// Writes to html with data from firebase.
database.ref().on("child_added", function(childSnapshot){
    var newTrain = childSnapshot.val().train;
    var newDest = childSnapshot.val().destination;
    var newTime = childSnapshot.val().time;
    var newFreq = childSnapshot.val().frequency;

    // Logic for getting time differentials.
    var convertedTime = moment(newTime, "hh:mm").subtract(1, "years");

    var currentTime = moment();

    var diffTime = moment().diff(moment(convertedTime), "minutes");

    var tDif = diffTime % newFreq;

    var minsAway = newFreq - tDif;

    var trainAppend = "<tr>" + "<td>" + newTrain + "<td>" + newDest + "<td>" + newFreq + "<td>" + newTime + "<td>" + minsAway + "</td></tr>";

    $("#trainSched").append(trainAppend);
        





});
