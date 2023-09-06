const inputNome = document.querySelector('#nome');
const inputProjeto = document.querySelector('#projeto');
const buttonCopy = document.querySelector('#btnCopiar');

const campoNome = document.querySelectorAll('.cliente');
const campoProjeto = document.querySelector('.projeto');

const handleChange = (e, campo, cliente) => {
  // console.dir(e.target.value);
  if (cliente) {
    campo.forEach((item) => (item.innerText = e.target.value));
  } else {
    campo.innerText = e.target.value;
  }

  if (e.target.value == '') {
    console.log();
    if (cliente) {
      campo.forEach((item) => (item.innerText = 'CLIENTE'));
    } else {
      campo.innerText = 'PROJETO';
    }
  }
};

inputNome.addEventListener('keyup', (e) => handleChange(e, campoNome, true));
inputProjeto.addEventListener('keyup', (e) =>
  handleChange(e, campoProjeto, false),
);

function copiarConteudoMain(e) {
  e.preventDefault();
  var mainElement = document.querySelector('main');
  var tempDiv = document.createElement('div');
  tempDiv.appendChild(mainElement.cloneNode(true));
  document.body.appendChild(tempDiv);
  var range = document.createRange();
  range.selectNodeContents(tempDiv);
  var selecao = window.getSelection();
  selecao.removeAllRanges();
  selecao.addRange(range);
  document.execCommand('copy');
  document.body.removeChild(tempDiv);
  alert('Conteúdo do main copiado para a área de transferência.');
}
buttonCopy.addEventListener('click', copiarConteudoMain);
