var config = {
    apiKey: "AIzaSyCR9_lrc2GtL7IUlv8jFUVoQl4zSENOyYs",
    authDomain: "assignment7-d6dee.firebaseapp.com",
    databaseURL: "https://assignment7-d6dee.firebaseio.com",
    projectId: "assignment7-d6dee",
    storageBucket: "assignment7-d6dee.appspot.com",
    messagingSenderId: "217926590390"
};

firebase.initializeApp(config);

var database = firebase.database();

var userTrain = "";
var userDestination = "";
var userFirstTrain = "";
var userFrequency = "";
var userNextArrival = "";
var userMinutesAway = "";
var userFirstTrainHour = "";
var userFirstTrainMin = "";
var userCurrentTime = "";
var userNextTrain = "";


$("#submitButton").on("click", function (event) {
    event.preventDefault();

    userTrain = $("#newTrainName").val().trim();
    userDestination = $("#newDestination").val().trim();
    var tempuserFirstTrain = $("#newTime").val().trim();
    userFrequency = $("#newFrequency").val().trim();

    userFirstTrainHour = moment(tempuserFirstTrain, "HH:mm").hour();
    userFirstTrainMin = moment(tempuserFirstTrain, "HH:mm").minute();
    userFirstTrain = moment(tempuserFirstTrain, "HH:mm").subtract(1, "years");

    var tempCurrentTime = moment();
    userCurrentTime = moment(tempCurrentTime).format("HH:mm");

    var diffTime = moment().diff(moment(userFirstTrain), "minutes");

    var tRemainder = diffTime % userFrequency;

    var tMinutesTillTrain = userFrequency - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    userNextTrain = moment(nextTrain).format("hh:mm A");

    var temp = {
        TrainName: userTrain,
        Destination: userDestination,
        Frequency: userFrequency,
        MinutesAway: tMinutesTillTrain,
        NextArrival:userNextTrain
    }

    database.ref().push(temp);

    $("#newTrainName").val('');
    $("#newDestination").val('');
    $("#newTime").val('');
    $("#newFrequency").val('');

});


database.ref().on("child_added", function (childSnaphot) {
    $("#tablebody").append($("<tr><td>"
        + childSnaphot.val().TrainName + "</td><td>"
        + childSnaphot.val().Destination + "</td><td>"
        + childSnaphot.val().Frequency + "</td><td>"
        + childSnaphot.val().NextArrival + "</td><td>"
        + childSnaphot.val().MinutesAway
        + "</td></tr>"))

});

