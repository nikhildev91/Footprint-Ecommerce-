
//Cropper js function

function fileValidation1() {
    const imagebox = document.getElementById('image-box1')
    const crop_btn = document.getElementById('crop-btn1')
    var fileInput = document.getElementById('file1');

    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please upload image only!',

        })
        fileInput.value = '';
        return false;
    } else {
        //Image preview
        const img_data = fileInput.files[0]
        const url = URL.createObjectURL(img_data)
        imagebox.innerHTML = `<img src="${url}" id="image" style="width:100%">`
        const image = document.getElementById('image')
        document.getElementById('image-box1').style.display = 'block'
        document.getElementById('crop-btn1').style.display = 'block'
        document.getElementById('confirm-btn1').style.display = 'none'

        const cropper = new Cropper(image, {
            autoCropArea: 1,
            viewMode: 1,
            scalable: false,
            zoomable: false,
            movable: false,
            aspectRatio: 16 / 19,
            //  preview: '.preview',
            minCropBoxWidth: 180,
            minCropBoxHeight: 240,
        })
        crop_btn.addEventListener('click', () => {
            cropper.getCroppedCanvas().toBlob((blob) => {
                let fileInputElement = document.getElementById('file1');
                let file = new File([blob], img_data.name, { type: "image/*", lastModified: new Date().getTime() });
                let container = new DataTransfer();

                container.items.add(file);
                const img = container.files[0]
                var url = URL.createObjectURL(img)
                fileInputElement.files = container.files;
                document.getElementById('imgview1').src = url
                document.getElementById('image-box1').style.display = 'none'
                document.getElementById('crop-btn1').style.display = 'none'
                document.getElementById('confirm-btn1').style.display = 'block'
            },'image/webp',0.5);
        });
    }
}
function fileValidation2() {
    const imagebox = document.getElementById('image-box1')
    const crop_btn = document.getElementById('crop-btn1')
    var fileInput = document.getElementById('file2');

    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please upload image only!',

        })
        fileInput.value = '';
        return false;
    } else {
        //Image preview
        const img_data = fileInput.files[0]
        const url = URL.createObjectURL(img_data)
        imagebox.innerHTML = `<img src="${url}" id="image" style="width:100%">`
        const image = document.getElementById('image')
        document.getElementById('image-box1').style.display = 'block'
        document.getElementById('crop-btn1').style.display = 'block'
        document.getElementById('confirm-btn1').style.display = 'none'

        const cropper = new Cropper(image, {
            autoCropArea: 1,
            viewMode: 1,
            scalable: false,
            zoomable: false,
            movable: false,
            aspectRatio: 16 / 19,
            //  preview: '.preview',
            minCropBoxWidth: 180,
            minCropBoxHeight: 240,
        })
        crop_btn.addEventListener('click', () => {
            cropper.getCroppedCanvas().toBlob((blob) => {
                let fileInputElement = document.getElementById('file2');
                let file = new File([blob], img_data.name, { type: "image/*", lastModified: new Date().getTime() });
                let container = new DataTransfer();

                container.items.add(file);
                const img = container.files[0]
                var url = URL.createObjectURL(img)
                fileInputElement.files = container.files;
                document.getElementById('imgview2').src = url
                document.getElementById('image-box1').style.display = 'none'
                document.getElementById('crop-btn1').style.display = 'none'
                document.getElementById('confirm-btn1').style.display = 'block'
            },'image/webp',0.5);
        });
    }
}
function fileValidation3() {
    const imagebox = document.getElementById('image-box1')
    const crop_btn = document.getElementById('crop-btn1')
    var fileInput = document.getElementById('file3');

    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please upload image only!',

        })
        fileInput.value = '';
        return false;
    } else {
        //Image preview
        const img_data = fileInput.files[0]
        const url = URL.createObjectURL(img_data)
        imagebox.innerHTML = `<img src="${url}" id="image" style="width:100%">`
        const image = document.getElementById('image')
        document.getElementById('image-box1').style.display = 'block'
        document.getElementById('crop-btn1').style.display = 'block'
        document.getElementById('confirm-btn1').style.display = 'none'

        const cropper = new Cropper(image, {
            autoCropArea: 1,
            viewMode: 1,
            scalable: false,
            zoomable: false,
            movable: false,
            aspectRatio: 16 / 19,
            //  preview: '.preview',
            minCropBoxWidth: 180,
            minCropBoxHeight: 240,
        })
        crop_btn.addEventListener('click', () => {
            cropper.getCroppedCanvas().toBlob((blob) => {
                let fileInputElement = document.getElementById('file3');
                let file = new File([blob], img_data.name, { type: "image/*", lastModified: new Date().getTime() });
                let container = new DataTransfer();

                container.items.add(file);
                const img = container.files[0]
                var url = URL.createObjectURL(img)
                fileInputElement.files = container.files;
                document.getElementById('imgview3').src = url
                document.getElementById('image-box1').style.display = 'none'
                document.getElementById('crop-btn1').style.display = 'none'
                document.getElementById('confirm-btn1').style.display = 'block'
            },'image/webp',0.5);
        });
    }
}
function fileValidation4() {
    const imagebox = document.getElementById('image-box1')
    const crop_btn = document.getElementById('crop-btn1')
    var fileInput = document.getElementById('file4');

    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please upload image only!',

        })
        fileInput.value = '';
        return false;
    } else {
        //Image preview
        const img_data = fileInput.files[0]
        const url = URL.createObjectURL(img_data)
        imagebox.innerHTML = `<img src="${url}" id="image" style="width:100%">`
        const image = document.getElementById('image')
        document.getElementById('image-box1').style.display = 'block'
        document.getElementById('crop-btn1').style.display = 'block'
        document.getElementById('confirm-btn1').style.display = 'none'

        const cropper = new Cropper(image, {
            autoCropArea: 1,
            viewMode: 1,
            scalable: false,
            zoomable: false,
            movable: false,
            aspectRatio: 16 / 19,
            //  preview: '.preview',
            minCropBoxWidth: 180,
            minCropBoxHeight: 240,
        })
        crop_btn.addEventListener('click', () => {
            cropper.getCroppedCanvas().toBlob((blob) => {
                let fileInputElement = document.getElementById('file4');
                let file = new File([blob], img_data.name, { type: "image/*", lastModified: new Date().getTime() });
                let container = new DataTransfer();

                container.items.add(file);
                const img = container.files[0]
                var url = URL.createObjectURL(img)
                fileInputElement.files = container.files;
                document.getElementById('imgview4').src = url
                document.getElementById('image-box1').style.display = 'none'
                document.getElementById('crop-btn1').style.display = 'none'
                document.getElementById('confirm-btn1').style.display = 'block'
            },'image/webp',0.5);
        });
    }
}










