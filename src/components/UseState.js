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
          onConfirm()

        } else {
         onDiferentConfirm()
        }
      }, 3000);
    }

  }, [ estado.loading ])

  //detector de cambios
  const onChange = (event) => {
    setEstado({
      ...estado,
      valor: event.target.value
    })
  }

  const onConfirm = () => {
    setEstado({
      ...estado,
      loading: false,
      confirmed: true

    })
  }

  function onDiferentConfirm() {
    setEstado({
      ...estado,
      error: true,
      loading: false
    })
  }

  //funcionalidades de los button
  const recargar = () => {
    setEstado({
      ...estado,
      loading: true,
      error: false
    })
  }

  const eliminar = () => {
    setEstado({
      ...estado,
      deleted: true
    })
  }

  const volver = () => {
    setEstado({
      ...estado,
      confirmed: false,
      valor: ''
    })
  }

  const resetear = () => {
    setEstado({
      ...estado,
      confirmed: false,
      deleted: false,
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
          onChange={onChange}
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
        <button onClick={eliminar}>Si, eliminar</button>
        <button onClick={volver}>No, volver</button>
      </div>
    )
  } else {
    return (
      <div>
        <p>Eliminado con exito</p>
        <button onClick={resetear}>Resetear</button>
      </div>
    )
  }
}

export { UseState }