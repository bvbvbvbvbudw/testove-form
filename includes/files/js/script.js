document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('mail-sender');
    const modal = document.getElementById('modal');
    const errorMessage = document.getElementById('errorMessage');
    const loading = document.getElementById('loadingCircle');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        toggleLoading(true);
        const formData = new FormData(form);
        const emailInput = form.querySelector('input[name="email"]');
        const emailValue = emailInput.value.trim();

        if (!isValidEmail(emailValue)) {
            displayErrorMessage();
            toggleLoading(false);
            return;
        }

        sendFormData(formData)
            .then(handleFetchResponse)
            .catch(handleError)
            .finally(() => toggleLoading(false));
    });

    const closeModalButton = document.getElementById('closeModal');
    closeModalButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function sendFormData(formData) {
        return fetch('includes/send.php', {
            method: 'POST',
            body: formData
        });
    }

    function handleFetchResponse(response) {
        if (response.ok) {
            modal.style.display = 'block';
        } else {
            displayErrorMessage();
        }
    }

    function displayErrorMessage() {
        errorMessage.style.display = 'block';
    }

    function handleError(error) {
        console.error('An error occurred:', error);
        displayErrorMessage();
    }

    function toggleLoading(shouldDisplay) {
        loading.style.display = shouldDisplay ? 'block' : 'none';
    }
});
