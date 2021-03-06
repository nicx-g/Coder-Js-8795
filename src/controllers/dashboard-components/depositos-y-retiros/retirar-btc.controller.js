import {guardarOperacion, guardarhistorial, validarInput, colocarDatosBasicos, cerrarSesion, getCripto, validarFondos} from "../../../js/functions.js";

export default () => {
    const header =
    `<div class="dashboard-header">
    <div class="container">
        <div class="navbar navbar-expand-lg d-flex justify-content-between">
            <a class="mr-auto" href="#/dashboard">
                <img src="./src/resources/images/logo.png" width="250px" alt="Este es el logo de la pag">
            </a>
            <button class="navbar-toggler" data-target="#menu" data-toggle="collapse" type="button">
                <span class="navbar-toggler-icon"><i class="fas fa-bars"></i></span>
            </button>
            <div class="cotizacion d-flex justify-content-between">
                <div class="d-flex justify-content-center align-items-center flex-column">
                    <span>DAI/ARS</span>
                    <div>
                        <span id="dai-ars-sell"></span>
                        <span  id="dai-ars-buy"></span>
                    </div>
                </div>

                <div class="d-flex justify-content-center align-items-center flex-column">
                    <span>DAI/USD</span>
                    <div>
                        <span  id="dai-usd-sell"></span>
                        <span  id="dai-usd-buy"></span>
                    </div>
                </div>
                    
                <div class="d-flex justify-content-center align-items-center flex-column">
                    <span>BTC/ARS</span>
                    <div>
                        <span id="btc-ars-sell"></span>
                        <span id="btc-ars-buy"></span>
                    </div>
                </div>
            </div>
            <div class="criptoUser collapse navbar-collapse" id="menu">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item dropdown">
                        <a id="nombreDelUsuarioCripto" class="nav-item dropdown-toggle" data-toggle="dropdown" data-target="desplegable2" href="#"></a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#/dashboard/perfil">Mi Perfil</a>
                            <a class="dropdown-item" href="#/ayuda">Ayuda</a>
                            <button id="btn-sign-out" class="dropdown-item">Cerrar sesión</button>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</div>`
    const views = 
    `<div class="dashboard-content">
    <div class="container-fluid d-flex">
        <div class="dashboard-content-aside">
            <ul>

                <li><a href="#/dashboard"><i class="fas fa-home"></i> Inicio</a></li>

                <li>
                    <a href="#/dashboard/depositos-y-retiros"><i class="fas fa-piggy-bank"></i>Ingresar y retirar</a>
                    <ul>
                        <li><a href="#/dashboard/depositos-y-retiros/ingresar/ars"><i class="fas fa-dollar-sign"></i>Pesos</a></li>
                        <li><a href="#/dashboard/depositos-y-retiros/ingresar/usd"><i class="fas fa-dollar-sign"></i>Dólares</a></li>
                        <li><a href="#/dashboard/depositos-y-retiros/ingresar/dai"><i class="cf cf-dai"></i>DAI</a></li>
                        <li><a href="#/dashboard/depositos-y-retiros/ingresar/btc"><i class="cf cf-btc"></i>Bitcoin</a></li>
                    </ul>
                </li>
                
                <li>
                    <a href="#/dashboard/operar"><i class="fas fa-handshake"></i>Operar</a>
                    <ul>
                        <li><a href="#/dashboard/operar/compra/daiars">DAI / ARS</a></li>
                        <li><a href="#/dashboard/operar/compra/daiusd">DAI / USD</a></li>
                        <li><a href="#/dashboard/operar/compra/bitcoinars">BTC / ARS</a></li>
                    </ul>
                </li>

            </ul>
        </div>

        <div class="dashboard-content-operar">
            <div class="ingresar-y-retirar-noCripto">
                <div class="ingresar-o-retirar">
                    <a href="#/dashboard/depositos-y-retiros/ingresar/btc">Ingresar</a>
                    <a class="active-link" href="#/dashboard/depositos-y-retiros/retirar/btc">Retirar</a>
                </div> 
                
                <div class="ingresar-o-retirar-noCripto">
                    <div class="ingresar-o-retirar-noCripto-operacion">
                        <h2>¿Cuántos Bitcoin's deseas retirar de tu cuenta?</h2>
                        <form id="form-retirar-btc">
                            <div class="ingresar-o-retirar-noCripto-input d-flex flex-column">
                                <label for="retirarBtc">Insertar cantidad de Bitcoin</label>
                                <input type="text" name="retirarBtc" id="retirarBtc" placeholder="Por ej: 0.0095">
                                <p id="mensaje-de-error" style="display: none">No ingresaste un número válido o no tenés fondos suficientes</p>

                                <label for="wallet-btc">Insertar dirección de la Wallet.</label>
                                <input type="text" name="wallet-btc" id="wallet-btc" placeholder="Por ej: 0xac4f72e7bda732a521dff91a0fb46ee24f1eadbf">
                                <p id="mensaje-de-error-direccion" style="display: none">Tenés que ingresar una dirección de wallet válida</p>
                            </div>
                            <button id="btn-retirar-btc" type="submit">Enviar Bitcoin</button>
                        </form>

                    <div id="mensaje-de-exito" class="mensaje-de-exito bg-success" style="display:none">
                        <p>Operación realizada con éxito. Debido a la congestión de la blockchain este proceso puede demorar.</p>
                    </div>
                </div>
                
            </div>
        </div>

    </div>
</div>`
    const footer =
    `<div class="dashboard-footer">
    <span class="footer-text d-flex justify-content-center align-items-center">2020 © CriptoCoins. Todos los derechos reservados</span>
</div>`

    const divElement = document.createElement('div');
    divElement.innerHTML = `${header} ${views} ${footer}`;

    //Codigo JS
    
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // si el User está logueado
            var emailVerified = user.emailVerified;
            let userEmail = user.email
    
            if (emailVerified){
                
                // Si el email está verificado
    
                // elementos del DOM

                const userNameHeader = divElement.querySelector('#nombreDelUsuarioCripto')
                const btnSignOut = divElement.querySelector("#btn-sign-out");

                const mensaje_de_exito = divElement.querySelector('#mensaje-de-exito');
                const mensaje_de_error = divElement.querySelectorAll('#mensaje-de-error')

                const input_retirar_btc = divElement.querySelector('#retirarBtc');
                const btn_retirar_btc = divElement.querySelector('#btn-retirar-btc');
                const form_retirar_btc = divElement.querySelector('#form-retirar-btc');

                let dai_ars_sell = divElement.querySelector('#dai-ars-sell');
                let dai_usd_sell = divElement.querySelector('#dai-usd-sell');
                let btc_ars_sell = divElement.querySelector('#btc-ars-sell');
                let dai_ars_buy = divElement.querySelector('#dai-ars-buy');
                let dai_usd_buy = divElement.querySelector('#dai-usd-buy');
                let btc_ars_buy = divElement.querySelector('#btc-ars-buy');

                $(async () => {

                    getCripto(dai_ars_sell, dai_ars_buy, btc_ars_sell, btc_ars_buy, dai_usd_sell, dai_usd_buy);
                         setInterval(await getCripto, 30000, dai_ars_sell, dai_ars_buy, btc_ars_sell, btc_ars_buy, dai_usd_sell, dai_usd_buy); // Cada 30 secs
                    colocarDatosBasicos(userEmail, userNameHeader);
                    btnSignOut.addEventListener('click', cerrarSesion);

                    btn_retirar_btc.addEventListener('click', async(e) => {
                        e.preventDefault();

                        if(validarInput(input_retirar_btc) && await validarFondos(userEmail, "btc", null, input_retirar_btc)){

                            input_retirar_btc.classList.remove("error-input")
                            $(mensaje_de_error).fadeOut();
                            btn_retirar_btc.disabled = true;
                            input_retirar_btc.readOnly=true;
                            $(mensaje_de_exito).fadeIn(500)
                            guardarOperacion("btc", "retiro", input_retirar_btc, userEmail);
                            
                            setTimeout(() => {
    
                                $(mensaje_de_exito).fadeOut(500);
                                input_retirar_btc.readOnly = false;
                                btn_retirar_btc.disabled = false;
                                form_retirar_btc.reset();
                                
                            }, 4000);
                        } else{
                            input_retirar_btc.classList.add("error-input")
                            $(mensaje_de_error).fadeIn();

                            setTimeout(() => {
                                input_retirar_btc.classList.remove("error-input")
                                $(mensaje_de_error).fadeOut();
                            }, 3000);

                        }
                    });

                })
    
            } else{
    
                // Si el email no está verificado
    
                window.location.href = "#/login"
            }
            
        } else {
            // si el user no está logueado
            window.location.href = "#/login"
        }
        });


    return divElement;
}