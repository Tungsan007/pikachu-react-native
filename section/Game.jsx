
import { createPokemon, resetPokemonState, setSelect, shuffle, unSelect, updateValidSelect } from '@/redux/slice/pokemonSlice';
import { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { images } from '@/data/data';
import { styles } from '../style/styles'
import { addSelectPokemon, removeSelectPokemon } from '@/redux/slice/selectPokemonSlice';
import Algorithm from '../algorithm/algorithm'

const Game = () => {

   const matrix = useSelector((state) => state.pokemon.pokeArray)
   const dispatch = useDispatch();
   const selectPokemon = useSelector((state) => state.selectPokemon.selectPokemon)
   const { checkPath, resetValidPath, latestPath, resetLatestPathHandler } = Algorithm();

   const [regame, setRegame] = useState(false)

   const checkHandler = useCallback(() => {
      if (selectPokemon.length === 2) {
        //kiem tra img co giong nhau?
        if (selectPokemon[0].data.img === selectPokemon[1].data.img) {
          //kiem tra tinh hop le cua duong di
          const isValid = checkPath(matrix, selectPokemon[0], selectPokemon[1]);
  
          if (isValid) {
            dispatch(updateValidSelect({ row: selectPokemon[0].row, col: selectPokemon[0].col }));
            dispatch(updateValidSelect({ row: selectPokemon[1].row, col: selectPokemon[1].col }));
            resetValidPath();
          } else {
            // console.log("duong di khong hop le");
            // console.log("bo chon");
            dispatch(unSelect(selectPokemon[0]));
            dispatch(unSelect(selectPokemon[1]));
          }
        } else {
          // img khong giong nhau
          // console.log("bo chon");
          dispatch(unSelect(selectPokemon[0]));
          dispatch(unSelect(selectPokemon[1]));
        }
  
        // Xoa cac chosen poke:
        dispatch(removeSelectPokemon());
      }
      // const isVali = useCheck(pokeChoose)
    }, [selectPokemon, dispatch, matrix, checkPath, resetValidPath]);
    useEffect(() => {     
      checkHandler();
    }, [selectPokemon, checkHandler]);

   useEffect(() => {
      if(matrix.length == 0) {               
         dispatch(createPokemon())            
      }
    }, [regame, dispatch]);

    function handleSelect(item) {
      dispatch(setSelect(item))          
      dispatch(addSelectPokemon([item]))
    }

    function handleRegame() {
      dispatch(resetPokemonState());
      setRegame(pre => !pre);
    }

    const shuffleHandler = () => {
    
      if (selectPokemon.length === 2) {
        dispatch(unSelect(selectPokemon[0]));
        dispatch(unSelect(selectPokemon[1]));
      }
      if (selectPokemon.length === 1) {
        dispatch(unSelect(selectPokemon[0]));
      }
  
      dispatch(removeSelectPokemon());
  
      //chay shuffle
      dispatch(shuffle());
    };

    const checkPathNode = (row, col) => {
      const filterArr = latestPath.filter((i) => i.row === row && i.col === col);
      //TH diem can xet co trong latestPath Array:
      if (filterArr.length > 0) {
        return true;
      }
  
      return false;
    };

    useEffect(() => {
      if (latestPath.length > 0) {
        const timer = setTimeout(() => {
          resetLatestPathHandler();
        }, 800); 
  
        
        return () => clearTimeout(timer);
      }
    }, [latestPath, resetLatestPathHandler]);
  return (
   <>
      <ImageBackground style={styles.img_back} source={require('../assets/images/background.png')}
         resizeMode='cover'
      >
         <View style={styles.btn} className="btn-container">
            <TouchableOpacity onPress={() => handleRegame()} style={styles.button}>
               <Text style={styles.buttonText}>Chơi lại</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => shuffleHandler()} style={styles.button}>
               <Text style={styles.buttonText}>Trộn</Text>
            </TouchableOpacity>
         </View>

         <View style={styles.table}>
            {}
            {matrix?.map((row, index) => (
               <View style={styles.row_pokemon} key={index}>
                  {row.map((item, i) => (
                     <View key={i}
                        style={[
                           checkPathNode(item.row, item.col) ? styles.pathEffect : ""
                        ]}
                     >
                        <TouchableOpacity onPress={() => handleSelect(item)}>
                           <Image
                              style={[
                                 styles.img_pokemon,
                                 item.status === 0 ? styles.hidden : null,
                                 item.status === 1 ? styles.chosen : null
                              ]}
                              source={images[item.data.img]} 
                              alt=""
                           />
                        </TouchableOpacity>
                     </View>
                  ))}
               </View>
            ))}
         </View>
      </ImageBackground>
   </>
  )
}



export default Game