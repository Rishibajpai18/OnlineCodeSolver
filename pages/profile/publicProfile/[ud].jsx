import React, { useContext } from 'react'
import BaseContext from '../../../context/ContextCreator'

const PublicProfile = () => {
  const context = useContext(BaseContext);
  const {router} = context;
  const {ud} = router.query;
  return (
    <div>
      
    </div>
  )
}

export default PublicProfile