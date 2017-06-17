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
    var fileRef = database.ref('files');

    var uid, fileName;

    var uploader = document.getElementById('uploader');
    var fileButton = document.getElementById('upload_button');
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
           changeUi(false);
           uid = firebaseUser.uid;
       }
       else
       {
           console.log("logged out");
           btnLogin.innerHTML="Login";
           txtUsername.style.visibility = "visible";
           txtPassword.style.visibility = "visible";
           changeUi(true);
       }
    });

    //file upload
    fileButton.addEventListener('change', function(e){
        //alert('click')
        //get file
        file = e.target.files[0];

        file.name = firebase.database().ref().child('files').push().key;

        //create storage ref
        storageRef = firebase.storage().ref(uid);

        fileName = file.name;

        //upload image
        var task = storageRef.child(file.name).put(file);

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
                //image.src = task.snapshot.downloadURL;
                //imageUrl = task.snapshot.downloadURL;
                fileRef.push({
                  name: fileName,
                  location: task.snapshot.downloadURL
                })
                alert('File submitted!')
            }
        );
    });

    /*
    submitButton.addEventListener('click', function () {

        if(imageUrl == undefined){
          imageUrl = 'https://firebasestorage.googleapis.com/v0/b/linking-talent-6b6cb.appspot.com/o/lt_symbol.PNG?alt=media&token=6a866108-a293-47c6-91b5-04f00e07b8c1';
          imageName = 'default'
        }


        console.log(imageUrl);
        if(auth.currentUser) {

            //var imageName = imageUrl.substring(imageUrl.lastIndexOf('/'), imageUrl.lastIndexOf('?'));

            var key = jobRef.push().key;
            console.log('1');
            jobRef.child(key).set({
                id: auth.currentUser.uid,
                title: title.value,
                company: companyName.value,
                category: category.value,
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
            console.log('2');
            window.open('view_job.html?j=' + key, '_self', false)
        }
        else
        {
            alert('You must log in to create a job');
        }
    }); */

    function changeUi(bool)
    {

        fileButton.disabled = bool;
        submitButton.disabled = bool;
    };

});
