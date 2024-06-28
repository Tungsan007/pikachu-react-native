import { createSlice } from "@reduxjs/toolkit";

export const selectPokemonSlice = createSlice({
   name: 'selectPokemon',
   initialState: {
      selectPokemon: [],
   },
   reducers: {
      addSelectPokemon: () => {
         //Trigger add select
      },
      addSelectPokemonSuccess: (state, action) => {
         state.selectPokemon = action.payload
      },
      removeSelectPokemon: (state) => {
         state.selectPokemon = []
      }
   }
})

export const { addSelectPokemon, addSelectPokemonSuccess, removeSelectPokemon } = selectPokemonSlice.actions;
export default selectPokemonSlice.reducer;