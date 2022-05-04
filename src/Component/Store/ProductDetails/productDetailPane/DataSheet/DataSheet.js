import React from 'react'
import './DataSheet.css'
import { Transition } from 'react-transition-group'
const DataSheet = (props) => {
    const data = []
    for (let item in props.dataSheet) {
        if (item !== 'image' && item !== 'amount') {
            data.push({
                title: item,
                value: props.dataSheet[item]
            })
        }

    }
    return (
        <Transition timeout={500} in={props.transition} appear>
            {(status) => (
                <table className={`data-sheet dataSheet-${status}`}>
                    <tbody>
                        <tr><th>Title</th><th>Info</th></tr>
                        {data.map((item) => {
                            return (
                                <tr key={Math.random()}>
                                    <td>{item.title}</td>
                                    <td>{item.value}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}

        </Transition>
    )
}

export default DataSheet