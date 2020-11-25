import React from 'react'
import useModel from 'flooks';
import counter from './flooks';


const Page1 = (props:any) => {
    const counterModal = useModel(counter);
    const { state: { count }, effects: { add, sub, addLater } } = counterModal
    return (
        <div>
            <h2>Counter</h2>
            {/* Name: {name} */}
            <br />
      Count: {count}
            <footer>
                <button onClick={add}>+</button>
                <button onClick={sub}>-</button>
                <button onClick={addLater}>+ ✰ {addLater.loading && '...'}</button>
            </footer>
        </div> 
    )
}

export default Page1
