 var config = {
      apiKey: "AIzaSyAiITsb7h6nBLIWddN8Orjn3jB80Ansdr8",
    authDomain: "fire-6f724.firebaseapp.com",
    databaseURL: "https://fire-6f724.firebaseio.com",
    projectId: "fire-6f724",
    storageBucket: "",
    messagingSenderId: "193661786114"
    };
    firebase.initializeApp(config);

    var database = firebase.database();


     var name = "";
     var destination = "";
     var frequency = 0;
    var time = 0;
    var minutes = 0;



    var trainName = "";
     var destination = "";
     var firstTrainTime = "";
     var trainFrequency = "";

    $("#add-train-btn").on("click", function(event) {
        event.preventDefault();

        var name = $("#train-name").val().trim();
        var place = $("#train-destination").val().trim();
        var startTime = $("#first-train-time").val().trim();
        var frequency = $("#train-frequency").val().trim();

        var newTrain = {
            name: name,
            destination: place,
            firstTrainTime: startTime,
            trainFrequency: frequency
        };

        database.ref().push(newTrain);

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.firstTrainTime);
        console.log(newTrain.trainFrequency);

        // Clears all of the text-boxes
        $("#train-name").val("");
        $("#train-destination").val("");
        $("#first-train-time").val("");
        $("#train-frequency").val("");

       
    });

    database.ref().on("child_added", function(childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var firstTrainTime = childSnapshot.val().firstTrainTime;
        var trainFrequency = childSnapshot.val().trainFrequency;

        /

        console.log(firstTrainTime);

        var convertedDate = moment(firstTrainTime, "hh:mm a");
        console.log("Converted Time: " + convertedDate + " Type of: " + typeof convertedDate);

        var newMinutes = moment(convertedDate).minutes();
        console.log("Minutes: " + newMinutes + " Type of: " + typeof newMinutes);

]        var firstTimeConverted = moment(firstTrainTime, "hh:mm a").subtract(1, "years");
        console.log("Updated Time: " + firstTimeConverted + " Type of: " + typeof firstTrainTime);

    
        var diffTime = moment().diff(moment(firstTimeConverted), "m");
        console.log("DIFFERENCE IN TIME: " + diffTime + " Type of Difference " + typeof diffTime);

        var tRemainder = diffTime % trainFrequency;
        console.log(tRemainder);

        var minutes = trainFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + minutes);

        
        var nextTrain = moment().add(minutes, "m").format("hh:mm a");
        console.log("ARRIVAL TIME: " + moment().format("hh:mm a"));
        $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + minutes + "</td><td>");

    });