// Add Home Page Banners


function cropBanner1() {
    const imagebox = document.getElementById('image-box1')
    const crop_btn = document.getElementById('crop-btn1')
    var fileInput = document.getElementById('file1');

    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please upload image only!',

        })
        fileInput.value = '';
        return false;
    } else {
        //Image preview
        const img_data = fileInput.files[0]
        const url = URL.createObjectURL(img_data)
        imagebox.innerHTML = `<img src="${url}" id="image" style="width:100%">`
        const image = document.getElementById('image')
        document.getElementById('image-box1').style.display = 'block'
        document.getElementById('crop-btn1').style.display = 'block'
        document.getElementById('confirm-btn1').style.display = 'none'

        const cropper = new Cropper(image, {
            autoCropArea: 1,
            viewMode: 1,
            scalable: false,
            zoomable: false,
            movable: false,
            aspectRatio: 21/9,
            //  preview: '.preview',
            minCropBoxWidth: 240,
            minCropBoxHeight: 180,
        })
        crop_btn.addEventListener('click', () => {
            cropper.getCroppedCanvas().toBlob((blob) => {
                let fileInputElement = document.getElementById('file1');
                let file = new File([blob], img_data.name, { type: "image/*", lastModified: new Date().getTime() });
                let container = new DataTransfer();

                container.items.add(file);
                const img = container.files[0]
                var url = URL.createObjectURL(img)
                fileInputElement.files = container.files;
                document.getElementById('imgview1').src = url
                document.getElementById('image-box1').style.display = 'none'
                document.getElementById('crop-btn1').style.display = 'none'
                document.getElementById('confirm-btn1').style.display = 'block'
            },'image/webp',0.5);
        });
    }
}
function cropBanner2() {
    const imagebox = document.getElementById('image-box1')
    const crop_btn = document.getElementById('crop-btn1')
    var fileInput = document.getElementById('file2');

    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please upload image only!',

        })
        fileInput.value = '';
        return false;
    } else {
        //Image preview
        const img_data = fileInput.files[0]
        const url = URL.createObjectURL(img_data)
        imagebox.innerHTML = `<img src="${url}" id="image" style="width:100%">`
        const image = document.getElementById('image')
        document.getElementById('image-box1').style.display = 'block'
        document.getElementById('crop-btn1').style.display = 'block'
        document.getElementById('confirm-btn1').style.display = 'none'

        const cropper = new Cropper(image, {
            autoCropArea: 1,
            viewMode: 1,
            scalable: false,
            zoomable: false,
            movable: false,
            aspectRatio: 21/9,
            //  preview: '.preview',
            minCropBoxWidth: 240,
            minCropBoxHeight: 180,
        })
        crop_btn.addEventListener('click', () => {
            cropper.getCroppedCanvas().toBlob((blob) => {
                let fileInputElement = document.getElementById('file2');
                let file = new File([blob], img_data.name, { type: "image/*", lastModified: new Date().getTime() });
                let container = new DataTransfer();

                container.items.add(file);
                const img = container.files[0]
                var url = URL.createObjectURL(img)
                fileInputElement.files = container.files;
                document.getElementById('imgview2').src = url
                document.getElementById('image-box1').style.display = 'none'
                document.getElementById('crop-btn1').style.display = 'none'
                document.getElementById('confirm-btn1').style.display = 'block'
            },'image/webp',0.5);
        });
    }
}
function cropBanner3() {
    const imagebox = document.getElementById('image-box1')
    const crop_btn = document.getElementById('crop-btn1')
    var fileInput = document.getElementById('file3');

    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please upload image only!',

        })
        fileInput.value = '';
        return false;
    } else {
        //Image preview
        const img_data = fileInput.files[0]
        const url = URL.createObjectURL(img_data)
        imagebox.innerHTML = `<img src="${url}" id="image" style="width:100%">`
        const image = document.getElementById('image')
        document.getElementById('image-box1').style.display = 'block'
        document.getElementById('crop-btn1').style.display = 'block'
        document.getElementById('confirm-btn1').style.display = 'none'

        const cropper = new Cropper(image, {
            autoCropArea: 1,
            viewMode: 1,
            scalable: false,
            zoomable: false,
            movable: false,
            aspectRatio: 21/9,
            //  preview: '.preview',
            minCropBoxWidth: 240,
            minCropBoxHeight: 180,
        })
        crop_btn.addEventListener('click', () => {
            cropper.getCroppedCanvas().toBlob((blob) => {
                let fileInputElement = document.getElementById('file3');
                let file = new File([blob], img_data.name, { type: "image/*", lastModified: new Date().getTime() });
                let container = new DataTransfer();

                container.items.add(file);
                const img = container.files[0]
                var url = URL.createObjectURL(img)
                fileInputElement.files = container.files;
                document.getElementById('imgview3').src = url
                document.getElementById('image-box1').style.display = 'none'
                document.getElementById('crop-btn1').style.display = 'none'
                document.getElementById('confirm-btn1').style.display = 'block'
            },'image/webp',0.5);
        });
    }
}


