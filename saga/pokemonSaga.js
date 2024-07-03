import { put, all, takeEvery, select} from 'redux-saga/effects'
import { pokeData } from '../data/data';
import { createPokemonFailure, createPokemonSuccess, setSelectSuccess, shuffleSuccess, unSelectSuccess, updateValidSelectSuccess } from '@/redux/slice/pokemonSlice';
import AsyncStorage from '@react-native-async-storage/async-storage'

const shuffleArray = (array) => {
   let currentIndex = array.length;
   while (currentIndex !== 0) {
     let randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex--;

     [array[currentIndex], array[randomIndex]] = [
       array[randomIndex],
       array[currentIndex],
     ];
   }
 };

function* handleCreatePokemon() {

   if(true) {
      const A = [];
      const B = [];

      const data = pokeData.concat(pokeData);
      shuffleArray(data);

         //tao 1 mang 10*10
         for (let i = 0; i < 10; i++) {
         let index = i * 10;
         A[i] = new Array(10);

         for (let j = 0; j < 10; j++) {
            A[i][j] = {
               row: i + 1,
               col: j + 1,
               status: 5,
               data: data[index + j],
            };
         }
         }

         //Tao 1 mang 12*12
         for (let i = 0; i < 12; i++) {
         B[i] = new Array(12);

            for (let j = 0; j < 12; j++) {
               B[i][j] = { row: i, col: j, status: 0, data: { id: "", img: "" } };
            }
         }

         //nap gia tri tu A vao B
         for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
               B[i + 1][j + 1] = A[i][j];
            }
         }
         
         yield put(createPokemonSuccess(B))
   } 
}

function* selectPokemon(action) {
   const state = yield select((state) => state)
   const newSelectArr = state.pokemon.pokeArray.map((row) => {
      return row.map((cell) => {
        if (
          cell.row === action.payload.row &&
          cell.col === action.payload.col
        ) {
          return { ...cell, status: 1 };
        }
        return cell;
      });
    });
   yield put(setSelectSuccess(newSelectArr));
}

function* handleUpdateSelect(action) {
   const state = yield select((state) => state)
   const updatedArray = state.pokemon.pokeArray.map((row) => {
      return row.map((cell) => {
         if(
            cell.row === action.payload.row &&
            cell.col === action.payload.col
         ) {
            return {...cell, status: 0};
         } else {
            return cell;
         }
      })
   })
   yield put(updateValidSelectSuccess(updatedArray))
}

function* handleUnSelect(action) {
   const state = yield select((state) => state)
   const updatedArray = state.pokemon.pokeArray.map((row) => {
      return row.map((cell) => {
         if(
            cell.row === action.payload.row &&
            cell.col === action.payload.col
         ) {
            return {...cell, status: 5};
         } else {
            return cell;
         }
      })
   })
   yield put(unSelectSuccess(updatedArray))
}

function* handleShuffle() {
   const state = yield select((state) => state)
   const rootArr = [...state.pokemon.pokeArray];

      //lay arr 10*10 ben trong
      const insideArr = [];

      for (let i = 0; i < 10; i++) {
        insideArr[i] = new Array(10);
        for (let j = 0; j < 10; j++) {
          insideArr[i][j] = rootArr[i + 1][j + 1];
        }
      }

      // Tạo mảng chứa các Pikachu chưa ăn (status: 5)
      const unshuffledPikachu = [];
      for (let i = 0; i < 10; i++) {
         for (let j = 0; j < 10; j++) {
            if (insideArr[i][j].status === 5) {
            unshuffledPikachu.push(insideArr[i][j]);
            }
         }
      }
      //xao tron
      shuffleArray(unshuffledPikachu);

      //Tao 1 mang 12*12 de tao duong bao quanh insideArr
      const shuffleArr = [];
      for (let i = 0; i < 12; i++) {
        shuffleArr[i] = new Array(12);

        for (let j = 0; j < 12; j++) {
          shuffleArr[i][j] = {
            row: i,
            col: j,
            status: 0,
            data: { id: "", img: "" },
          };
        }
      }

      //nap gia tri tu A vao B
      let pikachuIndex = 0;
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
         //  shuffleArr[i + 1][j + 1] = insideArr[i][j];
         if (insideArr[i][j].status === 5) {
            // Thay thế Pikachu chưa ăn đã xáo trộn
            shuffleArr[i + 1][j + 1] = unshuffledPikachu[pikachuIndex++];
          } else {
            // Giữ nguyên Pikachu đã ăn
            shuffleArr[i + 1][j + 1] = insideArr[i][j];
          }
        }
      }

      //thay doi thuoc tinh row, col theo vi tri moi
      const finalArr = shuffleArr.map((row, index) => {
        return row.map((cell, i) => {
          return { ...cell, row: index, col: i };
        });
      });
      yield put(shuffleSuccess(finalArr))
}


//////////////////////////////////////////////////
function* watchCreatePokemon() {
   yield takeEvery('pokemon/createPokemon', handleCreatePokemon)
}

function* watchSelectPokemon() {
   yield takeEvery('pokemon/setSelect', selectPokemon)
}

function* watchUpdateSelect() {
   yield takeEvery('pokemon/updateValidSelect', handleUpdateSelect)
}

function* watchUnSelect() {
   yield takeEvery('pokemon/unSelect', handleUnSelect)
}

function* watchShuffle() {
   yield takeEvery('pokemon/shuffle', handleShuffle)
}

export function* pokemonSaga() {
   yield all([
      watchCreatePokemon(),
      watchSelectPokemon(),
      watchUpdateSelect(),
      watchUnSelect(),
      watchShuffle(),
   ])
}