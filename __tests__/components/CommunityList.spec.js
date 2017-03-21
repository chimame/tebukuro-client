import React                  from 'react'
import { shallow }            from 'enzyme'
import toJson                 from 'enzyme-to-json'
import CommunityListComponent from '../../client/components/CommunityList'
import CommunityListModel     from '../../client/models/CommunityList'
import CommunityModel         from '../../client/models/Community'
import Params                 from '../factories/Community'

describe('CommunityList', () => {
  test('render list', () => {
    const communities = [new CommunityModel(Params.community1), new CommunityModel(Params.community2)]
    const list = new CommunityListModel({communities: communities})
    const component = shallow(
      <CommunityListComponent CommunityList={list} />
    )

    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
})
