import {
    get
} from '../fetch';
const $containerAbout = document.querySelector('[data-content="about"]')

//Obtém o conteúdo da página About
get("/config").then((aboutConf) => {

    return (`
        <p class="description">${aboutConf.aboutUs}</p>
        <address class="address">
            <p>Telefone: ${aboutConf.telephone}</p>
            <p>email: <a href="mailto:asknot@answernot.com">${aboutConf.email}<a/></p>
            <p>Endereço: ${aboutConf.address}</p>
        </address>
`)
}).then((createAbout) => {
    $containerAbout.innerHTML += createAbout
}).catch((errorCreateAbout) => {
    console.error(errorCreateAbout)
})
