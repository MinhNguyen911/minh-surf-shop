//find the post edit form
let postEditForm = document.getElementById('postEditForm');
//add submit listener to post edit form
postEditForm.addEventListener('submit', (event)=>{
    // find length of uploading images
    let imageUpload = document.getElementById('imageUpload').files.length;
    // find total number of existing images
    let existingImgs = document.querySelectorAll('.imageDeleteCheckbox').length;
    //find number of potential deleting images
    let imgDelete = document.querySelectorAll('.imageDeleteCheckbox:checked').length;
    // check the math of how many images need to be deleted to be able to submit (cap=4)
    let newTotal = existingImgs-imgDelete+imageUpload;
    if(newTotal >4){
        event.preventDefault();
        let removeAmount = newTotal-4;
        alert(`You need to remove at least ${removeAmount} more image${removeAmount===1?' ': 's'}`)
    };
});