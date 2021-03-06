// Esta función va a guardar las operaciones de deposito o retiro

async function guardarOperacion(monedaQueModifica, retiroOIngreso, input, userEmail) {

    const userMoney = firestore.doc(`Users/${userEmail}/operaciones/monedero`); //Base de datos de monedero
    
    let getMoney = await userMoney.get(); // Obtener datos 
    
    let valueMoney = parseFloat(input.value);

    let ars_actual = await getMoney.data().ars;
    let usd_actual = await getMoney.data().usd;
    let dai_actual = await getMoney.data().dai;
    let btc_actual = await getMoney.data().btc;

    switch (monedaQueModifica) {
        case "ars":
            if(retiroOIngreso == "retiro"){

                let moneda_actual = ars_actual - valueMoney

                userMoney.set({
                    ars: moneda_actual,
                    usd: usd_actual,
                    dai: dai_actual,
                    btc: btc_actual
                });

                guardarhistorial("Retiro de ARS", valueMoney, userEmail);

            } else if (retiroOIngreso == "ingreso"){

                let moneda_actual = valueMoney + ars_actual

                userMoney.set({
                    ars: moneda_actual,
                    usd: usd_actual,
                    dai: dai_actual,
                    btc: btc_actual
                });

                guardarhistorial("Ingreso de ARS", valueMoney, userEmail);
            }
            break;

        case "usd":
            if(retiroOIngreso == "retiro"){

                let moneda_actual = usd_actual - valueMoney

                userMoney.set({
                    ars: ars_actual,
                    usd: moneda_actual,
                    dai: dai_actual,
                    btc: btc_actual
                });

                guardarhistorial("Retiro de USD", valueMoney, userEmail);

            } else if (retiroOIngreso == "ingreso"){

                let moneda_actual = valueMoney + usd_actual

                userMoney.set({
                    ars: ars_actual,
                    usd: moneda_actual,
                    dai: dai_actual,
                    btc: btc_actual
                });

                guardarhistorial("Ingreso de USD", valueMoney, userEmail);
            }
            break;

        case "dai":
            if(retiroOIngreso == "retiro"){

                let moneda_actual = dai_actual - valueMoney 

                userMoney.set({
                    ars: ars_actual,
                    usd: ars_actual,
                    dai: moneda_actual,
                    btc: btc_actual
                });

                guardarhistorial("Retiro de DAI", valueMoney, userEmail);

            } else if (retiroOIngreso == "ingreso"){

                let moneda_actual = valueMoney + dai_actual

                userMoney.set({
                    ars: ars_actual,
                    usd: usd_actual,
                    dai: moneda_actual,
                    btc: btc_actual
                });

                guardarhistorial("Ingreso de DAI", valueMoney, userEmail);
            }

            break;
        case "btc":
            if(retiroOIngreso == "retiro"){

                let moneda_actual = btc_actual - valueMoney

                userMoney.set({
                    ars: ars_actual,
                    usd: ars_actual,
                    dai: dai_actual,
                    btc: moneda_actual
                });

                guardarhistorial("Retiro de BTC", valueMoney, userEmail);

            } else if (retiroOIngreso == "ingreso"){

                let moneda_actual = valueMoney + btc_actual

                userMoney.set({
                    ars: ars_actual,
                    usd: usd_actual,
                    dai: dai_actual,
                    btc: moneda_actual
                });

                guardarhistorial("Ingreso de BTC", valueMoney, userEmail);
            }    

            break;
    }
} 

// Esta funcion va a recibir por parámetro el nombre de la operación "retiro/ingreso de moenda" y el monto que ya lo vas a aclarar con el input de la funcion guardarOperacion() y va a guardar el historial de esa misma operacion

