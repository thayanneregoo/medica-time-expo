import { adicionaDados, token } from "../service";

const datanovo =  {"fields":{
    "Name": "estou adi adicionado",
    "Notes": "gfdfgdfgdfgd passado pelo meu clínico geral o Dr João para diminuir minha glicose",
    "Quantidade": 7,
    "horario id": [
      "reccxVNriUlUscn69"
    ]
  }}

export default function Add(){
      
    return(
        <>
        <button onClick={()=>adicionaDados(datanovo, 'Medicamentos')}>butao</button>
        </>
    )
}