function cropBanner4() {
    const imagebox = document.getElementById('image-box1')
    const crop_btn = document.getElementById('crop-btn1')
    var fileInput = document.getElementById('file4');

    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please upload image only!',

        })
        fileInput.value = '';
        return false;
    } else {
        //Image preview
        const img_data = fileInput.files[0]
        const url = URL.createObjectURL(img_data)
        imagebox.innerHTML = `<img src="${url}" id="image" style="width:100%">`
        const image = document.getElementById('image')
        document.getElementById('image-box1').style.display = 'block'
        document.getElementById('crop-btn1').style.display = 'block'
        document.getElementById('confirm-btn1').style.display = 'none'

        const cropper = new Cropper(image, {
            autoCropArea: 1,
            viewMode: 1,
            scalable: false,
            zoomable: false,
            movable: false,
            aspectRatio: 21/9,
            //  preview: '.preview',
            minCropBoxWidth: 240,
            minCropBoxHeight: 180,
        })
        crop_btn.addEventListener('click', () => {
            cropper.getCroppedCanvas().toBlob((blob) => {
                let fileInputElement = document.getElementById('file4');
                let file = new File([blob], img_data.name, { type: "image/*", lastModified: new Date().getTime() });
                let container = new DataTransfer();

                container.items.add(file);
                const img = container.files[0]
                var url = URL.createObjectURL(img)
                fileInputElement.files = container.files;
                document.getElementById('imgview4').src = url
                document.getElementById('image-box1').style.display = 'none'
                document.getElementById('crop-btn1').style.display = 'none'
                document.getElementById('confirm-btn1').style.display = 'block'
            },'image/webp',0.5);
        });
    }
}



