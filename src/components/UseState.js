import React from "react";

function UseState(props) {
  let [error, setError] = React.useState(false)

  return (
    <div>
      <h2>Eliminar {props.name}</h2>

      <p>Por favor, escribe el codigo de seguridad</p>
      {error && (
        <p>Error: el codigo es incorrecto</p>
      )}
      <input placeholder="codigo de seguridad" />
      <button
        onClick={() => setError(!error)}
      >
        Comprobar
      </button>
    </div>
  )
}

export { UseState }