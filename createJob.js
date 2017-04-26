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
    var uid, imageName;
    var jobCategories = ["Accounting", "Administrative / Clerical", "Advertising / Promotion / PR",
        "Agriculture / Forestry", "Airlines / Tourism", "Architecture / Interior Design", "Arts / Design",
        "Auditing", "Auto / Automotive", "Banking", "Chemical / Biochemical", "Civil / Construction",
        "Consulting", "Customer Service", "Doctors", "Doctors / Nurses", "Education / Training",
        "Electrical / Electronics", "Entry Level", "Environment / Waste Services", "Executive Management",
        "Expatriate jobs in Vietnam", "Export-Import", "Fashion / Lifestyle", "Geology / Mineral",
        "Finance / Investment", "FMCG", "Food & Beverage", "Freight / Logistics", "Health / Medical Care",
        "High Technology", "Household", "HSE", "Human Resources", "HVAC", "Industrial Products", "Insurance",
        "Internet / Online Media", "Interpreter / Translator", "IT - Hardware / Networking", "IT - Software",
        "Legal / Contracts", "Luxury Goods", "Maintenance", "Marine", "Marketing", "Mechanical",
        "Merchandising / Purchasing / Supply Chain", "NGO / Non-Profit", "Oil / Gas", "Overseas Jobs",
        "Pharmaceutical / Biotech", "Pharmaceutical representatives", "Pharmacist", "Planning / projects",
        "Printing", "Production / Process", "QA / QC", "Real Estate", "Restaurant / Hotel",
        "Retail / Wholesale", "Sales", "Sales Technical", "Securities & Trading", "Telecommunications",
        "Temporary / Contract", "Textiles / Garments / Footwear", "TV / Media / Newspaper", "Warehouse", "Others"
    ];


    var uploader = document.getElementById('uploader');
    var fileButton = document.getElementById('upload_button');
    var image = document.getElementById('job_image');
    var submitButton = document.getElementById('submit_button');
    var txtUsername= document.getElementById('username');
    var txtPassword= document.getElementById('password');
    var btnLogin= document.getElementById('login_button');

    //Fields
    var title = document.getElementById('job_title');
    var companyName = document.getElementById('job_company');
    var category = document.getElementById('job_category_dropdown');
    var employmentType = document.getElementById('job_employment_dropdown');
    var location = document.getElementById('job_location');
    var payMin = document.getElementById('job_min_pay');
    var payMax = document.getElementById('job_max_pay');
    var bounty = document.getElementById('job_bounty');
    var description = document.getElementById('job_description');


    for(var i=0; i<jobCategories.length; i++)
    {

        $('#category_drop').append('<li><a href="#">' + jobCategories[i] + '</a></li>');
    }

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

        file.name = firebase.database().ref().child('job').push().key;

        //create storage ref
        storageRef = firebase.storage().ref(uid);

        imageName = file.name;

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
                image.src=task.snapshot.downloadURL;
                imageUrl = task.snapshot.downloadURL;
            }
        );
    });

    submitButton.addEventListener('click', function () {

        if(auth.currentUser) {

            //var imageName = imageUrl.substring(imageUrl.lastIndexOf('/'), imageUrl.lastIndexOf('?'));

            var key = jobRef.push().key;
            console.log('1');
            jobRef.child(key).set({
                id: 'admin',
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
    });

    function changeUi(bool)
    {
        title.disabled = bool;
        companyName.disabled = bool;
        firstCat.disabled = bool;
        secondCat.disabled = bool;
        employmentType.disabled = bool;
        location.disabled = bool;
        payMin.disabled = bool;
        payMax.disabled = bool;
        bounty.disabled = bool;
        description.disabled = bool;
        fileButton.disabled = bool;
        submitButton.disabled = bool;
    };

});

$(function(){

    $("#category_drop li a").click(function(){

        $("#job_category_dropdown:first-child").text($(this).text());
        $("#job_category_dropdown:first-child").val($(this).text());

    });
});

$(function(){

    $("#employment_drop li a").click(function(){

        $("#job_employment_dropdown:first-child").text($(this).text());
        $("#job_employment_dropdown:first-child").val($(this).text());

    });
});