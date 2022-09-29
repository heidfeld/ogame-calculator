import CalculatorColumn from "./CalculatorColumn";

const Calculator = (props) => {

    return (
        <div>
            <CalculatorColumn columnId="COLUMN_ID_1"/>
            <CalculatorColumn columnId="COLUMN_ID_2"/>
            <CalculatorColumn columnId="COLUMN_ID_3"/>
        </div>
    );
}

export default Calculator;