async function guardarhistorial(operacion, monto, userEmail){

    const userHistory = firestore.collection(`Users/${userEmail}/historial`);
    const userHistory_depositos_y_retiros = firestore.collection(`Users/${userEmail}/historial/depositos-y-retiros/data`);

    
    // Me saca la fecha y la hora actual
    
    let hoy = new Date();
    
    const fechaActual = `${hoy.getDate()}-${hoy.getMonth() + 1}-${hoy.getFullYear()}`;
    const hora = hoy.getHours();
    const minuto = hoy.getMinutes();
    let horaPosta = "";
    let minutoPosta = "";

    //Acá le agrega un 0 a la hora y minuto si llega a tener un sólo digito. ej: 1:5 = 01:05
    
    if (hora < 10){
        horaPosta = `0${hora}`
    } else{
        horaPosta = hora;
    }
    if (minuto < 10){
        minutoPosta = `0${minuto}`
    } else{
        minutoPosta = minuto;
    }

    // Setea historial de depósitos y retiro

    userHistory_depositos_y_retiros.add({
        titulo: `<i class="fas fa-piggy-bank"></i>${operacion}`,
        monto: monto,
        fecha: fechaActual,
        hora: `${horaPosta}:${minutoPosta}`
    })

    // Setea historial general
    userHistory.add({
        titulo: `<i class="fas fa-piggy-bank"></i>${operacion}`,
        monto: monto,
        fecha: fechaActual,
        hora: `${horaPosta}:${minutoPosta}`
    })
}

// Valida si el value del input es un número o no

function validarInput(inputId){
    let checkearInput = inputId.value
    
    if(!isNaN(checkearInput)){
        return true;
    } else{
        return false;
    }
}

//Coloca en el header el nombre y apellido del usuario

const colocarDatosBasicos = async (userEmail, elementoDom) => {
    
    let userNameHeader = elementoDom;

    const userData = firestore.doc(`Users/${userEmail}`); //Base de datos
    const getUserData = () => userData.get() // Obtiene los datos

    const userDataBasic = await getUserData();
    
    const userName = userDataBasic.data().nombre;
    const userLastname = userDataBasic.data().apellido;

    userNameHeader.innerHTML = `${userName} ${userLastname}` // Los coloca

}

// Conjunto de funciones que crean el actualizador de criptomonedas en el header

//Coloca precios actuales de las cripto en el dashboard
            
function getCripto(daiArsSell, daiArsBuy, btcArsSell, btcArsBuy, daiUsdSell, daiUsdBuy){
    $.ajax({
        type: "GET",
        url: 'https://api.coinranking.com/v1/public/coins?base=USD&timePeriod=24h&ids="0,68589&sort=price',
        dataType: "json",
        success: (response) => {
            renderUsd(response, daiUsdBuy, daiUsdSell)
        }
    })
    $.ajax({
        type: "GET",
        url: 'https://api.coinranking.com/v1/public/coins?base=ARS&timePeriod=24h&ids="0,1,68589&sort=price',
        dataType: "json",
        success: (response) => {
            renderArs(response, daiArsSell, daiArsBuy, btcArsSell, btcArsBuy)
        }
    })
}

function renderArs(response, daiArsSell, daiArsBuy, btcArsSell, btcArsBuy) {

    let buyBtcPriceValue = Number(parseInt(response.data.coins[1].price)).toFixed(2);
    let buyDaiPriceValue = Number(response.data.coins[2].price).toFixed(2);

    let sellBtcPriceValue = Number(parseInt(response.data.coins[1].price) - parseInt(response.data.coins[1].price) * 4 / 100).toFixed(2);
    let sellDaiPriceValue = Number(Number(response.data.coins[2].price).toFixed(2) - Number(response.data.coins[2].price).toFixed(2) * 4 / 100).toFixed(2);

    $(btcArsBuy).slideUp();
    $(daiArsBuy).slideUp();
    $(btcArsSell).slideUp();
    $(daiArsSell).slideUp();

    $(btcArsBuy).html(buyBtcPriceValue);
    $(daiArsBuy).html(buyDaiPriceValue);
    $(btcArsSell).html(sellBtcPriceValue);
    $(daiArsSell).html(sellDaiPriceValue);

    $(btcArsBuy).slideDown();
    $(daiArsBuy).slideDown();
    $(btcArsSell).slideDown();
    $(daiArsSell).slideDown();
}

