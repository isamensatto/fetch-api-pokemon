import axios from "axios";
import { useEffect, useState } from "react";

/*
Consuma a API e liste todos os pokemons da consulta do seguinte endpoint. 
https://pokeapi.co/api/v2/pokemon
Você deve exibir, de cada pokémon:
- imagem
- nome
- experiência
Você pode acessar as informações de cada pokemón individualmente em:
https://pokeapi.co/api/v2/pokemon/:id id(parametro de url)
DICA:
imagem => sprites.front_default
experiência => base_experience
EXTRA: se puder ordene por nome.
*/
function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon")
    .then((response) => {

      //cria-se um novo array copiando os elementos do nosso array anterior
      const arrayOrdemAlfabetica = [...response.data.results]
      
      //metodo sort é um metodo para alterarmos o nosso array usando uma função que recebe como primeiro paramentro a, b
      // e dentro dele criamos uma comparação de a com b e isso ira fazer com que nosso array seja ordenado 
      arrayOrdemAlfabetica.sort((a, b) => {
        console.log({a})
        console.log({b})
        
        return a.name.localeCompare(b.name)
      })

      console.log({arrayOrdemAlfabetica})

      // setList(response.data.results);
      setList(arrayOrdemAlfabetica);
      console.log("data", response.data);
    });
  }, []);

  return (
    <>
      <h3>desafio fernandev</h3>
      <h1>consumir api pokémon</h1>
      <hr />
      {list.map((item) => (
        <Pokemon key={item.id} data={item} />
      ))}
    </>
  );
}

const Pokemon = ({ data }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios.get(data.url).then((response) => setDetails(response.data));
  }, []);

  if (details === null) {
    return <div>-</div>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "start",alignItems: "center"}}>
      <span>
        <img src={details.sprites.front_default} style={{width: '50px', height: '50px', marginLeft: '10px', marginRight: '20px'}} />
      </span>
      <span>
        <b>{data.name}</b> - EXP:{details.base_experience}
      </span>
    </div>
  );
};

export default App;
