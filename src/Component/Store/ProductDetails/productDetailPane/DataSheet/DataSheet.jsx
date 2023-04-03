import React from 'react'
import './DataSheet.css'
const DataSheet = (props) => {
    const dataArray = []
    for (let item in props.data) {
        if (item !== 'images' && item !== 'amount') {
            dataArray.push({
                title: item,
                value: props?.data[item]
            })
        }

    }
    console.log(props.data)
    return (
        <table className={`data-sheet fade-in`}>
            <tbody>
                <tr><th>Title</th><th>Info</th></tr>
                {dataArray.map((item) => {
                    return (
                        <tr key={Math.random()}>
                            <td>{item.title}</td>
                            {item?.title === 'color' ?
                                <td><input type="color" value={item.value} onChange={() => ""} /></td> :
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