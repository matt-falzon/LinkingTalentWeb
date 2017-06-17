$(document).ready(function()
{
    var rootRef = firebase.database().ref().child('job');

    var storage = firebase.storage();
    var storageRef = storage.ref();

    var href = window.top.location.href;
    var txtUsername= document.getElementById('username');
    var txtPassword= document.getElementById('password');
    var btnLogin= document.getElementById('login_button');
    var job = href.split("=")[1];

    var jobRef = rootRef.child(job);

    jobRef.on('value', snap => {

        var company = snap.child('company').val();
        var title = snap.child('title').val();
        var payMax = snap.child('payMax').val();
        var payMin = snap.child('payMin').val();
        var bounty = snap.child('bounty').val();
        var location = snap.child('location').val();
        var employmentType = snap.child('employmentType').val();
        var imageUrl = snap.child('imageUrl').val();
        var desc = snap.child('description').val();
        var category = snap.child('category').val();

        if(imageUrl == null)
        {
          imageUrl = 'images/lt_symbol.png';
        }

        document.getElementById('job_title').innerHTML = title;
        document.getElementById('employer_name').innerHTML = company;
        document.getElementById('job_image').src=imageUrl;
        document.getElementById('employment_type').innerHTML = employmentType;
        document.getElementById('job_category').innerHTML = category;
        document.getElementById('job_location').innerHTML = location;
        document.getElementById('job_pay').innerHTML = '$' + payMin + ' - $' + payMax;
        document.getElementById('job_bounty').innerHTML = '$' + bounty;
        document.getElementById('job_description').innerHTML = desc;

    });

    firebase.auth().onAuthStateChanged(firebaseUser =>{
       if(firebaseUser)
       {
           console.log("logged in");
           btnLogin.innerHTML = "Logout"
           txtUsername.style.visibility = "hidden";
           txtPassword.style.visibility = "hidden";
           //changeUi(false);
           uid = firebaseUser.uid;
       }
       else
       {
           console.log("logged out");
           btnLogin.innerHTML="Login";
           txtUsername.style.visibility = "visible";
           txtPassword.style.visibility = "visible";
           //changeUi(true);
       }
    });

});
