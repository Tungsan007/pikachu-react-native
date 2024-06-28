import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import pokemonReducer from '../slice/pokemonSlice'
import { pokemonSaga } from '../../saga/pokemonSaga'
import selectPokemonReducer from '../slice/selectPokemonSlice'
import { addSelectPokemonSaga } from '../../saga/selectPokemonSaga'

const saga = createSagaMiddleware();

export default configureStore({
   reducer: {
      pokemon: pokemonReducer,
      selectPokemon: selectPokemonReducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga)
})

saga.run(pokemonSaga)
saga.run(addSelectPokemonSaga)