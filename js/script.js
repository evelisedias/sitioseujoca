const form = document.getElementById('orderForm');
const quantidadeInput = document.getElementById('quantidade');
const totalSpan = document.getElementById('total');

const numeroDoPai = '5551998559165';
const precoPorDuzia = 15.00;

function atualizarValor() {
  let qtd = parseInt(quantidadeInput.value);
  if (isNaN(qtd) || qtd < 1) qtd = 1;

  const total = (precoPorDuzia * qtd).toFixed(2);
  totalSpan.textContent = total.replace('.', ',');
}

atualizarValor();

quantidadeInput.addEventListener('input', atualizarValor);
quantidadeInput.addEventListener('change', atualizarValor);

form.addEventListener('submit', function (e) {
  e.preventDefault(); 

  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();

  const endereco = document.getElementById('endereco').value.trim();
  const numero = document.getElementById('numero').value.trim();
  const complemento = document.getElementById('complemento').value.trim();
  const bairro = document.getElementById('bairro').value.trim();
  const cidade = document.getElementById('cidade').value.trim();

  let quantidade = parseInt(quantidadeInput.value);
  if (isNaN(quantidade) || quantidade < 1) quantidade = 1;

  const total = (precoPorDuzia * quantidade).toFixed(2).replace('.', ',');

  const enderecoCompleto = `${endereco}, Nº ${numero}${complemento ? ', ' + complemento : ''}, ${bairro}, ${cidade}`;

  const mensagem = 
    `Olá, seu Joca! \nGostaria de fazer um novo pedido de ovos\n\n` +
    `Nome do Cliente: ${nome}\n` +
    `Telefone para contato: ${telefone}\n` +
    `Endereço: ${enderecoCompleto}\n` +
    `Quantidade: ${quantidade} dúzia(s)\n` +
    `Total: R$ ${total}`;

  const url = `https://wa.me/${numeroDoPai}?text=${encodeURIComponent(mensagem)}`;

  console.log('Disparando para o WhatsApp do pai:', url);

  window.open(url, '_blank');
});
