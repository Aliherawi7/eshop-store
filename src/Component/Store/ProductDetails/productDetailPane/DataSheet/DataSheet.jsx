import React from 'react'
import './DataSheet.css'
const DataSheet = (props) => {
    const data = []
    for (let item in props.dataSheet) {
        if (item !== 'images' && item !== 'amount') {
            data.push({
                title: item,
                value: props.dataSheet[item]
            })
        }

    }
    return (
        <table className={`data-sheet fade-in`}>
            <tbody>
                <tr><th>Title</th><th>Info</th></tr>
                {data.map((item) => {
                    return (
                        <tr key={Math.random()}>
                            <td>{item.title}</td>
                            {item.title === 'color'? 
                            <td><input type="color" value={item.value} onChange={() => ""} /></td>:
                            <td>{item.value}</td>  
                        }

                        </tr>
                    )
                })}
            </tbody>
        </table>

    )
}

export default DataSheet