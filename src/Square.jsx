

const Square = ({ value, handleClick, id, index }) => {
    const showValues = {
        0: '',
        1: 'O',
        2: "X"
    }

    return <div
        className="square"
        id={id}
        onClick={() => handleClick()}>
        <span className="square-number">{index}</span>
        {showValues[value]}
    </div>
}

export default Square;