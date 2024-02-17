document.addEventListener("DOMContentLoaded", function () {
  var myForm = document.getElementById("myForm");

  myForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting by default

    var textarea1 = document.getElementById('textareaData1').value;
    var textarea2 = document.getElementById('textareaData2').value;
    var emailError = document.getElementById('emailError');
    var descriptionError = document.getElementById('descriptionError');

    // Regular expression for a simple email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (textarea1.trim() === '') {
      //alert('Please enter values in the first text box.');
      emailError.textContent = 'Please enter your description.';
    } 
    else if (textarea2.trim() === '') {
      descriptionError.textContent = 'Please enter your email address.';

    }
    else if (!emailRegex.test(textarea2.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
    }
    // else if (textarea1.trim() === '' && textarea2.trim() === '') {
    //   emailError.textContent = 'Please enter your description.';
    //   descriptionError.textContent = 'Please enter your email address.';

    // } 
    else {
      // If both text boxes have values, you can submit the form programmatically
      myForm.submit();
    }
  });

  // Clear email error message when the user starts typing in the email field
  document.getElementById('textareaData2').addEventListener('input', function () {
    document.getElementById('emailError').textContent = '';
  });
});