function renderUsd(response, daiUsdBuy, daiUsdSell) {

    let buyUsdPriceValue = Number(parseFloat(response.data.coins[1].price) + 0.06).toFixed(2);
    let sellUsdPriceValue = Number(parseFloat(response.data.coins[1].price) + 0.02).toFixed(2);

    $(daiUsdBuy).slideUp();
    $(daiUsdSell).slideUp();

    $(daiUsdBuy).html(buyUsdPriceValue);
    $(daiUsdSell).html(sellUsdPriceValue);

    $(daiUsdBuy).slideDown();
    $(daiUsdSell).slideDown();
}

// Cierra sesión

async function cerrarSesion(){
    await firebase.auth().signOut()
    window.location.href = "#/login"
}

// Coloca el historial dependiendo de cual quieras, en el segundo parámetro le tenés que colocar si querés el historial "total", el de "depositosyretiros" o el de "compraventa"

const colocarHistorial = async(userEmail, HistorialADesear, domElement) => {

    switch (HistorialADesear) {
        case "total":
            
            const userHistoryAll = firestore.collection(`Users/${userEmail}/historial`)
            const getHistoryAll = () => userHistoryAll.get();
        
            const allHistory = await getHistoryAll();
            domElement.innerHTML = '';
            
            allHistory.forEach((doc) => {
        
                const historyitem = doc.data();
                if(historyitem.monto){
                    domElement.innerHTML +=
                    `<div class="historial-item  d-flex justify-content-around align-items-center">
                        <div class="d-flex">
                            <span id="history-title">${historyitem.titulo}</span>
                        </div>
                        
                        <div class="d-flex flex-column align-items-center justify-content-center">
                            <span>$${historyitem.monto}</span>
                            <span>${historyitem.fecha} ${historyitem.hora}</span>
                        </div>
                    </div>`
                    
                } else if (historyitem.cotizacion){
                    domElement.innerHTML +=
                `<div class="historial-item  d-flex justify-content-around align-items-center">
                    <div class="d-flex">
                        <span id="history-title">${historyitem.titulo}</span>
                    </div>
                    
                    <div class="d-flex flex-column align-items-center justify-content-center">
                        <span>Cotización: ${historyitem.cotizacion}</span>
                        <span>${historyitem.fecha} ${historyitem.hora}</span>
                    </div>
                </div>`
                }
            })

            break;


        case "depositosyretiros":
            
            const userHistoryDepositoyRetiro = firestore.collection(`Users/${userEmail}/historial/depositos-y-retiros/data`)
            const getHistoryDR = () => userHistoryDepositoyRetiro.get();
        
            const HistoryDR = await getHistoryDR();
            domElement.innerHTML = '';
            
            HistoryDR.forEach((doc) => {
        
                const historyitem = doc.data();
                domElement.innerHTML +=
                `<div class="historial-item  d-flex justify-content-around align-items-center">
                    <div class="d-flex">
                        <span id="history-title">${historyitem.titulo}</span>
                    </div>
                    
                    <div class="d-flex flex-column align-items-center justify-content-center">
                        <span>$${historyitem.monto}</span>
                        <span>${historyitem.fecha} ${historyitem.hora}</span>
                    </div>
                </div>`
            })

            break;


        case "compraventa":
            
            const userHistoryCompraVenta = firestore.collection(`Users/${userEmail}/historial/compra-y-venta/data`)
            const getHistoryCV = () => userHistoryCompraVenta.get();
        
            const HistoryCV = await getHistoryCV();
            domElement.innerHTML = '';
            
            HistoryCV.forEach((doc) => {
        
                const historyitem = doc.data();
                domElement.innerHTML +=
                `<div class="historial-item  d-flex justify-content-around align-items-center">
                    <div class="d-flex">
                        <span id="history-title">${historyitem.titulo}</span>
                    </div>
                    
                    <div class="d-flex flex-column align-items-center justify-content-center">
                        <span>Cotización: ${historyitem.cotizacion}</span>
                        <span>${historyitem.fecha} ${historyitem.hora}</span>
                    </div>
                </div>`
            })

            break;
    
        default:
            break;
    }
}

// Me obtiene la cotización de las cripto, podría haber mejorado la que ya hice? sí. Sólo acepta "ARS" o "USD" y se utiliza en la compraventa cuando se trata de la actualizacion de los inputs para obtener el valor correcto

