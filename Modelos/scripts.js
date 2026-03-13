document.getElementById("form-contato").addEventListener("submit",function(e){

e.preventDefault()

let nome=document.getElementById("nome").value
let servico=document.getElementById("servico").value
let mensagem=document.getElementById("mensagem").value

let texto=`Olá, meu nome é ${nome}%0AProduto: ${servico}%0AMensagem: ${mensagem}`

window.open(`https://wa.me/5511915371799?text=${texto}`)

})