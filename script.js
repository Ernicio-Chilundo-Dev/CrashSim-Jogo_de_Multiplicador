let saldo = 100; // Sasldo inicial
let aposta = 0 ; // Valor opostado
let multiplcar = 1.0;
let crash = 0;
let intervalo;
let apostou = false;


// Elemento da interface
const saldoEl = document.getElementById("saldo");
const apostaEl = document.getElementById("aposta");
const apostarBtn = document.getElementById("apostar");
const cashoutBtn = document.getElementById("cashout");
const multiplicadorEl = document.getElementById("multiplicador");
const resultadoEl = document.getElementById("resultado")


//Atualiza saldo na interface
function atualizaSaldo(){
    saldoEl.textContent = saldo.toFixed(2);
}

// Comeca o jogo 
apostarBtn.addEventListener("click", ()=>{
    aposta = parseFloat(apostaEl.value);

    if (aposta > 0 && aposta <= saldo && !apostou){
        saldo -= aposta;
        atualizaSaldo();
        iniciarJogo();
        apostou = true;
        cashoutBtn.disabled = false;
        apostarBtn.disabled  = true;
        resultadoEl.textContent = "";
    }else{
        resultadoEl.textContent = "Valor invalido ou saldo insuficiente";
    }
})

// Cashout
cashoutBtn.addEventListener("click",()=>{
    if(apostou){
        saldo += 1.0;
        crash = Math.random() * 5 +1; // Crash aleatorio entre 1 e 6
        multiplicadorEl.textContent =`${multiplicadorEl.toFixed(2)}x`;

        intervalo = setInterval(()=>{
            multiplicador += 0.1;
            multiplicadorEl.textContent = `${multiplcar.toFixed(2)}x`;

          if (multiplicador => crash){
            pararJogo(`Crash! Voce perdeu sua aposta.`);
          }
        },100);
    }
})

// Para o jogo
function pararJogo(mensagem){
    clearInterval(intervalo);
    apostou = false;
    cashoutBtn.disabled = true;
    apostarBtn.disabled = false;
    resultadoEl.textContent = mensagem;
    atualizaSaldo();
}


// Carrega o saldo salvo no LocalStorage
saldo = parseFloat(localStorage.getItem('saldo')) || 100;
atualizarSaldo();

// Salva o saldo no LocalStorage ao atualizar
function atualizarSaldo() {
    saldoEl.textContent = saldo.toFixed(2);
    localStorage.setItem('saldo', saldo.toFixed(2));
}