const getCotizacion = (cotizaEn, compraOVenta, leftOrRight, operacion, inputLeft, inputRight, cotizacionOperacion) => {

    $.ajax({
        type: "GET",
        url: `https://api.coinranking.com/v1/public/coins?base=${cotizaEn}&timePeriod=24h&ids=1,68589&sort=price`,
        dataType: "json"
    }).then((response) => {
        actualizarValoresInput(response, compraOVenta, leftOrRight, operacion, inputLeft, inputRight, cotizacionOperacion)
    })

}

// Esta función va a hacer que el value de los inputs cambien dependiendo de la cotización que desee. cotizaEn puede recibir "ARS" o "USD"

const actualizarValoresInput = async(response, compraOVenta, leftOrRight, operacion, inputLeft, inputRight, cotizacionOperacion) => {
    
    let dai_ars_sell = parseFloat(response.data.coins[1].price) - parseFloat(response.data.coins[1].price) * 4 / 100;
    let dai_ars_buy = parseFloat(response.data.coins[1].price);
    let dai_usd_sell = parseFloat(response.data.coins[1].price) + 0.02;
    let dai_usd_buy = parseFloat(response.data.coins[1].price) + 0.06;
    let btc_ars_sell = parseFloat(response.data.coins[0].price) - parseFloat(response.data.coins[1].price) * 4 / 100;
    let btc_ars_buy = parseFloat(response.data.coins[0].price);

    switch (compraOVenta) {
        case "compra":

            switch (leftOrRight) {
                case "left":
                    
                    switch (operacion) {
                        case "daiars":
                            
                            inputRight.value = Number((dai_ars_buy * inputLeft.value).toFixed(2));
                            cotizacionOperacion.innerHTML = `Tu cotización es: ${Number(dai_ars_buy).toFixed(2)} DAI/ARS`;

                            break;
                    
                        case "daiusd":

                            inputRight.value = Number((dai_usd_buy * inputLeft.value).toFixed(2));
                            cotizacionOperacion.innerHTML = `Tu cotización es: ${Number(dai_usd_buy).toFixed(2)} DAI/USD`;
                            
                            break;

                        case "btcars":

                            inputRight.value = Number(btc_ars_buy * inputLeft.value).toFixed(2);
                            cotizacionOperacion.innerHTML = `Tu cotización es: ${Number(btc_ars_buy).toFixed(2)} BTC/ARS`;

                            break;

                    }
                    break;
            
                case "right":
        
                    switch (operacion) {
                        case "daiars":
                            
                            inputLeft.value = Number((inputRight.value / dai_ars_buy).toFixed(2));
                            cotizacionOperacion.innerHTML = `Tu cotización es: ${Number(dai_ars_buy).toFixed(2)} DAI/ARS`;

                            break;
                    
                        case "daiusd":

                            inputLeft.value = Number((inputRight.value / dai_usd_buy).toFixed(2));
                            cotizacionOperacion.innerHTML = `Tu cotización es: ${Number(dai_usd_buy).toFixed(2)} DAI/USD`;
                            
                            break;

                        case "btcars":

                            inputLeft.value = Number((inputRight.value / btc_ars_buy)).toFixed(5);
                            cotizacionOperacion.innerHTML = `Tu cotización es: ${Number(btc_ars_buy).toFixed(2)} BTC/ARS`;

                            break;
                            
                    }
                    break;

            }
            break;

        case "venta":

            switch (leftOrRight) {
                case "left":
                    
                    switch (operacion) {
                        case "daiars":
                            
                            inputRight.value = Number((dai_ars_sell * inputLeft.value).toFixed(2));
                            cotizacionOperacion.innerHTML = `Tu cotización es: ${Number(dai_ars_sell).toFixed(2)} DAI/ARS`;

                            break;
                    
                        case "daiusd":

                            inputRight.value = Number((dai_usd_sell * inputLeft.value).toFixed(2));
                            cotizacionOperacion.innerHTML = `Tu cotización es: ${Number(dai_usd_sell).toFixed(2)} DAI/USD`;

                            break;

                        case "btcars":

                            inputRight.value = Number(btc_ars_sell * inputLeft.value).toFixed(2);
                            cotizacionOperacion.innerHTML = `Tu cotización es: ${Number(btc_ars_sell).toFixed(2)} BTC/ARS`;

                            break;

                    }
                    break;
            
                case "right":
        
                    switch (operacion) {
                        case "daiars":
                            
                            inputLeft.value = Number((inputRight.value / dai_ars_sell).toFixed(2));
                            cotizacionOperacion.innerHTML = `Tu cotización es: ${Number(dai_ars_sell).toFixed(2)} DAI/ARS`;

                            break;
                    
                        case "daiusd":

                            inputLeft.value = Number((inputRight.value / dai_usd_sell).toFixed(2));
                            cotizacionOperacion.innerHTML = `Tu cotización es: ${Number(dai_usd_sell).toFixed(2)} DAI/USD`;
                            
                            break;

                        case "btcars":

                            inputLeft.value = Number(inputRight.value / btc_ars_sell).toFixed(5);
                            cotizacionOperacion.innerHTML = `Tu cotización es: ${Number(btc_ars_sell).toFixed(2)} BTC/ARS`;

                            break;
                            
                    }
                    break;
            }
            break;
    }
    
}

