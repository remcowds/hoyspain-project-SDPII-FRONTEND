import React, { useCallback, useContext } from 'react'
import { VerhuurderContext } from '../../../contexts/VerhuurderProvider';

const Switcher = () => {
	const { isVerhuurder, veranderVerhuurder } = useContext(VerhuurderContext);

  const switcher = useCallback(() => {
    veranderVerhuurder(!isVerhuurder)
  }, [isVerhuurder, veranderVerhuurder]);

  return (
    <label className="switch rounded-full border-[2px] p-[2px] mt-1 mx-1 border-webdonkerlichtgrijs">
      <input type="checkbox" className="rounded-full" defaultChecked={isVerhuurder} onClick={() => switcher()}/>
      <span className="slider rounded-full"></span>
    </label>
  )
}

export default Switcher