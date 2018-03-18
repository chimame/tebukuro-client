// @flow
import React from 'react'
import { connect } from 'react-redux'
import Error from 'next/error'
import withProvider from '../components/Provider'
import { fetchEvent, registerForEvent, cancelRegistration } from '../actions/event'
import { getCurrentEvent, getHasWaitlist, getHasNotFoundError } from '../selectors/event'
import {
  getParticipants,
  getParticipantMessage,
} from '../selectors/participant'

import EventComponent from '../components/Event'
import ParticipantFormComponent from '../components/ParticipantForm'
import ParticipantsListComponent from '../components/ParticipantsList'
import type { EventId, EventProps } from '../types/Event'

type Props = {
  url: { query: EventId },
  event: EventProps,
  hasNotFoundError: boolean,
  hasWaitlist: boolean,
  participants: ?Object[],
  participantMessage: string,
  fetchEvent: Function,
  registerForEvent: Function,
  cancelRegistration: Function,
}

class EventView extends React.Component<Props> {
  componentDidMount() {
    const params = { id: this.props.url.query.id }
    this.props.fetchEvent(params)
  }

  render() {
    const { event } = this.props

    return (
      this.props.hasNotFoundError ?
        <Error statusCode="404" />
        :
        <div>
          <h3>This is the event page!</h3>
          <EventComponent event={event} />
          <ParticipantFormComponent
            eventId={event.id}
            hasEventWaitlist={this.props.hasWaitlist}
            message={this.props.participantMessage}
            onSubmit={this.props.registerForEvent}
          />
          <ParticipantsListComponent
            participants={this.props.participants}
            onCancel={this.props.cancelRegistration}
          />
        </div>
    )
  }
}

const mapStateToProps = state => ({
  event: getCurrentEvent(state),
  hasNotFoundError: getHasNotFoundError(state),
  hasWaitlist: getHasWaitlist(state),
  participants: getParticipants(state),
  participantMessage: getParticipantMessage(state),
})

const mapDispatchToProps = {
  fetchEvent,
  registerForEvent,
  cancelRegistration,
}

export default withProvider(connect(mapStateToProps, mapDispatchToProps)(EventView))
