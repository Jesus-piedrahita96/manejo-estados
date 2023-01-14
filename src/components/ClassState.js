import React from "react";
import { Loading } from "./Loading";

const SECURITY_CODE = 'paradigma'

class ClassState extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      valor: '',
      error: false,
      loading: false
    }
  }

  componentDidUpdate() {
    if (this.state.loading) {
      setTimeout(() => {
        if (this.state.valor === SECURITY_CODE) {
          this.setState({ loading: false })
        } else {
          this.setState({ error: true, loading: false })
        }

      }, 3000)
    }
  }

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>

        <p>Por favor, escribe el codigo de seguridad</p>
        {this.state.error && (
          <p>Error: el codigo es incorrecto</p>
        )}
        {this.state.loading && (
          <Loading />
        )}
        <input
          className="distance"
          placeholder="codigo de seguridad"
          value={this.state.valor}
          onChange={(event) => {
            this.setState({ valor: event.target.value })
          }}
        />
        <button onClick={() => {
          this.setState({ loading: true, error: false })
        }}>
          Comprobar
        </button>
      </div>
    )
  }
}

export { ClassState }