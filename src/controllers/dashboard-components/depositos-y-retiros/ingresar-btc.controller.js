import {guardarOperacion, guardarhistorial, validarInput, colocarDatosBasicos, cerrarSesion, getCripto, renderArs, renderUsd} from "../../../js/functions.js";

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
                    <a class="active-link" href="#/dashboard/depositos-y-retiros/ingresar/btc">Ingresar</a>
                    <a href="#/dashboard/depositos-y-retiros/retirar/btc">Retirar</a>
                </div> 
                
                <div class="ingresar-o-retirar-noCripto">
                    <div class="ingresar-o-retirar-noCripto-operacion">
                        <h2>¿Cuántos Bitcoin deseas ingresar a tu cuenta?</h2>
                        <form id="form-ingresar-btc" method="POST">
                            <div class="ingresar-o-retirar-noCripto-input d-flex flex-column">
                                <label for="ingresarBtc">Insertar cantidad de Bitcoins</label>
                                <input type="text" name="ingresarBtc" id="ingresarBtc" placeholder="Por ej: 0.0130">
                                <p id="mensaje-de-error" style="display: none">Tenés que ingresar un número</p>
                            </div>
                            <button id="btn-ingresar-btc" type="submit">Ingresar Bitcoins</button>
                        </form>
                    </div>

                    <div id="mensaje-de-operacion" style="display:none" class="mensaje-de-operacion bg-light">
                        <p>Vas a tener que depositar los Bitcoin en la siguiente dirección para que se te acredite:</p>
                        <p>bc1qlucl8pz6rfesn9eqtvfx2q4qqxykk88a2njlm5</p>
                    </div>

                    <div id="mensaje-de-exito" style="display:none" class="mensaje-de-exito bg-success">
                        <p>Por fines prácticos ya tenés los Bitcoin depositados en tu cuenta</p>
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

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // si el User está logueado
            var emailVerified = user.emailVerified;
            let userEmail = user.email
    
            if (emailVerified){
                
                // Si el email está verificado
    
                // elementos del Dom

                const userNameHeader = divElement.querySelector('#nombreDelUsuarioCripto')
                const btnSignOut = divElement.querySelector("#btn-sign-out");

                const mensaje_de_exito = divElement.querySelector('#mensaje-de-exito');
                const mensaje_de_operacion = divElement.querySelector('#mensaje-de-operacion');
                const mensaje_de_error = divElement.querySelector('#mensaje-de-error')
                
                const input_ingresar_btc = divElement.querySelector('#ingresarBtc');
                const btn_ingresar_btc = divElement.querySelector('#btn-ingresar-btc');
                const form_ingresar_btc = divElement.querySelector('#form-ingresar-btc');

                let dai_ars_sell = divElement.querySelector('#dai-ars-sell');
                let dai_usd_sell = divElement.querySelector('#dai-usd-sell');
                let btc_ars_sell = divElement.querySelector('#btc-ars-sell');
                let dai_ars_buy = divElement.querySelector('#dai-ars-buy');
                let dai_usd_buy = divElement.querySelector('#dai-usd-buy');
                let btc_ars_buy = divElement.querySelector('#btc-ars-buy');

                $( async() => {

                    getCripto(dai_ars_sell, dai_ars_buy, btc_ars_sell, btc_ars_buy, dai_usd_sell, dai_usd_buy); //actualiza el precio de las cripto
                    setInterval(await getCripto, 30000, dai_ars_sell, dai_ars_buy, btc_ars_sell, btc_ars_buy, dai_usd_sell, dai_usd_buy); // Cada 30 secs
                    colocarDatosBasicos(userEmail, userNameHeader); // Pone nombre y apellido en el header

                    btnSignOut.addEventListener('click', cerrarSesion);

                    btn_ingresar_btc.addEventListener('click', (e) => {
                        e.preventDefault();

                        if(validarInput(input_ingresar_btc)){

                            input_ingresar_btc.classList.remove("error-input")
                            $(mensaje_de_error).fadeOut();
                            btn_ingresar_btc.disabled = true;
                            input_ingresar_btc.readOnly = true;
                            $(mensaje_de_operacion).fadeIn(500);
                            
                            setTimeout(() => {
                                $(mensaje_de_exito).fadeIn(500)
                                guardarOperacion("btc", "ingreso", input_ingresar_btc, userEmail);
    
                                
                                setTimeout(() => {
                                    $(mensaje_de_operacion).fadeOut(500);
                                    $(mensaje_de_exito).fadeOut(500);
                                    input_ingresar_btc.readOnly = false;
                                    btn_ingresar_btc.disabled = false;
                                    form_ingresar_btc.reset();
                                }, 5000);

                            }, 4000);
                        } else{

                            input_ingresar_btc.classList.add("error-input")
                            $(mensaje_de_error).fadeIn();

                            setTimeout(() => {
                                input_ingresar_btc.classList.remove("error-input")
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