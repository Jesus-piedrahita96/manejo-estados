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
          dispatch({type: 'CONFIRM'})

        } else {
          dispatch({type: 'ERROR'})
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
            dispatch({type: 'CHANGE', payload: event.target.value})
          }}
        />
        <button
          onClick={() => {dispatch({type: 'RECARGAR'})}}
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
        <button onClick={() => {dispatch({type: 'ELIMINAR'})}}>Si, eliminar</button>
        <button onClick={() => {dispatch({type: 'VOLVER'})}}>No, volver</button>
      </div>
    )
  } else {
    return (
      <div>
        <p>Eliminado con exito</p>
        <button onClick={() => {dispatch({type: 'RESETEAR'})}}>Resetear</button>
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

const reducerObject = (state, payload) => ({
  'CONFIRM': {
    ...state,
    loading: false,
    confirmed: true
  },
  'ERROR': {
    ...state,
    error: true,
    loading: false
  },
  'CHANGE': {
    ...state,
    valor: payload
  },
  'RECARGAR': {
    ...state,
    loading: true,
    error: false
  },
  'ELIMINAR': {
    ...state,
    deleted: true
  },
  'VOLVER': {
    ...state,
    confirmed: false,
    valor: ''
  },
  'RESETEAR':{
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