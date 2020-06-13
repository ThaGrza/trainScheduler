require('dotenv').config()

// Initilizes firebase.
const config = {
    apiKey: APIKEY,
    authDomain: "newjuneproj.firebaseapp.com",
    databaseURL: "https://newjuneproj.firebaseio.com",
    projectId: "newjuneproj",
    storageBucket: "newjuneproj.appspot.com",
    messagingSenderId: SENDERID,
    appId: APPID
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

    
    // // Writes data to html.
    // $("#trainSched").append(
    //     "<tr>" + "<td>" + newTrain +
    //     "</td><td" + newDest +
    //     "</td><td" + newTime +
    //     "</td><td" + newFreq +
    //     "</td><td" + minsAway + "</td></tr>"
    // );

    var trainAppend = "<tr>" + "<td>" + newTrain + "<td>" + newDest + "<td>" + newTime + "<td>" + newFreq + "<td>" + minsAway + "</td></tr>";

    $("#trainSched").append(trainAppend);
        





});
