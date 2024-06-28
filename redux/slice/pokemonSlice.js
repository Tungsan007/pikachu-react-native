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
         state.pokeArray = action.payload
         state.isLoading = false
       },
       createPokemonFailure: (state) => {
         state.isLoading = false
       },
       ///////////////////////////////////////
      setSelect: () => {
         //Trigger select
      },
      setSelectSuccess: (state, action) => {
         // console.log(action.payload)
         state.pokeArray = action.payload
      },
      ////////////////////////////////////////
      
      updateValidSelect: () => {
         //Trigger updateValidSelect
      },
      updateValidSelectSuccess: (state, action) => {
         state.pokeArray = action.payload
      },
      ////////////////////////////////////////

      unSelect: () => {
         //Trigger
      },
      unSelectSuccess: (state, action) => {
         state.pokeArray = action.payload
      },

   }
})

export const { createPokemon, createPokemonSuccess, createPokemonFailure, setSelect, setSelectSuccess,updateValidSelect, updateValidSelectSuccess, unSelect, unSelectSuccess } = pokemonSlice.actions;
export default pokemonSlice.reducer;