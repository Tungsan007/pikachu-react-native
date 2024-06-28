import { put, all, takeEvery, select} from 'redux-saga/effects'
import { pokeData } from '../data/data';
import { createPokemonFailure, createPokemonSuccess, setSelectSuccess, unSelectSuccess, updateValidSelectSuccess } from '@/redux/slice/pokemonSlice';

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
   const pokeArrayDefault = localStorage.getItem("pokeArray");

   if(!pokeArrayDefault) {
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
         localStorage.setItem("pokeArray", JSON.stringify(B));
         yield put(createPokemonSuccess(B))
   } else {
      const pokeArray = pokeArrayDefault ? JSON.parse(pokeArrayDefault) : [];
      yield put(createPokemonSuccess(pokeArray))
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

export function* pokemonSaga() {
   yield all([
      watchCreatePokemon(),
      watchSelectPokemon(),
      watchUpdateSelect(),
      watchUnSelect(),
   ])
}