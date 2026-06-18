// =========================
// GLOBAL VARIABLES
// =========================

const API_URL = window.location.origin;

let selectedFile = null;
let connectionStatus = "unknown";

let detectionHistory =
  JSON.parse(localStorage.getItem("detectionHistory")) || [];

// =========================
// DOM ELEMENTS
// =========================

const uploadArea = document.getElementById("uploadArea");
const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const previewImg = document.getElementById("previewImg");

const removeImageBtn = document.getElementById("removeImage");

const testConnectionBtn = document.getElementById("testConnection");
const connectionStatusEl = document.getElementById("connectionStatus");

const predictBtn = document.getElementById("predictBtn");
const resetBtn = document.getElementById("resetBtn");

const errorMessage = document.getElementById("errorMessage");
const errorText = document.getElementById("errorText");

const loadingState = document.getElementById("loadingState");
const emptyState = document.getElementById("emptyState");

const resultsContent = document.getElementById("resultsContent");


// =========================
// INITIALIZATION
// =========================

document.addEventListener("DOMContentLoaded", () => {

    initializeDetection();

    setTimeout(() => {

        testConnection();

    },1000);

});


// =========================
// INITIALIZE
// =========================

function initializeDetection(){

    if(!uploadArea) return;

    imageInput.addEventListener("change", handleFileSelect);

    uploadArea.addEventListener("click", () => {

        imageInput.click();

    });

    uploadArea.addEventListener("dragover",(e)=>{

        e.preventDefault();

        uploadArea.classList.add("dragover");

    });

    uploadArea.addEventListener("dragleave",()=>{

        uploadArea.classList.remove("dragover");

    });

    uploadArea.addEventListener("drop",(e)=>{

        e.preventDefault();

        uploadArea.classList.remove("dragover");

        const files = e.dataTransfer.files;

        if(files.length>0){

            handleFile(files[0]);

        }

    });


    if(removeImageBtn){

        removeImageBtn.addEventListener("click",(e)=>{

            e.stopPropagation();

            resetImage();

        });

    }


    if(testConnectionBtn){

        testConnectionBtn.addEventListener(

            "click",

            testConnection

        );

    }


    if(predictBtn){

        predictBtn.addEventListener(

            "click",

            handlePredict

        );

    }

    if(resetBtn){

        resetBtn.addEventListener(

            "click",

            resetForm

        );

    }

}


// =========================
// FILE UPLOAD
// =========================

function handleFileSelect(e){

    const file = e.target.files[0];

    if(file){

        handleFile(file);

    }

}


function handleFile(file){

    const allowedTypes = [

        "image/jpeg",

        "image/jpg",

        "image/png",

        "image/bmp",

        "image/gif"

    ];


    if(!allowedTypes.includes(file.type)){

        showError(

            "Upload a banana leaf image."

        );

        return;

    }


    if(file.size > 10*1024*1024){

        showError(

            "File size must be less than 10MB."

        );

        return;

    }


    selectedFile = file;


    const reader = new FileReader();


    reader.onload = function(e){

        previewImg.src = e.target.result;

        imagePreview.style.display = "block";

        uploadArea.querySelector(

            ".upload-content"

        ).style.display="none";

        predictBtn.disabled=false;

        hideError();

    };


    reader.readAsDataURL(file);

}


function resetImage(){

    selectedFile = null;

    imageInput.value = "";

    previewImg.src = "";

    imagePreview.style.display="none";

    uploadArea.querySelector(

        ".upload-content"

    ).style.display="block";

    predictBtn.disabled=true;

}


function resetForm(){

    resetImage();

    hideResults();

    hideError();

}


// =========================
// TEST CONNECTION
// =========================

async function testConnection(){

    try{

        testConnectionBtn.disabled=true;

        testConnectionBtn.innerHTML=

        '<i class="fas fa-spinner fa-spin"></i> Testing...';


        const response = await fetch(

            `${API_URL}/health`

        );


        if(!response.ok){

            throw new Error(

                "Backend not responding"

            );

        }


        const data = await response.json();


        if(data.model_loaded){

            setConnectionStatus(

                "connected"

            );

        }

        else{

            setConnectionStatus(

                "disconnected"

            );

            showError(

                "Backend running but model not loaded."

            );

        }


    }

    catch(err){

        console.log(err);

        setConnectionStatus(

            "disconnected"

        );

    }

    finally{

        testConnectionBtn.disabled=false;

        testConnectionBtn.innerHTML=

        '<i class="fas fa-wifi"></i> Test Connection';

    }

}



// =========================
// CONNECTION STATUS
// =========================

function setConnectionStatus(status){

    connectionStatus=status;

    connectionStatusEl.className=

    `status-indicator ${status}`;


    if(status==="connected"){

        connectionStatusEl.innerHTML=

        '<i class="fas fa-circle"></i> Connected';

    }

    else{

        connectionStatusEl.innerHTML=

        '<i class="fas fa-circle"></i> Disconnected';

    }

}



// =========================
// PREDICT
// =========================

async function handlePredict(){

    if(!selectedFile){

        showError(

            "Please upload an image first."

        );

        return;

    }


    showLoading();

    hideError();


    const formData = new FormData();

    formData.append(

        "image",

        selectedFile

    );


    try{

        const response = await fetch(

            `${API_URL}/predict`,

            {

                method:"POST",

                body:formData

            }

        );


        const data = await response.json();


        if(!response.ok){

            throw new Error(

                data.error ||

                "Prediction failed"

            );

        }


        showResults(data);

        setConnectionStatus(

            "connected"

        );


        const historyItem={

            id:Date.now(),

            timestamp:new Date().toISOString(),

            filename:selectedFile.name,

            result:data

        };


        detectionHistory.unshift(

            historyItem

        );


        detectionHistory =

        detectionHistory.slice(0,50);


        localStorage.setItem(

            "detectionHistory",

            JSON.stringify(

                detectionHistory

            )

        );


    }

    catch(err){

        console.error(err);

        showError(

            err.message

        );

        setConnectionStatus(

            "disconnected"

        );

    }

    finally{

        hideLoading();

    }

}



// =========================
// RESULTS
// =========================

function showResults(data){

    emptyState.style.display="none";

    loadingState.style.display="none";

    resultsContent.style.display="block";


    document.getElementById(

        "diseaseName"

    ).textContent=

    data.disease;


    document.getElementById(

        "confidence"

    ).textContent=

    `Confidence : ${data.confidence}`;


    document.getElementById(

        "causesText"

    ).textContent=

    data.causes || "";


    document.getElementById(

        "preventionText"

    ).textContent=

    data.prevention || "";

}


function hideResults(){

    resultsContent.style.display="none";

    emptyState.style.display="block";

}



// =========================
// LOADING
// =========================

function showLoading(){

    loadingState.style.display="block";

    emptyState.style.display="none";

    resultsContent.style.display="none";

}


function hideLoading(){

    loadingState.style.display="none";

}



// =========================
// ERRORS
// =========================

function showError(message){

    errorText.textContent=message;

    errorMessage.style.display="flex";

}


function hideError(){

    errorMessage.style.display="none";

}