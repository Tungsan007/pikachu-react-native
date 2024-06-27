import { createSlice } from "@reduxjs/toolkit";

export const pokemonSlice = createSlice({
   name: 'pokemon',
   initialState: {
      pokeArray: [],
      isLoading: false
   },
   reducers: {
      createPokemon: (state) => {
         state.isLoading = true
       },
       createPokemonSuccess: (state, action) => {
         localStorage.setItem("pokeArray", JSON.stringify(action.payload));
         state.pokeArray = action.payload
         console.log(action.payload)
         state.isLoading = false
       },
       createPokemonFailure: (state) => {
         state.isLoading = false
       },
   }
})

export const { createPokemon, createPokemonSuccess, createPokemonFailure } = pokemonSlice.actions;
export default pokemonSlice.reducer;