// Esta función me va a validar que no esté vacío el input de la compra venta, si checkeó el input:checked y si tiene los fondos suficientes

const validarFondos = async (userEmail, fondoAComprobar, inputRight, inputLeft) => {
    const userMoney = firestore.doc(`Users/${userEmail}/operaciones/monedero`);
    
    let getMoney = await userMoney.get();

    if (fondoAComprobar == "ars") {

        let fondoArs = getMoney.data().ars;

        if(fondoArs >= inputRight.value){
            return true;
        } else{
            return false;
            }
    
    } else if (fondoAComprobar == "usd") {

        let fondoUsd = getMoney.data().usd;

        if(fondoUsd >= inputRight.value){
            return true;
        } else{
            return false;
        }
    } else if (fondoAComprobar == "dai"){
        let fondoDai = getMoney.data().dai;

        if(fondoDai >= inputLeft.value){
            return true;
        } else{
            return false;
        }
    } else if (fondoAComprobar == "btc"){
        let fondoBtc = getMoney.data().btc;

        if(fondoBtc >= inputLeft.value){
            return true;
        } else{
            return false;
        }
    }
}

//Valida que el input sea específicamente un número

const validarInputCompraVenta = (inputLeft, inputRight) => {
    
    if (inputLeft.value == null || inputRight.value == null || inputLeft.value == 0 || inputRight.value < 1 || (inputLeft.value && inputRight.value).lenght < 1 || isNaN((inputLeft.value && inputRight.value))){
        return false
    } else if(!isNaN((inputLeft.value && inputRight.value))){
        return true;
    }
}

// Función que guarda la compraventa en la parte de operar

const guardarOperacionDeCompraVenta = async(userEmail, inputLeft, inputRight, compraOVenta, tipoDeOperacion) => {

    const userMoney = firestore.doc(`Users/${userEmail}/operaciones/monedero`);
    let getMoney = await userMoney.get();
    
    let ars_actual = await getMoney.data().ars;
    let usd_actual = await getMoney.data().usd;
    let dai_actual = await getMoney.data().dai;
    let btc_actual = await getMoney.data().btc;

    let valorInputLeft = Number(inputLeft.value);
    let valorInputRight = Number(inputRight.value);

    let monedaComprada;
    let monedaVendida;

    switch (compraOVenta) {
        case "compra":
            
            switch (tipoDeOperacion) {
                case "daiars":
                    
                    monedaComprada = valorInputLeft + dai_actual;
                    monedaVendida = ars_actual - valorInputRight;

                    userMoney.set({
                        ars: monedaVendida,
                        usd: usd_actual,
                        dai: monedaComprada,
                        btc: btc_actual
                    });
                    break;
            
                case "daiusd":
                    
                    monedaComprada = valorInputLeft + dai_actual;
                    monedaVendida = usd_actual - valorInputRight;

                    userMoney.set({
                        ars: ars_actual,
                        usd: monedaVendida,
                        dai: monedaComprada,
                        btc: btc_actual
                    });
                    break;

                case "btcars":

                    monedaComprada = valorInputLeft + btc_actual;
                    monedaVendida = ars_actual - valorInputRight;

                    userMoney.set({
                        ars: monedaVendida,
                        usd: usd_actual,
                        dai: dai_actual,
                        btc: monedaComprada
                    });
                    break;
            }
            break;
    
        case "venta":

            switch (tipoDeOperacion) {
                case "daiars":
                    
                    monedaComprada = valorInputRight + ars_actual;
                    monedaVendida = dai_actual - valorInputLeft;

                    userMoney.set({
                        ars: monedaComprada,
                        usd: usd_actual,
                        dai: monedaVendida,
                        btc: btc_actual
                    });
                    break;
            
                case "daiusd":
                    
                    monedaComprada = valorInputRight + usd_actual;
                    monedaVendida = dai_actual - valorInputLeft;

                    userMoney.set({
                        ars: ars_actual,
                        usd: monedaComprada,
                        dai: monedaVendida,
                        btc: btc_actual
                    });
                    break;

                case "btcars":

                    monedaComprada = valorInputRight + ars_actual;
                    monedaVendida = btc_actual - valorInputLeft;

                    userMoney.set({
                        ars: monedaComprada,
                        usd: usd_actual,
                        dai: dai_actual,
                        btc: monedaVendida
                    });
                    break;
            }
            break;
    }
}

