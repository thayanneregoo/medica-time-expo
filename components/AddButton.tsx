import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { usePathname } from "expo-router";

interface AddButtonProps {
    // text?: string;
    onPress?: () => void; //aqui deve ser adicionado uma função que abre a modal
  }  

  
  export const AddButton: React.FC<AddButtonProps> = ({onPress }) => {

    const pathname = usePathname()
    const formaPathName = (pathname:string)=>{
        const name = pathname.substring(1)
        const nameformated = name.charAt(0).toUpperCase() + name.slice(1)
        return nameformated
    }

return(
    <>
    <TouchableOpacity style={styles.button}  onPress={onPress} >
<Text style={styles.buttonText}>Adicionar {formaPathName(pathname)}  </Text>
<TabBarIcon name={'add'} style={styles.icon}/>

</TouchableOpacity> 
</>
)
}
const styles = StyleSheet.create({
    
    button:{
      marginTop:10,
      height: 60,
      backgroundColor: '#24a9ac',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:'row',
      elevation: 20,
      shadowOpacity:20,
      shadowColor: '#ccc',
      color:'white'
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    },
    icon:{
      opacity:0.7,
      borderRadius:20,
      paddingLeft:2,
      color:'white'
    }
  });
  