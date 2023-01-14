import React, { useState } from "react";
import '../css/App.css'

function UseState(props) {
  //declaracion de variable
  const SECURITY_CODE = 'paradigma'

  //estado compuesto
  const [estado, setEstado] = React.useState({
    correcto: false,
    valor: '',
    error: false,
    loading: false
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
            correcto: true
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
      {estado.correcto && (
        <p>Codigo correcto</p>
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
}

export { UseState }