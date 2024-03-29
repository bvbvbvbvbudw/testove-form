document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('mail-sender');
    const modal = document.getElementById('modal');
    const errorMessage = document.getElementById('errorMessage');
    const loading = document.getElementById('loadingCircle');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        loadingCircle(true)
        const formData = new FormData(form);
        const emailInput = form.querySelector('input[name="email"]');
        const emailValue = emailInput.value.trim();

        if (!isValidEmail(emailValue)) {
            displayErrorMessage();
            return;
        }

        fetchEmailData(formData)
            .then(handleResponse)
            .catch(handleError)
            .finally(() => loadingCircle(false));
    });

    const closeModalButton = document.getElementById('closeModal');
    closeModalButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    function isValidEmail(email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    function fetchEmailData(formData) {
        return fetch('includes/send.php', {
            method: 'POST',
            body: formData
        }).then(response => {
            if (!response.ok) {
                throw new Error('network response was not ok');
            }
            return response.json();
        });
    }

    function handleResponse(data) {
        if (data.success) {
            modal.style.display = 'block';
        } else {
            displayErrorMessage();
        }
    }

    function displayErrorMessage() {
        errorMessage.style.display = 'block';
    }

    function handleError(error) {
        console.error(error);
        displayErrorMessage();
    }

    function loadingCircle(boolean){
        loading.style.display = boolean ? 'block' : 'none'
    }
});