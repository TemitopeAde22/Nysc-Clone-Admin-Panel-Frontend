import React from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"

class ProtectedRoute extends React.Component {
    render() {
        const { component: Component, isAuthenticated, ...rest } = this.props

        if (isAuthenticated) {
            return <Component {...rest} />
        } else {
            return (
                <Navigate
                    to={{
                        pathname: "/",
                        state: { from: this.props.location },
                    }}
                />
            )
        }
    }
}

const connection = (state) => ({
    isAuthenticated: state.auth.isLoggedIn,
})

export default connect(connection)(ProtectedRoute)
