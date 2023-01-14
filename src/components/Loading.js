import React from "react";
import '../css/App.css'

class Loading extends React.Component {

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  render() {
    return (
      <span>Cargando: <div className="animation"></div></span>
    )
  }
}

export { Loading }