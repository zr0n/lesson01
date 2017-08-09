
    const $containerFormContact = document.forms[0];
    const $modalMessageSucces = document.querySelector('[data-modal="succes"]');
    const $modalMessageError = document.querySelector('[data-modal="error"]');

    $containerFormContact.addEventListener("submit", () => {
        $containerFormContact.reset()
        $modalMessageSucces.classList.remove("-hide")
        setTimeout(() => {
            $modalMessageSucces.classList.add("-hide")
        }, 1500)
    })

