import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
   table: {
      display: 'flex',
      flexDirection: 'row',
      
   },

   img_pokemon: {
      width: 36,
      height: 36
   },

   row_pokemon: {
      display: 'flex'
   },
   btn: {
      display: 'flex',
      flexDirection: 'row',
   },
   button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: 'rgba(109, 32, 72, 0.8)',
      borderRadius: 8,
      marginHorizontal: 20,
      minWidth: 100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
   },
   buttonText: {
      color: 'white'
   },
   img_back: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },

   touchableOuter: {
      pointerEvents: 'none'
   },

   hidden: {
      opacity: 0,
      pointerEvents: 'none'
   },
   chosen: {
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'rgb(120, 67, 200)',
   },
   btn_go: {
      paddingHorizontal: 80,
      paddingVertical: 14,
      marginTop: 2,
      backgroundColor: 'green',
      borderRadius: 6,
      shadowColor: 'rgba(0,0,0,0.65)',
      shadowOffset: 4,
   },
   pathEffect: {
      position: 'relative',
      backgroundColor: '#56F920'
   },
});