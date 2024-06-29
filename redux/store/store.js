import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import pokemonReducer from '../slice/pokemonSlice'
import { pokemonSaga } from '../../saga/pokemonSaga'
import selectPokemonReducer from '../slice/selectPokemonSlice'
import { addSelectPokemonSaga } from '../../saga/selectPokemonSaga'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { 
   persistReducer, 
   persistStore,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,} from 'redux-persist'

const saga = createSagaMiddleware();

const pikachuPersistConfig = {
   key: "pikachu",
   storage: AsyncStorage,
   version: 1
}

const pokemonPersistReducer = persistReducer(pikachuPersistConfig, pokemonReducer)

const store = configureStore({
   reducer: {
      pokemon: pokemonPersistReducer,
      selectPokemon: selectPokemonReducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(saga)
})

saga.run(pokemonSaga)
saga.run(addSelectPokemonSaga)

export const persistor = persistStore(store)
export default store;