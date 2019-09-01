(() => {
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelector('form#rsvp-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const nameElement = document.querySelector('form#rsvp-form #name');
            const emailElement = document.querySelector('form#rsvp-form #email');
            const attendanceElement = document.querySelector('input[name="attendance"]:checked');
            const noteElement = document.querySelector('form#rsvp-form #note');

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
                .then((response) => {
                    console.log(response);
                    // TODO: notify user via modal that rsvp was sent successfully.
                })
                .catch((error) => {
                    console.log(error)
                    // TODO: notify user via modal that rsvp was sent unsuccessfully.
                });
        });
    });
})();
