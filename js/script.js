const form = document.getElementById('orderForm');
const totalSpan = document.getElementById('total');
const avisoQueijo = document.getElementById('aviso-queijo');

const numeroDoPai = '5551998608845';

const produtos = {
  "Ovos Caipira": { preco: 15.00, unidade: "dúzia(s)", input: "qtd-ovos", checkbox: "produto-ovos" },
  "Queijo Colonial": { preco: 59.90, unidade: "unidade(s)", input: "qtd-queijo", checkbox: "produto-queijo" },
  "Leite": { preco: 5.99, unidade: "litro(s)", input: "qtd-leite", checkbox: "produto-leite" }
};

function atualizarValor() {
  let total = 0;
  let queijoSelecionado = false;

  Object.entries(produtos).forEach(([nome, info]) => {
    const checkbox = document.getElementById(info.checkbox);
    const inputQtd = document.getElementById(info.input);

    if (checkbox.checked) {
      const qtd = parseInt(inputQtd.value) || 1;
      total += qtd * info.preco;
      if (nome === "Queijo Colonial") queijoSelecionado = true;
    }
  });

  totalSpan.textContent = total.toFixed(2).replace('.', ',');
  avisoQueijo.style.display = queijoSelecionado ? 'block' : 'none';
}

Object.values(produtos).forEach(({ checkbox, input }) => {
  const cb = document.getElementById(checkbox);
  const qtdInput = document.getElementById(input);

  cb.addEventListener('change', () => {
    qtdInput.disabled = !cb.checked;
    atualizarValor();
  });

  qtdInput.addEventListener('input', atualizarValor);
});

let ultimaMensagem = '';

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const endereco = document.getElementById('endereco').value.trim();
  const numero = document.getElementById('numero').value.trim();
  const complemento = document.getElementById('complemento').value.trim();
  const bairro = document.getElementById('bairro').value.trim();
  const cidade = document.getElementById('cidade').value.trim();

  const enderecoCompleto = `${endereco}, Nº ${numero}${complemento ? ', ' + complemento : ''}, ${bairro}, ${cidade}`;

  let mensagem = `Olá, seu Joca! \nGostaria de fazer um novo pedido:\n\n`;
  mensagem += `Nome do Cliente: ${nome}\n`;
  mensagem += `Telefone: ${telefone}\n`;
  mensagem += `Endereço: ${enderecoCompleto}\n\n`;

  let totalPedido = 0;
  let temProduto = false;

  Object.entries(produtos).forEach(([nome, info]) => {
    const cb = document.getElementById(info.checkbox);
    const qtd = parseInt(document.getElementById(info.input).value) || 1;

    if (cb.checked) {
      temProduto = true;
      const subtotal = qtd * info.preco;
      totalPedido += subtotal;

      mensagem += `• ${nome}: ${qtd} ${info.unidade} — R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;

      if (nome === "Queijo Colonial") {
        mensagem += `(⚠️ Valor pode variar conforme o peso)\n`;
      }
    }
  });

  if (!temProduto) {
    alert("Selecione pelo menos um produto.");
    return;
  }

  mensagem += `\nTotal estimado: R$ ${totalPedido.toFixed(2).replace('.', ',')}`;

  ultimaMensagem = mensagem; // salva para usar após aceite

  abrirModal(); // exibe modal de confirmação
});

function abrirModal() {
  document.getElementById('modalConfirmacao').style.display = 'block';
}

function fecharModal() {
  console.log('Fechar modal acionado');
  document.getElementById('modalConfirmacao').style.display = 'none';
}

function confirmarEnvio() {
  const aceite = document.getElementById('aceiteTermos').checked;
  if (!aceite) {
    alert("Você precisa aceitar os termos antes de continuar.");
    return;
  }
  // envio aqui
  fecharModal();
  
  const url = `https://wa.me/${numeroDoPai}?text=${encodeURIComponent(ultimaMensagem)}`;
  window.open(url, '_blank');
  fecharModal();
}


// Evento para o botão cancelar do modal
document.getElementById('btnCancelar').addEventListener('click', fecharModal);

atualizarValor();
