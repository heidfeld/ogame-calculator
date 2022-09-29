import CalculatorColumn from "./CalculatorColumn";

const Calculator = (props) => {

    return (
        <div>
            <CalculatorColumn columnId="COLUMN_ID_1" title="Metal"/>
            <CalculatorColumn columnId="COLUMN_ID_2" title="Kryształ"/>
            <CalculatorColumn columnId="COLUMN_ID_3" title="Deuter"/>
        </div>
    );
}

export default Calculator;