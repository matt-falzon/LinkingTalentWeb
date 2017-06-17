/**
 * Created by mattf on 12/04/2017.
 */
$(document).ready(function()
{
    const auth = firebase.auth();
    var rootRef = firebase.database().ref().child('job');

    var storage = firebase.storage();
    var storageRef = storage.ref();
    var uid;
    var href = window.top.location.href;

    var job = href.split("=")[1];

    var jobRef = rootRef.child(job);

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

    var submitButton = document.getElementById('submit_button');
    var txtUsername= document.getElementById('username');
    var txtPassword= document.getElementById('password');
    var btnLogin= document.getElementById('login_button');
    var fileButton = document.getElementById('upload_button');
    var uploader = document.getElementById('uploader');

    var company, title, payMax, payMin, bounty, location, employmentType, imageUrl, desc, key, category, imageName;

    var job_title = document.getElementById('job_title');
    var job_company = document.getElementById('job_company');
    var job_category = document.getElementById('job_category_dropdown');
    var job_location = document.getElementById('job_location');
    var job_payMin = document.getElementById('job_pay_min');
    var job_payMax = document.getElementById('job_pay_max');
    var job_bounty = document.getElementById('job_bounty');
    var job_description = document.getElementById('job_description');
    var job_submit = document.getElementById('submit_button');
    var job_employment = document.getElementById('job_employment_dropdown');
    var job_image = document.getElementById('job_image');

    jobRef.on('value', snap => {

        company = snap.child('company').val();
        title = snap.child('title').val();
        payMax = snap.child('payMax').val();
        payMin = snap.child('payMin').val();
        bounty = snap.child('bounty').val();
        location = snap.child('location').val();
        employmentType = snap.child('employmentType').val();
        imageUrl = snap.child('imageUrl').val();
        desc = snap.child('description').val();
        category = snap.child('category').val();
        key = snap.child('key').val();
        imageUrl = snap.child('imageUrl').val();

        if(imageUrl == null)
        {
            imageUrl = 'images/lt_symbol.png';
        }

        job_title.value = title;
        job_company.value = company;
        job_image.src=imageUrl;
        $("#job_employment_dropdown:first-child").text(employmentType);
        $("#job_employment_dropdown:first-child").val(employmentType);
        $("#job_category_dropdown:first-child").text(category);
        $("#job_category_dropdown:first-child").val(category);
        job_location.value = location;
        job_payMin.value = payMin;
        job_payMax.value = payMax;
        job_bounty.value = bounty;
        job_description .value = desc;

    });

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

    function changeUi(bool)
    {
        job_title.disabled = bool;
        job_company.disabled = bool;
        job_category.disabled = bool;
        job_location.disabled = bool;
        job_payMin.disabled = bool;
        job_payMax.disabled = bool;
        job_bounty.disabled = bool;
        job_description.disabled = bool;
        job_submit.disabled = bool;
        job_employment.disabled = bool;
    };

    //file upload
    fileButton.addEventListener('change', function(e){
        //alert('click')
        //get file
        var file = e.target.files[0];

        imageName = file.name;

        //file.name = firebase.database().ref().child('job').push().key;

        //create storage ref
        storageRef = firebase.storage().ref(uid);

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
                job_image.src=task.snapshot.downloadURL;
                imageUrl = task.snapshot.downloadURL;
            }
        );
    });

    submitButton.addEventListener('click', function () {

        if(auth.currentUser) {

            imageUrl = job_image.getAttribute('src');

            //var imageName = job_image.src.substring(imageUrl.lastIndexOf('/'), job_image.src.lastIndexOf('?'));

            //var category = document.getElementById('job_category').value;


            payMax = job_payMax.value;
            payMin = job_payMin.value;
            title = job_title.value;
            company = job_company.value;
            bounty = job_bounty.value;
            location = job_location.value;
            desc = job_description.value;
            employmentType = job_employment.value;

            /*

            console.log(uid + '\n'
                + 'title: '+ title + '\n'
                + 'key: '+ key + '\n'
                + 'company: '+ company + '\n'
                + 'cat1: '+ cat1 + '\n'
                + 'cat2: '+ cat2 + '\n'
                + 'payMin: '+ payMin + '\n'
                + 'payMax: '+ payMax + '\n'
                + 'bounty: '+ bounty + '\n'
                + 'location: '+ location + '\n'
                + 'desc: '+ desc + '\n'
                + 'imageUrl: '+ imageUrl + '\n'
                + 'imageName: '+ imageName + '\n'
                + 'employmentType: '+ employmentType + '\n');
             */

            var dbRef = firebase.database().ref('job');

            dbRef.child(key).set({
                id: uid,
                title: title,
                company: company,
                category: category,
                payMin: Number(payMin),
                payMax: Number(payMax),
                bounty: Number(bounty),
                location: location,
                description: desc,
                imageUrl: imageUrl,
                //imageName: imageName,
                employmentType: employmentType,
                key: key
            });

            window.open('view_job.html?j=' + key, '_self', false)

        }
        else
        {
            alert('You must log in to create a job');
        }
    });

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
