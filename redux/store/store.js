import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import pokemonReducer from '../slice/pokemonSlice'
import { pokemonSaga } from '../../saga/pokemonSaga'

const saga = createSagaMiddleware();

export default configureStore({
   reducer: {
      pokemon: pokemonReducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga)
})

saga.run(pokemonSaga)