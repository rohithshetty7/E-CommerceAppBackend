import React from "react";
import { userContext, channelContext } from "../../App";
function Component4() {
  return (
    <div>
      <userContext.Consumer>
        {(name) => {
          return (
            <div>
              <channelContext.Consumer>
                {
                    channel=>{
                        return <div>
                            Channnel is {channel} Name is {name}
                         </div>
                    }
                }
              </channelContext.Consumer>
              
            </div>
          );
        }}
      </userContext.Consumer>
    </div>
  );
}

export default Component4;
