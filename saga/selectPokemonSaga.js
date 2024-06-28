import { put, all, select, takeEvery } from 'redux-saga/effects'
import { addSelectPokemonSuccess } from '../redux/slice/selectPokemonSlice'

function* handleAddSelect(action) {
   const state = yield select((state) => state)
   const newSelect = state.selectPokemon.selectPokemon.concat(action.payload)
   yield put(addSelectPokemonSuccess(newSelect))
}

////////////////////////////////////////////////

function* watchAddSelectPokemon() {
   yield takeEvery('selectPokemon/addSelectPokemon', handleAddSelect)
}

export function* addSelectPokemonSaga() {
   yield all([
      watchAddSelectPokemon(),
   ])
}