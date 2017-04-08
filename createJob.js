/**
 * Created by mattf on 7/04/2017.
 */
$(document).ready(function()
{
    var rootRef = firebase.database().ref().child('job');
    var storage = firebase.storage();

    var uploader = document.getElementById('uploader');
    var fileButton = document.getElementById('upload_button');
    var image = document.getElementById('job_image');

    fileButton.addEventListener('change', function(e){
        //alert('click')
        //get file
        var file = e.target.files[0];

        //create storage ref
        var storageRef = firebase.storage().ref(file.name);

        //upload image
        var task = storageRef.put(file);

        //update progress bar
        task.on('state_changed',

            function progress(snapshot)
            {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploader.value = percentage;
            },

            function error(err)
            {

            },

            function complete()
            {
                image.src=task.snapshot.downloadURL;
            }
        );
    });

});

function addJob(dbRef, title, companyName, firstCat, secondCat, payMin, payMax, bounty, location, description, imageUrl, employmentType)
{
    var postData = {
        title: title,
        company: companyName,
        firstCategory: firstCat,
        secondCategory: secondCat,
        payMin: payMin,
        payMax: payMax,
        bounty: bounty,
        location: location,
        description: description,
        imageUrl: imageUrl,
        employmentType: employmentType
    }

    // Get a key for a new Post.
    var key = firebase.database().ref().child('posts').push().key;

    dbRef.push(postData);
}

$(function(){

    $(".dropdown-menu li a").click(function(){

        $(".btn:first-child").text($(this).text());
        $(".btn:first-child").val($(this).text());
    });

});