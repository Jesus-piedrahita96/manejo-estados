import React from "react";
import '../css/App.css'

function UseReducer(props) {
  //declaracion de variable
  const SECURITY_CODE = 'paradigma'


  //estado compuesto
  const [ estado, dispatch ] = React.useReducer(reducer, initialState)

  //efecto en react con retraso de tiempo
  React.useEffect(() => {

    if (estado.loading) {
      setTimeout(() => {
        if (estado.valor === SECURITY_CODE) {
          dispatch({type: actionTypes.confirm})

        } else {
          dispatch({type: actionTypes.error})
        }
      }, 3000);
    }

  }, [ estado.loading ])


  if (!estado.confirmed && !estado.deleted) {
    return (
      <div>
        <h2>Eliminar {props.name}</h2>

        <label htmlFor="buscador">
          Por favor, escribe el codigo de seguridad
        </label>
        <br />
        {(estado.error) && (
          <p>Error: el codigo es incorrecto</p>
        )}
        {estado.loading && (
          <span>Cargando: <div className="animation"></div></span>
        )}
        <input
          className="distance"
          placeholder="codigo de seguridad"
          id="buscador"
          value={estado.valor}
          onChange={(event) => {
            dispatch({type: actionTypes.change, payload: event.target.value})
          }}
        />
        <button
          onClick={() => {dispatch({type: actionTypes.recargar})}}
        >
          Comprobar
        </button>
      </div>
    )
  } else if (estado.confirmed && !estado.deleted) {
    return (
      <div>
        <h2>Eliminar {props.name}</h2>
        <p>Seguro que quieres eliminar {props.name}?</p>
        <button onClick={() => {dispatch({type: actionTypes.eliminar})}}>Si, eliminar</button>
        <button onClick={() => {dispatch({type: actionTypes.volver})}}>No, volver</button>
      </div>
    )
  } else {
    return (
      <div>
        <p>Eliminado con exito</p>
        <button onClick={() => {dispatch({type: actionTypes.resetear})}}>Resetear</button>
      </div>
    )
  }
}

const initialState = {
  valor: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false
}

const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  change: 'CHANGE',
  recargar: 'RECARGAR',
  eliminar: 'ELIMINAR',
  volver: 'VOLVER',
  resetear: 'RESETEAR'
}

const reducerObject = (state, payload) => ({
  [actionTypes.confirm]: {
    ...state,
    loading: false,
    confirmed: true
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false
  },
  [actionTypes.change]: {
    ...state,
    valor: payload
  },
  [actionTypes.recargar]: {
    ...state,
    loading: true,
    error: false
  },
  [actionTypes.eliminar]: {
    ...state,
    deleted: true
  },
  [actionTypes.volver]: {
    ...state,
    confirmed: false,
    valor: ''
  },
  [actionTypes.resetear]:{
    ...state,
    confirmed: false,
    deleted: false,
    valor: ''
  }
})

const reducer = (state, action) => {
  if(reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type] || state
  }
}

export { UseReducer }