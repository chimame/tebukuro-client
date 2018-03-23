// @flow
import React from 'react'

type Props = {
  name: string,
  onWaitingList: boolean,
}

export default (props: Props) => (
  <div>
    <span style={{ marginRight: 10 }}>
      { props.name }
    </span>
    <span>
      { props.onWaitingList ? 'キャンセル待ち' : '参加可能' }
    </span>
  </div>
)
