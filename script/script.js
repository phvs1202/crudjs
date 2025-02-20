class Restaurante {
    constructor(nome, itensPedido, quantidade, valorUnidade, dataPedido){
        this.nome = nome,
        this.itensPedido = itensPedido,
        this.quantidade = parseInt(quantidade),
        this.valorUnidade = parseFloat(valorUnidade),
        this.dataPedido = dataPedido;
    }

    get valorTotal(){
        return this.quantidade * this.valorUnidade;
    }
}

class ListaPedidos {
    constructor(){
        this.itens = [];
        this.ListaTabela = document.getElementById("listaItens");
        this.atualizarLista();
    }

    adicionarPedidos(Restaurante){
        this.itens.push(Restaurante) 
    }

    atualizarLista(){
        this.ListaTabela.innerHTML = "";
        this.itens.forEach((item, index) =>{
            this.ListaTabela.innerHTML += `
                <tr>
                    <td>${item.nome}</td>
                    <td>${item.itensPedido}</td>
                    <td>${item.quantidade}</td>
                    <td>R$${item.valorUnidade.toFixed(2)}</td>
                    <td>R$${item.valorTotal.toFixed(2)}</td>
                    <td>${item.dataPedido}</td>
                    <td>
                        <button class='btn btn-warning' onclick='gerenciadorPedidos.editarPedido(${index})'>Editar</button>
                        <button class='btn btn-danger' onclick='gerenciadorPedidos.removerPedido(${index})'>Remover</button>
                    </td>
                </tr>
            `;
        });
    }
    

    removerPedido(index){
        console.log(`Produto ${index} foi removido.`)
        this.itens.splice(index, 1);
        this.atualizarLista();
    }

    editarPedido(index){
        console.log(`Editando o ${index}º pedido.`);
        const Item = gerenciadorPedidos.itens[index];

        formIndex.value = index;
        formNome.value = Item.nome;
        formItens.value = Item.itensPedido;
        formQuantidade.value = Item.quantidade;
        formValorUnidade.value = Item.valorUnidade;
    }
}

function formatarData(data){
    let dia = data.getDate().toString().padStart(2, '0');
    let mes = (data.getMonth() + 1).toString().padStart(2, '0');
    let ano = data.getFullYear();
    let hora = data.getHours().toString().padStart(2, '0');
    let minuto = data.getMinutes().toString().padStart(2, '0');

    return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
}

let dataAtual = new Date();
pedido1 = new Restaurante("Pedro", "Pizza de Calabresa", 2, 75.90, formatarData(dataAtual));
pedido2 = new Restaurante("Fernanda", "Pizza de Queijo", 2, 75.90, formatarData(dataAtual));
pedido3 = new Restaurante("João", "Pizza de Frango", 2, 75.90, formatarData(dataAtual));
pedido4 = new Restaurante("Paulo", "Pizza de Rúcula", 2, 75.90, formatarData(dataAtual));
pedido5 = new Restaurante("Livia", "Pizza de Carne", 2, 75.90, formatarData(dataAtual));
pedido6 = new Restaurante("José", "Pizza de Buchada", 2, 75.90, formatarData(dataAtual));
let gerenciadorPedidos = new ListaPedidos();
gerenciadorPedidos.adicionarPedidos(pedido1);
gerenciadorPedidos.adicionarPedidos(pedido2);
gerenciadorPedidos.adicionarPedidos(pedido3);
gerenciadorPedidos.adicionarPedidos(pedido4);
gerenciadorPedidos.adicionarPedidos(pedido5);
gerenciadorPedidos.adicionarPedidos(pedido6);
gerenciadorPedidos.atualizarLista();

const form = document.getElementById("form-cadastrar");
const formIndex = document.getElementById("index-id");
const formNome = document.getElementById("nome")
const formItens = document.getElementById("itens")
const formQuantidade = document.getElementById("quantidade");
const formValorUnidade = document.getElementById("valor");
const formDataAtual = new Date();

form.addEventListener("submit", function(event){
    event.preventDefault();

    const id = formIndex.value.trim();
    const nome = formNome.value.trim();
    const itens = formItens.value.trim();
    const quantidade = formQuantidade.value.trim();
    const valorUnidade = formValorUnidade.value.trim();

    let pedido = new Restaurante(nome, itens,quantidade, valorUnidade, formatarData(dataAtual));

    if(id === ""){
        gerenciadorPedidos.adicionarPedidos(pedido);
    }else{
        gerenciadorPedidos.itens[id] = pedido;
    }

    gerenciadorPedidos.atualizarLista();

    formIndex.value = "";
    formNome.value = "";
    formItens.value = "";
    formQuantidade.value = "";
    formValorUnidade.value = "";
});