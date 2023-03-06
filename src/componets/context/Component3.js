import React,{useContext} from 'react'
import { userContext,channelContext } from '../../App'
function Component3() {

    const user=useContext(userContext);
    const channel=useContext(channelContext);

  return (
    <div>
        {user}-{channel}

    </div>
  )
}

export default Component3 