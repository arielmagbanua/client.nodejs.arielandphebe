(() => {
    const nameElement = document.querySelector('form#rsvp-form #name');
    const emailElement = document.querySelector('form#rsvp-form #email');
    const attendanceElement = document.querySelector('input[name="attendance"]:checked');
    const noteElement = document.querySelector('form#rsvp-form #note');
    const rsvpSubmitButton = document.getElementById('rsvp-submit');

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelector('form#rsvp-form').addEventListener('submit', (event) => {
            event.preventDefault();
            rsvpSubmitButton.value = 'Submitting...';

            fetch('/api/send-rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: nameElement.value, 
                    email: emailElement.value,
                    attendance: attendanceElement.value, 
                    note: noteElement.value
                })
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    document.querySelector('p#rsvp-modal-message').innerHTML = responseData.message;
                    $('#rsvp-confirmation-modal').modal('show');
                    rsvpSubmitButton.value = 'Send RSVP';
                    clearFields();
                })
                .catch((error) => {
                    console.log(error)
                    // TODO: notify user via modal that rsvp was sent unsuccessfully.
                    document.querySelector('p#rsvp-modal-message').innerHTML = 'Sorry RSVP was not sent. Please try again later.';
                    $('#rsvp-confirmation-modal').modal('show');
                    rsvpSubmitButton.value = 'Send RSVP';
                    clearFields();
                });
        });
    });

    function clearFields() {
        nameElement.value = '';
        emailElement.value = '';
        noteElement.value = '';
        document.getElementById('radio-yes').checked = true;
    }
})();
