/**
 * Created by mattf on 7/04/2017.
 */
$(document).ready(function()
{
    const auth = firebase.auth();

    var rootRef = firebase.database().ref().child('job');
    var storage = firebase.storage();
    var storageRef, file, imageUrl;
    var database = firebase.database();
    var jobRef = database.ref('job');

    var uploader = document.getElementById('uploader');
    var fileButton = document.getElementById('upload_button');
    var image = document.getElementById('job_image');
    var submitButton = document.getElementById('submit_button');
    var txtUsername= document.getElementById('username');
    var txtPassword= document.getElementById('password');
    var btnLogin= document.getElementById('login_button');

    //user login
    btnLogin.addEventListener('click', e => {
        //if user is already logged in
        if(auth.currentUser)
        {
            auth.signOut();
        }
        else//no user logged in
        {
            const email = txtUsername.value;
            const pass = txtPassword.value;

            const promise = auth.signInWithEmailAndPassword(email, pass);

            promise.catch(e => console.log(e.message));
        }

    });

    firebase.auth().onAuthStateChanged(firebaseUser =>{
       if(firebaseUser)
       {
           console.log("logged in");
           btnLogin.innerHTML = "Logout"
           txtUsername.style.visibility = "hidden";
           txtPassword.style.visibility = "hidden";
       }
       else
       {
           console.log("logged out");
           btnLogin.innerHTML="Login";
           txtUsername.style.visibility = "visible";
           txtPassword.style.visibility = "visible";
       }
    });

    //file upload
    fileButton.addEventListener('change', function(e){
        //alert('click')
        //get file
        file = e.target.files[0];

        file.name = firebase.database().ref().child('job').push().key;

        //create storage ref
        storageRef = firebase.storage().ref(file.name);

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
                console.log(err);
            },

            function complete()
            {
                image.src=task.snapshot.downloadURL;
                imageUrl = task.snapshot.downloadURL;
            }
        );
    });

    submitButton.addEventListener('click', function () {
        //alert('click');
        //if statement to go here
        var title = document.getElementById('job_title');
        var companyName = document.getElementById('job_company');
        var firstCat = document.getElementById('job_cat1');
        var secondCat = document.getElementById('job_cat2');
        var employmentType = document.getElementById('job_employment_dropdown');
        var location = document.getElementById('job_location');
        var payMin = document.getElementById('job_min_pay');
        var payMax = document.getElementById('job_max_pay');
        var bounty = document.getElementById('job_bounty');
        var description = document.getElementById('job_description');

        var imageName = imageUrl.substring(imageUrl.lastIndexOf('/'), imageUrl.lastIndexOf('?'));

        var key = jobRef.push().key;

        jobRef.child(key).set({
            id: 'admin',
            title: title.value,
            company: companyName.value,
            firstCategory: firstCat.value,
            secondCategory: secondCat.value,
            payMin: Number(payMin.value),
            payMax: Number(payMax.value),
            bounty: Number(bounty.value),
            location: location.value,
            description: description.value,
            imageUrl: imageUrl,
            imageName: imageName,
            employmentType: employmentType.value,
            key: key
        });

        window.open ('file:///C:/Users/mattf/OneDrive/Documents/GitHub/LinkingTalentWeb/view_job.html?j='+key,'_self',false)
    });
});

$(function(){

    $(".dropdown-menu li a").click(function(){

        $(".btn:first-child").text($(this).text());
        $(".btn:first-child").val($(this).text());
    });

});