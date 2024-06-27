import { put, all, takeEvery} from 'redux-saga/effects'
import { pokeData } from '../data/data';
import { createPokemonSuccess } from '@/redux/slice/pokemonSlice';

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
         yield put(createPokemonSuccess(B))
   } 
}

function* watchCreatePokemon() {
   yield takeEvery('pokemon/createPokemon', handleCreatePokemon)
}

export function* pokemonSaga() {
   yield all([
      watchCreatePokemon(),
   ])
}