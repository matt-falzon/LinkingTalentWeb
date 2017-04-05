var mainText = document.getElementById("mainText");
var mainButton = document.getElementById("button");
var textArea = document.getElementById("theText");

var firebaseUserRef = firebase.database().ref().child("test");


firebaseUserRef.on('value', function(dataSnapshot){

var test = dataSnapshot.child("name").val();

    theText.innerText = test;
}); 

function buttonClick()
{
    //alert('hello');

    theText.innerText='hello';
    
    var firebaseRef = firebase.database().ref();



/*
firebaseUserRef.on('value', function(dataSnapshot){
    mainText.value = dataSnapshot;
});*/


}