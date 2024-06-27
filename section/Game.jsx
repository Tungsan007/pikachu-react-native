
import { createPokemon } from '@/redux/slice/pokemonSlice';
import { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { images } from '@/data/data';

const Game = () => {

   const matrix = useSelector((state) => state.pokemon.pokeArray)
   const dispatch = useDispatch();
   console.log(matrix)
   useEffect(() => {
      const pokeArrayDefault = localStorage.getItem("pokeArray");
  
      if (!pokeArrayDefault) {
         console.log("chay vao if")
        dispatch(createPokemon())
      }
    }, [dispatch]);

  return (
   <>
      <View className="btn-container">
        <Button title='Chơi lại'/>
        <Button title='Trộn'/>
      </View>

      <View style={styles.table}>
         {matrix?.map((row, index) => (
            <View style={styles.row_pokemon} key={index}>
               {row.map((item, i) => (
                  console.log(item.data.img),
                  <View key={i}
                     //  className={`cell-table ${
                     //    checkPathNode(item.row, item.col) ? "path" : ""
                     //  }`}
                  >
                     <Image
                        //  className={`item-img ${item.status === 0 ? "hidden" : ""} ${
                        //    item.status === 1 ? "chosen" : ""
                        //  }`}
                        style={styles.img_pokemon}
                        source={images[item.data.img]}
                        alt=""
                        //  onClick={() => {
                        //    handleSelect(item);
                        //  }}
                     />
                  </View>
               ))}
            </View>
         ))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
   table: {
      display: 'flex',
      flexDirection: 'row'
   },

   img_pokemon: {
      width: 36,
      height: 36
   },

   row_pokemon: {
      display: 'flex'
   }
});

export default Game