console.log('appOfMain');
const myform = document.getElementById('myFormForFile');
console.log(myform);

const file = document.getElementById('id_file');
console.log(file);

const alertBox = document.getElementById('alert-box');
const fileBox = document.getElementById('show_box');
const bar = document.getElementById('bar');

const closeBox = document.getElementById('closeBox');
const CancelBtn = document.getElementById('CancelBtn');

const csrf = document.getElementsByName('csrfmiddlewaretoken');

const ShowModalView = document.getElementById('ShowModalView');


const modalBody = document.getElementById('modal-body-confirm');
console.log(modalBody);

const closeModalBtn = document.getElementById('closeModalBtn');


file.addEventListener('change', () => {
    bar.classList.remove('notShow');
    closeBox.classList.remove('notShow');

    const objData = file.files[0]; // for access uploaded file //
    console.log(objData);

    console.log(objData.name);
    console.log(objData.type);

    const url = URL.createObjectURL(objData);

    console.log(`url:) ${url}`);



    const fd = new FormData();
    fd.append('csrfmiddlewaretoken', csrf[0].value);
    fd.append('file', objData);



    $.ajax({
        type: 'POST',
        url: myform.action,
        enctype: 'multipart/form-data',
        data: fd,
        beforeSend: () => {
            console.log('before');
            fileBox.innerHTML = "";
            alertBox.innerHTML = "";

        },
        xhr: () => {
            const xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener('progress', (e) => {
                // console.log(e);

                if (e.lengthComputable) {
                    const percent = (e.loaded / e.total) * 100;
                    // console.log(percent);
                    bar.innerHTML = `

                    <div class="progress">
                              <div class="progress-bar" role="progressbar" style="width: ${percent}%" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"></div>
                   </div>
                  <p>${percent.toFixed(2)}%</p>


                    `

                }


            });
            CancelBtn.addEventListener('click', () => {
                xhr.abort();
                setTimeout(() => {
                    myform.reset();
                    bar.innerHTML = "";
                    // fileBox.innerHTML = "";
                    ShowModalView.innerHTML = "";
                    alertBox.innerHTML = "";
                    CancelBtn.classList.add('notShow');
                }, 2000);

            });
            return xhr;
        },

        success: (res) => {
            console.log(res);

            ShowModalView.innerHTML = `
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                  Show
                    </button>
            `

            if (objData.type === 'application/pdf') {
                console.log('inside ObjData.type is pdf....');
                console.log(objData.type === 'application/pdf');

                modalBody.innerHTML = `
                    
                    <div class"ratio ratio-1x1">
                        <embed src= "${url}" type="application/pdf" width= "600" height= "450" >
                     </div>

                `

            } else if (objData.type === 'text/plain') {

                console.log('inside ObjData.type is txt....');
                console.log(objData.type === 'text/plain');



                modalBody.innerHTML = `
                    
                    <div class"ratio ratio-1x1">
                        <embed src= "${url}" type="text/plain" width= "600" height= "450" >
                     </div>

                `

            } else if (objData.type.substring(0, 5) === 'image') {


                modalBody.innerHTML = `
                    
                    <div class"ratio ratio-1x1">
                            <img src="${url}" width= "600" height= "450" />
                     </div>

                `
            } else {

                console.log('inside the Else....');

                modalBody.innerHTML = `
                    
                    <div class"ratio ratio-1x1">
                        <embed src= "${url}"  width= "600" height= "450" >
                     </div>

                `

            }









            alertBox.innerHTML = `
            <div class="alert alert-success" role="alert">
                  SuccessFully Uploaded...
            </div>
            `
            closeBox.classList.add('notShow');

            closeModalBtn.addEventListener('click', () => {
                window.location.reload();
            });




        },

        error: (err) => {

            alertBox.innerHTML = `
            <div class="alert alert-danger" role="alert">
                  OOPS Error...
            </div>
            `
            setTimeout(() => {
                window.location.reload();
            }, 1000)


        },
        cache: false,
        contentType: false,
        processData: false



    });




});


















//  #########pdf viewer html ############ //


// https://usefulangle.com/post/67/pure-javascript-ajax-file-upload-showing-progess-percent

// https://stackoverflow.com/questions/14081128/how-to-embed-a-pdf-viewer-in-a-page
// https://pdfobject.com/
//https://www.w3docs.com/snippets/html/how-to-embed-pdf-in-html.html

// https://pdfjs.express/blog/how-embed-pdf-in-html-website


// https://codepen.io/Ranjithkumar10/pen/PGogxW?css-preprocessor=scss

// https://www.grapecity.com/wijmo/docs/Topics/Viewer/PDF-Viewer