// import { usePathname } from "expo-router";

export const token = process.env.EXPO_PUBLIC_KEY
export const url = process.env.EXPO_PUBLIC_API_URL

export async function adicionaDados(data: any, tableName: string) {
  try {
    console.log('Iniciando conexão');

    const response = await fetch(`https://api.airtable.com/v0/appNsRbWKK7L2FuqF/${tableName}/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const responseData = await response.json();
    console.log('Response data:', responseData);

    // Retorna a resposta convertida para JSON
    return responseData;

  } catch (error) {
    console.error('Erro ao adicionar medicamento:', error);
    throw error; // Re-lança o erro para ser tratado externamente, se necessário
  }
}

// export const formaPathName = () => {
//   const pathname = usePathname()
//   const name:string = pathname.substring(1)
//   const nameformated:string = name.charAt(0).toUpperCase() + name.slice(1)
//   return nameformated
// }

export async function consultadados(pagina: string) {
  try {
    console.log("acessando pagina")
    const data = await fetch(url + pagina, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })

    const result = await data.json();
    console.log(result.records)
    return result.records


  } catch (error) {
    console.log(error)
  }
}

