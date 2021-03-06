export default () =>{
    const header = 
    `<div class="menu-header">
    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg d-flex justify-content-between">
            <a class="header-logo d-flex align-items-center" href="#/home">
                <img src="./src/resources/images/logo.png" alt="Este es el logo de la pag" width= "300px">
            </a>
            <button class="navbar-toggler" data-target="#menu" data-toggle="collapse" type="button">
                <span class="navbar-toggler-icon"><i class="fas fa-bars"></i></span>
            </button>
            <div class="collapse navbar-collapse" id="menu">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-item dropdown-toggle" data-toggle="dropdown" data-target="desplegable" href="#">Inicio</a>
                        <div class="dropdown-menu">
                            <div class="dropdown-item">
                                <a class="que-es-cripto-link" >¿Qué es cripto?</a>
                            </div>
                            <div class="dropdown-item">
                                <a class="about-us-link"> Sobre nosotros</a>
                            </div>
                            <div class="dropdown-item">
                                <a class="step-by-step-link">Paso a paso</a>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item"><a class="get-app-link">Descargá la app</a></li>
                    <li class="nav-item"><a class="contact-link">Contacto</a></li>
                    <li class="nav-item dropdown">
                        <a class="nav-item dropdown-toggle" data-toggle="dropdown" data-target="desplegable2" >Ingresar/Registrarse</a>
                        <div class="dropdown-menu">
                            <div class="dropdown-item">
                                <a href="#/login">Iniciar sesión</a>
                            </div> 
                            <div class="dropdown-item">
                                <a href="#/register">Registrarse</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</div>`;
    const views = 
    `<div class="hero d-flex align-items-center">
    <div class="hero-container container d-flex flex-column align-items-center justify-content-center">
        <div class="hero-text d-flex flex-column">
            <h1>¿Cansado de perder contra la inflación?</h1>
            <h2>Las criptomonedas son tu solución.</h2>
            <h2>Bienvenido a la economía del futuro. ¡Empecemos!</h2>
        </div>
        <i class="fas fa-angle-double-down"></i>
    </div>
</div>

<div class="definition">
    <div class="container">

        <div class="central-line">
            <div class="circle-line">
                <div class="left-line">
                    <div class="right-line"></div>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-between">
            <div class="wow animate__animated animate__fadeInLeft definition-card">
                <h3>¿Qué es una cripto?</h3>
                <p>Una criptomoneda es una divisa o moneda virtual, la cual se crea y se almacena de manera electrónica, asimismo, no cuenta con la regulación de algún gobierno ni respaldo físico, ya que lo que brinda seguridad a sus usuarios y transacciones es el hecho de que están basadas como su nombre lo indica, en criptografía (técnica de escribir procedimientos o claves secretas, de tal forma que lo escrito solamente sea inteligible para quien sepa descifrarlo).</p>
            </div>
            <div class="bitcoin-image"></div>
        </div>
        <div class="d-flex justify-content-between flex-row-reverse">
            <div class="wow animate__animated animate__fadeInRight definition-card">
                <h3>Blockchain</h3>
                <p>Como se mencionó, al no contar con algún tipo de regulación de parte de gobiernos o bancos, estas monedas digitales son creadas y controladas por programas o algoritmos, los cuales determinan la manera en que se realizan y registran las transacciones. En otras palabras, son los usuarios quienes registran las transacciones directamente entre pares, en lugar de hacerlo por medio de bancos o intermediarios, a este sistema se le conoce como blockchain.</p>
            </div>
            <div class="criptos-image"></div>
        </div>
        <div class="d-flex justify-content-center">
            <div class="wow animate__animated animate__fadeInUp definition-card">
                <h3>Criptodivisas</h3>
                <p>Existe un gran número de criptodivisas disponibles, todas con sus propias características y aplicaciones. Las que tienen mayor capitalización de mercado son bitcoin cash, ether, litecoin, ripple y dash, y otras siguen la cotización de una moneda Fiat, una de las más conocidas, dai.</p>
            </div>
        </div>

        <div class="criptos-lines">
            <div class="cripto-line1">
                <div class="cripto-line2">
                    <div class="cripto-lines-again"></div>
                    <div class="cripto-lines-again"></div>
                    <div class="cripto-lines-again"></div>
                    <div class="cripto-lines-again"></div>
                    <div class="cripto-lines-again"></div>
                    <div class="cripto-lines-again"></div>
                </div>
            </div>
        </div>

        <div class="wow animate__animated animate__fadeInUp card-criptos d-flex justify-content-center">
            <div class="card-cripto d-flex flex-column justify-content-center align-items-center">
                <i class="cf cf-btc"></i>
                <span id="btc">11</span>
            </div>
            <div class="card-cripto d-flex flex-column justify-content-center align-items-center">
                <i class="cf cf-eth"></i>
                <span id="eth">1</span>
            </div>
            <div class="card-cripto d-flex flex-column justify-content-center align-items-center">
                <i class="cf cf-ltc"></i>
                <span id="ltc">1</span>
            </div>
            <div class="card-cripto d-flex flex-column justify-content-center align-items-center">
                <i class="cf cf-xrp"></i>
                <span id="xrp">1</span>
            </div>
            <div class="card-cripto d-flex flex-column justify-content-center align-items-center">
                <i class="cf cf-dash"></i>
                <span id="dash">1</span>
            </div>
            <div class="card-cripto d-flex flex-column justify-content-center align-items-center">
                <i class="cf cf-dai"></i>
                <span id="dai">1</span>
            </div>
        </div>
    </div>
</div>

<div class="about-us">
    <div class="container d-flex justify-content-center align-items-center flex-column">
        <div class="about-us-text">
            <h3>Y nosotros...<span>¿Qué te ofrecemos?</span></h3>
        </div>
        <div class="about-us-cards">
            <div class="d-flex justify-content-center">
                <div class="wow animate__animated animate__fadeInRight about-us-cards-item d-flex flex-column align-items-center justify-content-center">
                    <i class="far fa-thumbs-up"></i>
                    <p>Una plataforma completamente legal y segura, autorizada por el gobierno nacional para operar en la compra y venta de criptomonedas. <a  href="#">saber más</a></p>
                </div>
                <div class="wow animate__animated animate__fadeInUp about-us-cards-item d-flex flex-column align-items-center justify-content-center">
                    <i class="far fa-check-circle"></i>
                    <p>Te validamos la identidad al instánte, sin que tengas largas horas de espera en verificación, en 5 minutos tu cuenta estará validada para operar. 😉</p>
                </div>
                <div class="wow animate__animated animate__fadeInLeft about-us-cards-item d-flex flex-column align-items-center justify-content-center">
                    <i class="fas fa-shield-alt"></i>
                    <p>Te aseguramos la mejor tecnología de encriptación para que tu cuenta y tus criptomonedas estén seguras en todo momento.</p>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <div class="wow animate__animated animate__fadeInRight about-us-cards-item d-flex flex-column align-items-center justify-content-center">
                    <i class="far fa-handshake"></i>
                    <p>Te ofrecemos las comisiones más bajas del mercado. ¿Cómo? <a href="#">saber más</a></p>
                </div>
                <div class="wow animate__animated animate__fadeInUp about-us-cards-item d-flex flex-column align-items-center justify-content-center">
                    <i class="fab fa-fly"></i>
                    <p>Olvidate de los impuestos, los límites y las retenciones del gobierno nacional, acá nadie te va a cobrar eso, el cielo es el límite. <span>(y ni eso)</span></p>
                </div>
                <div class="wow animate__animated animate__fadeInLeft about-us-cards-item d-flex flex-column align-items-center justify-content-center">
                    <i class="fas fa-user-check"></i>
                    <p>Un soporte que te otorgará asistencia en todo lo que necesites las 24 horas del día, los 7 días de la semana.</p>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="separator2"></div>

<div class="step-by-step">
    <div class="container">
        <div class="step-by-step-title">
            <h3>¿Cómo crear tu cuenta? <span>¡Es muy simple!</span></h3>
        </div>
        <div class="d-flex justify-content-center align-items-center">
            <div class="step-by-step-img">
                <img src="./src/resources/images/step-by-step.png" alt="Usuario registrándose" width="400px">
            </div>
            <div class="step-by-step-text">
                <div class="wow animate__animated animate__slideInRight step-by-step-text-item">
                    <h4>Primer paso</h4>
                    <span>Regístrate completando todos los datos que se te pide. <i class="far fa-id-card"></i> ¡No nos mientas eh! lo vamos a saber.</span>
                </div>
                <div class="wow animate__animated animate__slideInRight step-by-step-text-item">
                    <h4>Segundo paso</h4>
                    <span>Validá la cuenta en 5 minutos. <i class="fas fa-rocket"></i> Va a ser más rápido que el repartidor entregándote la pizza, creenos.</span>
                </div>
                <div class="wow animate__animated animate__slideInRight step-by-step-text-item">
                    <h4>Tercer paso</h4>
                    <span>¡Listo! <i class="fas fa-user-check"></i> ya estás listo para operar con nosotros. Más adelante te vamos a pedir unos datos adicionales para asegurarnos ciertos temas, pero no te preocupes, será rápido también. 😉</span>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="separator3"></div>

<div class="get-app">
    <div class="wow animate__animated animate__zoomIn container d-flex flex-row-reverse justify-content-around align-items-center">
        <div class="get-app-image">
            <img src="./src/resources/images/app.png" alt="Descargá la app" width="350px">
        </div>
        <div class="get-app-text">
            <div>
                <h3 class="get-app-text-title">¿Ya está todo listo? ¡Descárgate la app y llevá tus criptomonedas a cualquier parte!</h3>
                <span class="get-app-text-span d-flex">Descarga nuestra aplicación en la Play Store para Android y en la App Store para IOS</span>
            </div>
            <div class="get-app-text-shop d-flex justify-content-center align-items-center">
                <a href="#"><img src="./src/resources/images/google-play-badge.png" alt="descargalo en la playstore" width="170px"></a>
                <a href="#"><img src="./src/resources/images/App_Store_Badge.png" alt="descargalo en la appstore" width="150px"></a>
            </div>
        </div>
    </div>
</div>

<div class="separator4"></div>

<div class="form contact">
    <div class="container d-flex justify-content-around">
        <div class="form-text">
            <h3>¿Te quedó alguna duda de lo que hacemos?</h3>
            <h4>Podés escribirnos y te vamos a asesorar en todo lo que necesites</h4>
            <div class="form-text-social d-flex flex-column">
                <a href="mailto:consultas@criptocoins.com"><span><i class="fas fa-envelope"></i> consultas@criptocoins.com</span></a>
                <a href="#" target="_blank"><span><i class="fab fa-whatsapp-square"></i> Whatsapp</span></a>
                <a href="#" target="_blank"><span><i class="fab fa-instagram-square"></i> Instagram</span></a>
                <a href="#" target="_blank"><span><i class="fab fa-twitter-square"></i> Twitter</span></a>
            </div>
        </div>
        <form action="index.html">
            <div class="form-inputs-basic d-flex flex-column">
                <label for="userName">Poné tu nombre:</label>
                <input required type="text" name="userName" placeholder="Pon tu nombre. Ejemplo: Pepe">
                <label for="userLastName">Poné tu apellido:</label>
                <input required type="text" name="userLastName" placeholder="Pon tu apellido. Ejemplo: Quiroga">
                <label for="userEmail">Poné tu email:</label>
                <input required type="text" name="userEmail" placeholder="Pon tu email. Ejemplo: pepequiroga@gmail.com">
            </div> 

            <div class="form-inputs-textAreaAndCheckbox d-flex flex-column">
                <label for="userAsunt">Ingrese aquí el asunto, por favor:</label>
                <textarea required name="userAsunt" cols="30" rows="10" placeholder="Insertá acá tu preocupación/pregunta."></textarea>
                <span><input type="checkbox" name="checkboxNewLetter">¿Quiere recibir novedades acerca de Cripto Coins?</span>
            </div>

            <div class="form-inputs-buttons">
                <input type="submit" value="Enviar">
                <input type="reset" value="Vaciar Información">
            </div>

        </form>
    </div>
</div>`;
    const footer =
    `<div class="footer-container">
    <div class="container d-flex flex-column">
        <div class="footer-container-sections d-flex justify-content-around">
            <div class="footer-container-sections-item">
                <h5>Cuenta</h5>
                <ul>
                    <li><a href="./src/views/register.html">Crear cuenta</a></li>
                    <li><a href="./src/views/login.html">Iniciar sesión</a></li>
                    <li><a href="#">Trading</a></li>
                    <li><a href="#">Depósitos</a></li>
                    <li><a href="#">Retiros</a></li>
                    <li><a href="#">Seguridad de la cuenta</a></li>
                </ul>
            </div>

            <div class="footer-container-sections-item">
                <h5>General</h5>
                <ul>
                    <li><a href="#">Estado del sitio</a></li>
                    <li><a href="#">Comisiones</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Blog</a></li>
                </ul>
            </div>

            <div class="footer-container-sections-item">
                <h5>Legal</h5>
                <ul>
                    <li><a href="#">Términos y Condiciones</a></li>
                    <li><a href="#">Política de privacidad</a></li>
                    <li><a href="#">Política de Cookies</a></li>
                    <li><a href="#">Riesgo de mercado</a></li>
                </ul>
            </div>
        </div>
    
        <div class="autor align-self-center">
            <span>This page was made with ❤️ by <a href="https://github.com/nicx-g" target="_blank">nicx-g</a></span>
        </div>
    </div>
</div>`;
    const divElement = document.createElement("div");
    divElement.innerHTML = `${header} ${views} ${footer}`;

    // Código JS

    // Elementos del DOM
    
    const menu_header = divElement.querySelector('.menu-header'); 
    const menu_header_logo = divElement.querySelector('.header-logo img'); 

    const queEsCripto = divElement.querySelector('.definition');
    const aboutUs = divElement.querySelector('.about-us');
    const stepByStep = divElement.querySelector('.step-by-step');
    const getApp = divElement.querySelector('.get-app');
    const contact = divElement.querySelector('.contact');

    const linkQueEsCripto = divElement.querySelector('.que-es-cripto-link')
    const linkAboutUs = divElement.querySelector('.about-us-link')
    const linkStepByStep = divElement.querySelector('.step-by-step-link')
    const linkGetApp = divElement.querySelector('.get-app-link')
    const linkContact = divElement.querySelector('.contact-link')

    const btc = divElement.querySelector('#btc');
    const eth = divElement.querySelector('#eth');
    const ltc = divElement.querySelector('#ltc');
    const xrp = divElement.querySelector('#xrp');
    const dash = divElement.querySelector('#dash');
    const dai = divElement.querySelector('#dai');

    // Redirecciona a la sección seleccionada
    
    $(linkQueEsCripto).on('click', () => {
        smoothScroll(queEsCripto, 1000);
    })
    $(linkAboutUs).on('click', () => {
        smoothScroll(aboutUs, 1000);
    })
    $(linkStepByStep).on('click', () => {
        smoothScroll(stepByStep, 1000);
    })
    $(linkGetApp).on('click', () => {
        smoothScroll(getApp, 1000);
    })
    $(linkContact).on('click', () => {
        smoothScroll(contact, 1000);
    })

    let scrollPos = 0;

    // Esta funcion no la terminé de entender muy bien pero toma la distancia que existe entre el top y el objetivo, y el tiempo si no me equivoco sirve para la animación, pero es muy complejo, sobre todo la función que realiza la animación
    function smoothScroll (objetivo, duration){
        let target = objetivo;
        let targetPosition = target.getBoundingClientRect().top;
        let startPosition = window.pageYOffset;
        let distance = targetPosition - startPosition;
        let startTime = null;

        function animation (currentTime){
            if(startTime === null) startTime = currentTime;
            let timeElapsed = currentTime - startTime;
            let run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if(timeElapsed < duration) requestAnimationFrame(animation);

        }

        function ease(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        };

        requestAnimationFrame(animation)
    }



    // Esta función toma el scroll del usuario, si es mayor a 450 se le agrega estilos y animaciones, una vez pasa los 600 el header se "oculta" cuando scrolleas para abajo, si subís, se aparece nuevamente
    $(window).on('scroll', () => {


        if (document.documentElement.scrollTop > 450) {
            menu_header.classList.add("menu-header-scroll");
            menu_header_logo.classList.add('logo-chico');
            menu_header_logo.classList.remove('logo-grande');
        } else{
            menu_header.classList.remove("menu-header-scroll");
            menu_header_logo.classList.remove('logo-chico');
            menu_header_logo.classList.add('logo-grande');
        }

        if((document.body.getBoundingClientRect()).top > scrollPos) {
            menu_header.style.top = "0";
        } else {
            if(document.documentElement.scrollTop > 600){
            menu_header.style.top = "-100px";
            }
        }

        scrollPos = (document.body.getBoundingClientRect()).top;

    })


    // Obtiene la cotización de las monedas que figuran en el home y las coloca    
    const getCotizacionCriptosCap = () => {

        $.ajax({
            type: "GET",
            url: `https://api.coinranking.com/v1/public/coins?base=ARS&timePeriod=24h&ids=1,178,7,3,13,68589&sort=price`,
            dataType: "json"
        }).then((response) => {
            
            $(btc).slideUp()
            $(eth).slideUp()
            $(ltc).slideUp()
            $(xrp).slideUp()
            $(dash).slideUp()
            $(dai).slideUp()
            
            btc.innerHTML = `$${Number(response.data.coins[0].price).toFixed(2)}`;
            eth.innerHTML = `$${Number(response.data.coins[1].price).toFixed(2)}`;
            ltc.innerHTML = `$${Number(response.data.coins[2].price).toFixed(2)}`;
            xrp.innerHTML = `$${Number(response.data.coins[3].price).toFixed(2)}`;
            dash.innerHTML = `$${Number(response.data.coins[4].price).toFixed(2)}`;
            dai.innerHTML = `$${Number(response.data.coins[5].price).toFixed(2)}`;
            
            $(btc).slideDown()
            $(eth).slideDown()
            $(ltc).slideDown()
            $(xrp).slideDown()
            $(dash).slideDown()
            $(dai).slideDown()
        })
    }

    getCotizacionCriptosCap();
    setInterval(getCotizacionCriptosCap, 30000) // cada 30 segundos
    return divElement
}