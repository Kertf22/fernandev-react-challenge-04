

const Square = ({ value, handleClick ,id}) => {
    const showValues = {
        0: '',
        1: 'O',
        2: "X"
    }

    return <div className="square" id={id} onClick={() => handleClick()}>{showValues[value]}</div>
}

export default Square;