// crop Add Category banner 


function cropCategoryBanner1() {
    const imagebox = document.getElementById('image-box1')
    const crop_btn = document.getElementById('crop-btn1')
    var fileInput = document.getElementById('file1');

    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please upload image only!',

        })
        fileInput.value = '';
        return false;
    } else {
        //Image preview
        const img_data = fileInput.files[0]
        const url = URL.createObjectURL(img_data)
        imagebox.innerHTML = `<img src="${url}" id="image" style="width:100%">`
        const image = document.getElementById('image')
        document.getElementById('image-box1').style.display = 'block'
        document.getElementById('crop-btn1').style.display = 'block'
        document.getElementById('confirm-btn1').style.display = 'none'

        const cropper = new Cropper(image, {
            autoCropArea: 1,
            viewMode: 1,
            scalable: false,
            zoomable: false,
            movable: false,
            aspectRatio: 5/4,
            //  preview: '.preview',
            minCropBoxWidth: 180,
            minCropBoxHeight: 240,
        })
        crop_btn.addEventListener('click', () => {
            cropper.getCroppedCanvas().toBlob((blob) => {
                let fileInputElement = document.getElementById('file1');
                let file = new File([blob], img_data.name, { type: "image/*", lastModified: new Date().getTime() });
                let container = new DataTransfer();

                container.items.add(file);
                const img = container.files[0]
                var url = URL.createObjectURL(img)
                fileInputElement.files = container.files;
                document.getElementById('imgview1').src = url
                document.getElementById('image-box1').style.display = 'none'
                document.getElementById('crop-btn1').style.display = 'none'
                document.getElementById('confirm-btn1').style.display = 'block'
            },'image/webp',0.5);
        });
    }
}
function cropCategoryBanner2() {
    const imagebox = document.getElementById('image-box1')
    const crop_btn = document.getElementById('crop-btn1')
    var fileInput = document.getElementById('file2');

    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please upload image only!',

        })
        fileInput.value = '';
        return false;
    } else {
        //Image preview
        const img_data = fileInput.files[0]
        const url = URL.createObjectURL(img_data)
        imagebox.innerHTML = `<img src="${url}" id="image" style="width:100%">`
        const image = document.getElementById('image')
        document.getElementById('image-box1').style.display = 'block'
        document.getElementById('crop-btn1').style.display = 'block'
        document.getElementById('confirm-btn1').style.display = 'none'

        const cropper = new Cropper(image, {
            autoCropArea: 1,
            viewMode: 1,
            scalable: false,
            zoomable: false,
            movable: false,
            aspectRatio: 5/4,
            //  preview: '.preview',
            minCropBoxWidth: 180,
            minCropBoxHeight: 240,
        })
        crop_btn.addEventListener('click', () => {
            cropper.getCroppedCanvas().toBlob((blob) => {
                let fileInputElement = document.getElementById('file2');
                let file = new File([blob], img_data.name, { type: "image/*", lastModified: new Date().getTime() });
                let container = new DataTransfer();

                container.items.add(file);
                const img = container.files[0]
                var url = URL.createObjectURL(img)
                fileInputElement.files = container.files;
                document.getElementById('imgview2').src = url
                document.getElementById('image-box1').style.display = 'none'
                document.getElementById('crop-btn1').style.display = 'none'
                document.getElementById('confirm-btn1').style.display = 'block'
            },'image/webp',0.5);
        });
    }
}


// crop Product Banner


