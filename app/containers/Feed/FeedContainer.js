import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Feed } from 'components'
import * as feedActionCreators from 'redux/modules/feed'
import * as listenerActionCreators from 'redux/modules/listeners'

const FeedContainer = React.createClass({
  propTypes: {
    duckIds: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    newDucksAvailable: PropTypes.bool.isRequired,
    off: PropTypes.func,
    removeListener: PropTypes.func.isRequired,
    resetNewDucksAvailable: PropTypes.func.isRequired,
    setAndHandleFeedListener: PropTypes.func.isRequired,
  },
  componentDidMount () {
    this.props.setAndHandleFeedListener()
  },
  componentWillUnmount () {
    this.props.removeListener('feed', this.props.off)
  },
  render () {
    return (
      <Feed
        duckIds={this.props.duckIds}
        error={this.props.error}
        isFetching={this.props.isFetching}
        newDucksAvailable={this.props.newDucksAvailable}
        resetNewDucksAvailable={this.props.resetNewDucksAvailable} />
    )
  },
})

function mapStateToProps ({feed, listeners}) {
  const { newDucksAvailable, error, isFetching, duckIds } = feed
  return {
    newDucksAvailable,
    error,
    isFetching,
    duckIds,
    off: listeners.feed,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...feedActionCreators,
    ...listenerActionCreators,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedContainer)
