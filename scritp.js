const inputNome = document.querySelector("#nome");
const inputProjeto = document.querySelector("#projeto");
const buttonCopy = document.querySelector("#btnCopiar");
const body = document.querySelector("body");

const campoNome = document.querySelectorAll(".cliente");
const campoProjeto = document.querySelector(".projeto");

const handleChange = (e, campo, cliente) => {
  // console.dir(e.target.value);
  if (cliente) {
    campo.forEach((item) => (item.innerText = e.target.value));
  } else {
    campo.innerText = e.target.value;
  }

  if (e.target.value == "") {
    if (cliente) {
      campo.forEach((item) => (item.innerText = "CLIENTE"));
    } else {
      campo.innerText = "PROJETO";
    }
  }
};

inputNome.addEventListener("keyup", (e) => handleChange(e, campoNome, true));
inputProjeto.addEventListener("keyup", (e) =>
  handleChange(e, campoProjeto, false)
);

function criarAlerta(texto, tipo) {
  const time = 5250;
  buttonCopy.classList.add("disable");
  const removeDisable = setTimeout(() => {
    buttonCopy.classList.remove("disable");
  }, time);
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `
    <span id="close">X</span>
    <p>${texto}</p>
    <span id="progress"></span>
  `;
  body.appendChild(alert);

  // Animação de tempo para a barra de progressão
  const barProgress = document.querySelector("#progress");
  barProgress.classList.add(tipo);
  const timeClose = setTimeout(() => {
    body.removeChild(alert);
  }, time);

  // Botão de fechar
  const btnClose = document.querySelector("#close");
  const handleClose = () => {
    body.removeChild(alert);
    try {
      clearTimeout(timeClose);
      clearTimeout(removeDisable);
      buttonCopy.classList.remove("disable");
    } catch (error) {
      console.log(error);
    }
  };
  btnClose.addEventListener("click", handleClose);
}

function copiarConteudoMain(e) {
  e.preventDefault();
  // Texto dos campos
  const alertaText = [
    { sucess: ["Conteúdo copiado para a área de transferência.", "sucess"] },
    { error: ["Algum campo não esta preenchido corretamente.", "error"] },
  ];
  // Caso tenha dados
  if (!body.lastChild.classList) {
    // Criando o alerta de copiado
    if (inputNome.value == "" || inputProjeto.value == "") {
      // Error
      return criarAlerta(alertaText[1].error[0], alertaText[1].error[1]);
    }

    // Sucesso
    var mainElement = document.querySelector("main");
    var tempDiv = document.createElement("div");
    tempDiv.appendChild(mainElement.cloneNode(true));
    document.body.appendChild(tempDiv);
    var range = document.createRange();
    range.selectNodeContents(tempDiv);
    var selecao = window.getSelection();
    selecao.removeAllRanges();
    selecao.addRange(range);
    document.execCommand("copy");
    document.body.removeChild(tempDiv);
    criarAlerta(alertaText[0].sucess[0], alertaText[0].sucess[1]);
  }
}
buttonCopy.addEventListener("click", copiarConteudoMain);
