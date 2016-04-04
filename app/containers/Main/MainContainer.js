import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { container, innerContainer } from './styles.css'
import { Navigation } from 'components'
import * as usersLikesActionCreators from 'redux/modules/usersLikes'

const MainContainer = React.createClass({
  propTypes: {
    isAuthed: PropTypes.bool.isRequired,
    setUsersLikes: PropTypes.func.isRequired,
  },
  componentDidMount () {
    if (this.props.isAuthed) {
      this.props.setUsersLikes()
    }
  },
  render () {
    return (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  },
})

export default connect(
  ({users}) => ({isAuthed: users.isAuthed}),
  (dispatch) => bindActionCreators(usersLikesActionCreators, dispatch)
)(MainContainer)
