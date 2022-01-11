

// $(document).ready(function(){

// 	var $modal = $('#modal');

// 	var image = document.getElementById('sample_image');

// 	var cropper;

// 	$('#upload_image').change(function(event){
// 		var files = event.target.files;

// 		var done = function(url){
// 			image.src = url;
// 			$modal.modal('show');
// 		};

// 		if(files && files.length > 0)
// 		{
// 			reader = new FileReader();
// 			reader.onload = function(event)
// 			{
// 				done(reader.result);
// 			};
// 			reader.readAsDataURL(files[0]);
// 		}
// 	});

// 	$modal.on('shown.bs.modal', function() {
// 		cropper = new Cropper(image, {
// 			aspectRatio: 4/5,
// 			viewMode: 1,
// 			preview:'.preview'
// 		});
// 	}).on('hidden.bs.modal', function(){
// 		cropper.destroy();
//    		cropper = null;
// 	});

// 	$('#crop').click(function(){
// 		console.log("cropp cl");
// 		canvas = cropper.getCroppedCanvas({
// 			width:1900,
// 			height:1200
// 		});

// 		canvas.toBlob(function(blob){
// 			url = URL.createObjectURL(blob);
// 			var reader = new FileReader();
// 			reader.readAsDataURL(blob);
// 			reader.onloadend = function(){
// 				var base64data = reader.result;
//                 $('.new_preview').append(`
//                 <img src="${base64data}">
//                 <input hidden name="images" class="base64" type="text" value="${base64data}">
//                 `)

// 				// console.log('img_' + ( parseInt($('.base64').length) + 1 )+ '.jpg')

// 				// console.log(dataURLtoFile(base64data, 'img_' + ( parseInt($('.base64').length) + 1 )+ '.jpg'))

// 				console.log("crop");
//                 $modal.modal('hide');
// 			};
// 		});
// 	});

// 	// function dataURLtoFile(dataurl, filename) {
 
//     //     var arr = dataurl.split(','),
//     //         mime = arr[0].match(/:(.*?);/)[1],
//     //         bstr = atob(arr[1]), 
//     //         n = bstr.length, 
//     //         u8arr = new Uint8Array(n);
            
//     //     while(n--){
//     //         u8arr[n] = bstr.charCodeAt(n);
//     //     }
        
//     //     return new File([u8arr], filename, {type:mime});
//     // }

				
				

	
// });


function fileValidation() {
    const imagebox = document.getElementById('image-box')
    const crop_btn = document.getElementById('crop-btn')
    var fileInput = document.getElementById('file');

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
        document.getElementById('image-box').style.display = 'block'
        document.getElementById('crop-btn').style.display = 'block'
        document.getElementById('confirm-btn').style.display = 'none'

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
                let fileInputElement = document.getElementById('file');
                let file = new File([blob], img_data.name, { type: "image/*", lastModified: new Date().getTime() });
                let container = new DataTransfer();

                container.items.add(file);
                const img = container.files[0]
                var url = URL.createObjectURL(img)
                fileInputElement.files = container.files;
                document.getElementById('imgview1').src = url
                document.getElementById('image-box').style.display = 'none'
                document.getElementById('crop-btn').style.display = 'none'
                document.getElementById('confirm-btn').style.display = 'block'
            },'image/webp',0.5);
        });
    }
}