function cropProductBanner1() {
    const imagebox = document.getElementById('image-box1')
    const crop_btn = document.getElementById('crop-btn1')
    var fileInput = document.getElementById('file1');

    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please upload image only!',

        })
        fileInput.value = '';
        return false;
    } else {
        //Image preview
        const img_data = fileInput.files[0]
        const url = URL.createObjectURL(img_data)
        imagebox.innerHTML = `<img src="${url}" id="image" style="width:100%">`
        const image = document.getElementById('image')
        document.getElementById('image-box1').style.display = 'block'
        document.getElementById('crop-btn1').style.display = 'block'
        document.getElementById('confirm-btn1').style.display = 'none'

        const cropper = new Cropper(image, {
            autoCropArea: 1,
            viewMode: 1,
            scalable: false,
            zoomable: false,
            movable: false,
            aspectRatio: 16 / 4,
            //  preview: '.preview',
            minCropBoxWidth: 180,
            minCropBoxHeight: 240,
        })
        crop_btn.addEventListener('click', () => {
            cropper.getCroppedCanvas().toBlob((blob) => {
                let fileInputElement = document.getElementById('file1');
                let file = new File([blob], img_data.name, { type: "image/*", lastModified: new Date().getTime() });
                let container = new DataTransfer();

                container.items.add(file);
                const img = container.files[0]
                var url = URL.createObjectURL(img)
                fileInputElement.files = container.files;
                document.getElementById('imgview1').src = url
                document.getElementById('image-box1').style.display = 'none'
                document.getElementById('crop-btn1').style.display = 'none'
                document.getElementById('confirm-btn1').style.display = 'block'
            },'image/webp',0.5);
        });
    }
}



//Crop brand Logos

function cropBrandLogo() {
    const imagebox = document.getElementById('image-box1')
    const crop_btn = document.getElementById('crop-btn1')
    var fileInput = document.getElementById('file1');

    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please upload image only!',

        })
        fileInput.value = '';
        return false;
    } else {
        //Image preview
        const img_data = fileInput.files[0]
        const url = URL.createObjectURL(img_data)
        imagebox.innerHTML = `<img src="${url}" id="image" style="width:100%">`
        const image = document.getElementById('image')
        document.getElementById('image-box1').style.display = 'block'
        document.getElementById('crop-btn1').style.display = 'block'
        document.getElementById('confirm-btn1').style.display = 'none'

        const cropper = new Cropper(image, {
            autoCropArea: 1,
            viewMode: 1,
            scalable: false,
            zoomable: false,
            movable: false,
            aspectRatio: 4/3,
            //  preview: '.preview',
            minCropBoxWidth: 180,
            minCropBoxHeight: 240,
        })
        crop_btn.addEventListener('click', () => {
            cropper.getCroppedCanvas().toBlob((blob) => {
                let fileInputElement = document.getElementById('file1');
                let file = new File([blob], img_data.name, { type: "image/*", lastModified: new Date().getTime() });
                let container = new DataTransfer();

                container.items.add(file);
                const img = container.files[0]
                var url = URL.createObjectURL(img)
                fileInputElement.files = container.files;
                document.getElementById('imgview1').src = url
                document.getElementById('image-box1').style.display = 'none'
                document.getElementById('crop-btn1').style.display = 'none'
                document.getElementById('confirm-btn1').style.display = 'block'
            },'image/webp',0.5);
        });
    }
}



// crop profile image


function cropProfileImage () {
    const imagebox = document.getElementById('image-box1')
    const crop_btn = document.getElementById('crop-btn1')
    var fileInput = document.getElementById('file1');

    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please upload image only!',

        })
        fileInput.value = '';
        return false;
    } else {
        //Image preview
        const img_data = fileInput.files[0]
        const url = URL.createObjectURL(img_data)
        imagebox.innerHTML = `<img src="${url}" id="image" style="width:100%">`
        const image = document.getElementById('image')
        document.getElementById('image-box1').style.display = 'block'
        document.getElementById('crop-btn1').style.display = 'block'
        document.getElementById('confirm-btn1').style.display = 'none'

        const cropper = new Cropper(image, {
            autoCropArea: 1,
            viewMode: 1,
            scalable: false,
            zoomable: false,
            movable: false,
            aspectRatio: 16 / 19,
            //  preview: '.preview',
            minCropBoxWidth: 180,
            minCropBoxHeight: 240,
        })
        crop_btn.addEventListener('click', () => {
            cropper.getCroppedCanvas().toBlob((blob) => {
                let fileInputElement = document.getElementById('file1');
                let file = new File([blob], img_data.name, { type: "image/*", lastModified: new Date().getTime() });
                let container = new DataTransfer();

                container.items.add(file);
                const img = container.files[0]
                var url = URL.createObjectURL(img)
                fileInputElement.files = container.files;
                document.getElementById('imgview1').src = url
                document.getElementById('image-box1').style.display = 'none'
                document.getElementById('crop-btn1').style.display = 'none'
                document.getElementById('confirm-btn1').style.display = 'block'
            },'image/webp',0.5);
        });
    }
}




