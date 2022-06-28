import {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {ethers} from 'ethers';


function App() {

  // variaveis que vou usar
    const [message, setMessage] = useState(null);
    const [value, setValue] = useState(null);
    const [walletValue, setWalletValue] = useState(null);
    const [coin,setCoin] = useState(null)

    // funçao para conectar a carteira
  async function conexao(){
    if(!window.ethereum){

      alert('Você não possui a MetaMesk instalado');

    }
    setValue('Tentando conectar');

      //requisição dos dados
    const carteira = await window.ethereum.request({ method: 'eth_requestAccounts'});
    const stringWalletValue = carteira.toString()

    // isso aqui pede os valores
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // isso aqui Formata o valor
    const saldo = await provider.getBalance(stringWalletValue);

    //variaveis para mostrar os valores
    setValue('Saldo: '+ ethers.utils.formatEther(saldo.toString()));
    setWalletValue(carteira );
    setMessage('Endereço da Carteira:');
    setCoin(' BNB');

  }

  return (
    <div className="App">

      <header  class="p-3 bg-dark text-white d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
       <span class="fs-4">METAMASK🦊</span>
    </ul>
    </header>
    <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light"> {value} {coin}</h1>
        <p class="lead "><strong>{message}</strong></p>
        <p class="lead text-muted">{walletValue}</p>
        <p>
        <input
      className='btn btn-dark'
      type = "button"
      value = "Conectar a MetaMesk"
      onClick={evt => conexao()}
      />
        </p>
      </div>
    </div>
  </section>
      </div>

  );
}

export default App;

