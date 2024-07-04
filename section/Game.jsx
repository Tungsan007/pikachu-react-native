
import { createPokemon, resetPokemonState, setSelect, shuffle, unSelect, updateValidSelect } from '@/redux/slice/pokemonSlice';
import { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { images } from '@/data/data';
import { styles } from '../style/styles'
import { addSelectPokemon, removeSelectPokemon } from '@/redux/slice/selectPokemonSlice';
import Algorithm from '../algorithm/algorithm'
import checkPathForShuffle from '../algorithm/checkpathforShuffle'

const Game = () => {

   const matrix = useSelector((state) => state.pokemon.pokeArray)
   const dispatch = useDispatch();
   const selectPokemon = useSelector((state) => state.selectPokemon.selectPokemon)
   const { checkPath, resetValidPath, latestPath, resetLatestPathHandler } = Algorithm();
   const { checkPathShuffle } = checkPathForShuffle();
   // dispatch(createPokemon())
   // console.log(matrix)


   function isPairMatchable(matrix) {
      const rows = matrix.length - 2;
      const cols = matrix[1].length -2;

      const cloneMatrix = JSON.parse(JSON.stringify(matrix));

      for(let i = 1; i <= rows; i++) {
         for(let j = 1; j <= cols; j++) {
            for(let k = i; k <= rows; k++) {
               for(let l = (i === k ? j + 1 : 1); l <= cols; l++) {
                  cloneMatrix[i][j].status = 1;
                  cloneMatrix[k][l].status = 1;    
                  if(matrix[i][j].data.img === matrix[k][l].data.img && matrix[i][j].status !== 0 && matrix[k][l].status !== 0 && checkPathShuffle(cloneMatrix, cloneMatrix[i][j], cloneMatrix[k][l])) {
                     console.log(matrix[i][j], matrix[k][l])
                     cloneMatrix[i][j].status = 0;
                     cloneMatrix[k][l].status = 0; 
                     console.log(matrix[2][3].status)  
                     console.log(matrix[3][3].status)
                     // return true;
                  } else {
                     cloneMatrix[i][j].status = 5;
                     cloneMatrix[k][l].status = 5; 
                  }
                   
               }
            }
         }
      }

      // return false;
   }

   useEffect(() => {
      isPairMatchable(matrix)
      // if(!isPairMatchable(matrix)) {
      //    console.log("Shuffle Success")
      //    dispatch(shuffle())
      // }
   }, [selectPokemon])
   
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
        }, 60); 

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
                        <TouchableOpacity style={[styles.div, item.status === 1 ? styles.chosen : null, item.status === 0 ? styles.hidden : null, ]} onPress={() => handleSelect(item)}>
                           <Image
                              style={[
                                 styles.img_pokemon,
                                 item.status === 0 ? styles.hidden : null,
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