// Va a guardar el historial de la compra o venta con la cotización de ese momento

const guardarHistorialCompraVentaYCotizacion = (cotizaEn, userEmail, compraOVenta, operacion, inputLeft) => {
    $.ajax({
        type: "GET",
        url: `https://api.coinranking.com/v1/public/coins?base=${cotizaEn}&timePeriod=24h&ids=1,68589&sort=price`,
        dataType: "json"
    }).then((response) => {
        guardarHistorialCompraVenta(response, userEmail, compraOVenta, operacion, inputLeft)
    })
}

// Va a guardar el historial de la compra o venta con la cotización de ese momento

const guardarHistorialCompraVenta = (response, userEmail, compraOVenta, operacion, inputLeft) => {

    const userHistory = firestore.collection(`Users/${userEmail}/historial`);
    const userHistory_compra_venta = firestore.collection(`Users/${userEmail}/historial/compra-y-venta/data`);

    let dai_ars_sell = Number(parseFloat(response.data.coins[1].price) - parseFloat(response.data.coins[1].price) * 4 / 100).toFixed(2);
    let dai_ars_buy = Number(parseFloat(response.data.coins[1].price)).toFixed(2);
    let dai_usd_sell = Number(parseFloat(response.data.coins[1].price) + 0.02).toFixed(2);
    let dai_usd_buy = Number(parseFloat(response.data.coins[1].price) + 0.06).toFixed(2);
    let btc_ars_sell = Number(parseFloat(response.data.coins[0].price) - parseFloat(response.data.coins[1].price) * 4 / 100).toFixed(2);
    let btc_ars_buy = Number(parseFloat(response.data.coins[0].price)).toFixed(2);

    // Me saca la fecha y la hora actual
    
    let hoy = new Date();
    
    const fechaActual = `${hoy.getDate()}-${hoy.getMonth() + 1}-${hoy.getFullYear()}`;
    const hora = hoy.getHours();
    const minuto = hoy.getMinutes();
    let horaPosta;
    let minutoPosta;

    //Acá le agrega un 0 a la hora y minuto si llega a tener un sólo digito. ej: 1:5 = 01:05
    
    if (hora < 10){
        horaPosta = `0${hora}`
    } else{
        horaPosta = hora;
    }
    if (minuto < 10){
        minutoPosta = `0${minuto}`
    } else{
        minutoPosta = minuto;
    }

    // 
    switch (compraOVenta) {
        case "compra":

            switch (operacion) {
                case "daiars":

                    userHistory_compra_venta.add({
                        titulo: `<i class="fas fa-handshake"></i>Compra de ${inputLeft.value} DAI`,
                        cotizacion: `${dai_ars_buy} DAI/ARS`,
                        fecha: fechaActual,
                        hora: `${horaPosta}:${minutoPosta}`
                    })
                
                    // Setea historial general
                    userHistory.add({
                        titulo: `<i class="fas fa-handshake"></i>Compra de ${inputLeft.value} DAI`,
                        cotizacion: `${dai_ars_buy} DAI/ARS`,
                        fecha: fechaActual,
                        hora: `${horaPosta}:${minutoPosta}`
                    })
                    break;
            
                case "daiusd":
                    
                    userHistory_compra_venta.add({
                        titulo: `<i class="fas fa-handshake"></i>Compra de ${inputLeft.value} DAI`,
                        cotizacion: `${dai_usd_buy} DAI/USD`,
                        fecha: fechaActual,
                        hora: `${horaPosta}:${minutoPosta}`
                    })
                
                    // Setea historial general
                    userHistory.add({
                        titulo: `<i class="fas fa-handshake"></i>Compra de ${inputLeft.value} DAI`,
                        cotizacion: `${dai_usd_buy} DAI/USD`,
                        fecha: fechaActual,
                        hora: `${horaPosta}:${minutoPosta}`
                    })
                    break;

                case "btcars":

                    userHistory_compra_venta.add({
                        titulo: `<i class="fas fa-handshake"></i>Compra de ${inputLeft.value} BTC`,
                        cotizacion: `${btc_ars_buy} BTC/ARS`,
                        fecha: fechaActual,
                        hora: `${horaPosta}:${minutoPosta}`
                    })
                
                    // Setea historial general
                    userHistory.add({
                        titulo: `<i class="fas fa-handshake"></i>Compra de ${inputLeft.value} BTC`,
                        cotizacion: `${btc_ars_buy} BTC/ARS`,
                        fecha: fechaActual,
                        hora: `${horaPosta}:${minutoPosta}`
                    })
                    break;
            }    
            break;
    
        case "venta":

            switch (operacion) {
                case "daiars":
                    
                    userHistory_compra_venta.add({
                        titulo: `<i class="fas fa-handshake"></i>Venta de ${inputLeft.value} DAI`,
                        cotizacion: `${dai_ars_sell} DAI/ARS`,
                        fecha: fechaActual,
                        hora: `${horaPosta}:${minutoPosta}`
                    })
                
                    // Setea historial general
                    userHistory.add({
                        titulo: `<i class="fas fa-handshake"></i>Venta de ${inputLeft.value} DAI`,
                        cotizacion: `${dai_ars_sell} DAI/ARS`,
                        fecha: fechaActual,
                        hora: `${horaPosta}:${minutoPosta}`
                    })
                    break;
            
                case "daiusd":
                    
                    userHistory_compra_venta.add({
                        titulo: `<i class="fas fa-handshake"></i>Venta de ${inputLeft.value} DAI`,
                        cotizacion: `${dai_usd_sell} DAI/USD`,
                        fecha: fechaActual,
                        hora: `${horaPosta}:${minutoPosta}`
                    })
                
                    // Setea historial general
                    userHistory.add({
                        titulo: `<i class="fas fa-handshake"></i>Venta de ${inputLeft.value} DAI`,
                        cotizacion: `${dai_usd_sell} DAI/USD`,
                        fecha: fechaActual,
                        hora: `${horaPosta}:${minutoPosta}`
                    })
                    break;

                case "btcars":

                    userHistory_compra_venta.add({
                        titulo: `<i class="fas fa-handshake"></i>Venta de ${inputLeft.value} BTC`,
                        cotizacion: `${btc_ars_sell} BTC/ARS`,
                        fecha: fechaActual,
                        hora: `${horaPosta}:${minutoPosta}`
                    })
                
                    // Setea historial general
                    userHistory.add({
                        titulo: `<i class="fas fa-handshake"></i>Venta de ${inputLeft.value} BTC`,
                        cotizacion: `${btc_ars_sell} BTC/ARS`,
                        fecha: fechaActual,
                        hora: `${horaPosta}:${minutoPosta}`
                    })
                    break;
            }
            break;
    }
}


// Exporto todas las funciones para utilizarlas en los diferentes controladores dependiendo de lo que necesite
export {guardarOperacion, guardarhistorial, validarInput, colocarDatosBasicos, getCripto, renderArs, renderUsd, cerrarSesion, colocarHistorial, actualizarValoresInput, getCotizacion, validarFondos, validarInputCompraVenta, guardarOperacionDeCompraVenta, guardarHistorialCompraVentaYCotizacion};