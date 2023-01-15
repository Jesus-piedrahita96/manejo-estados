import React, { useState } from "react";
import '../css/App.css'

function UseState(props) {
  //declaracion de variable
  const SECURITY_CODE = 'paradigma'

  //estado compuesto
  const [ estado, setEstado ] = React.useState({
    valor: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
  })

  //estados simples (independientes)
  const [ correcto, setCorrecto ] = useState(false)
  const [ valor, setValor ] = React.useState('')
  let [ error, setError ] = React.useState(false)
  let [ loading, setLoading ] = React.useState(false)

  //efecto en react con retraso de tiempo
  React.useEffect(() => {

    if (estado.loading) {
      setTimeout(() => {
        if (estado.valor === SECURITY_CODE) {
          setEstado({
            ...estado,
            loading: false,
            confirmed: true

          })

        } else {
          setEstado({
            ...estado,
            error: true,
            loading: false
          })
        }
      }, 3000);
    }

  }, [ estado.loading ])

  //funcion  que se activa con el boton
  const recargar = () => {
    setEstado({
      ...estado,
      loading: true,
      error: false
    })
  }

  const volver = () => {
    setEstado({
      ...estado,
      confirmed: false,
      valor: ''
    })
  }

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
            setEstado({
              ...estado,
              valor: event.target.value
            })
          }}
        />
        <button
          onClick={recargar}
        >
          Comprobar
        </button>
      </div>
    )
  } else if (estado.confirmed && !estado.deleted) {
    return (
      <div>
        <h2>Eliminar UseState</h2>
        <p>Seguro que quieres eliminar UseState?</p>
        <button onClick={() => setEstado({
          ...estado,
          deleted: true
        })}>Si, eliminar</button>
        <button onClick={volver}>No, volver</button>
      </div>
    )
  } else {
    return (
      <div>
        <p>Eliminado con exito</p>
        <button onClick={() => setEstado({
          ...estado,
          confirmed: false,
          deleted: false,
          valor: ''
        })}>Resetear</button>
      </div>
    )
  }
}

export { UseState }