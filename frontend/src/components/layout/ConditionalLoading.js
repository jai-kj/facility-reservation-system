import React from 'react'
import loadingLogo from '../../resources/loading.gif'
const ConditionalLoading = ({isLoading, children}) => {
  return (
    <>{
      isLoading ? (
        <div className="d-flex justify-content-center">
          <img src={loadingLogo} alt="Loading..." width="180px"/>
        </div>
      ) : children
    }
    </>
  )
}

export default ConditionalLoading