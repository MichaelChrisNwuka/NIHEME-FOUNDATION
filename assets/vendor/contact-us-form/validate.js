(function () {
  "use strict";

  let forms = document.querySelectorAll('.contactus-email-form');

  forms.forEach(function (e) {
    e.addEventListener('submit', function (event) {
      event.preventDefault();
      let thisForm = this;

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');

      if (!action) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }

      // Clear previous alerts
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      // Validate form inputs
      const nameInput = thisForm.querySelector('[name="NAME"]');
      const emailInput = thisForm.querySelector('[name="EMAIL"]');
      const subjectInput = thisForm.querySelector('[name="subject"]');
      const messageInput = thisForm.querySelector('[name="MESSAGE"]');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      // Capitalize first letters
      nameInput.value = capitalizeWords(name);
      subjectInput.value = capitalizeSentence(subject);
      messageInput.value = capitalizeSentence(message);

      if (!/^[A-Z][a-z]+ [A-Z][a-z]+(?: [A-Z][a-z]+)*$/.test(name)) {
        displayError(thisForm, "Please enter your full name with each word starting with a capital letter, e.g., Dominic Toretto.");
        return;
      }      

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        displayError(thisForm, "Please enter a valid email address.");
        return;
      }

      if (!/^[A-Z]/.test(subject)) {
        displayError(thisForm, "The subject should start with a capital letter.");
        return;
      }

      if (!/^[A-Z]/.test(message)) {
        displayError(thisForm, "The message should start with a capital letter.");
        return;
      }

      let formData = new FormData(thisForm);

      if (recaptcha) {
        if (typeof grecaptcha !== "undefined") {
          grecaptcha.ready(function () {
            try {
              grecaptcha.execute(recaptcha, { action: 'php_email_form_submit' })
                .then(token => {
                  formData.set('recaptcha-response', token);
                  contactus_form_submit(thisForm, action, formData);
                });
            } catch (error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!');
        }
      } else {
        contactus_form_submit(thisForm, action, formData);
      }
    });
  });

  function contactus_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(async (response) => {
        thisForm.querySelector('.loading').classList.remove('d-block');

        let data;
        try {
          data = await response.json();
        } catch (err) {
          throw new Error('Invalid JSON response');
        }

        if (response.ok && data.ok) {
          thisForm.querySelector('.sent-message').classList.add('d-block');
          thisForm.reset();
        } else {
          const errorMessage = data && data.error ? data.error : 'Form submission failed.';
          throw new Error(errorMessage);
        }
      })
      .catch((error) => {
        displayError(thisForm, error);
      });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

  // Helpers
  function capitalizeWords(str) {
    return str.replace(/\b\w/g, c => c.toUpperCase());
  }

  function capitalizeSentence(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

})();