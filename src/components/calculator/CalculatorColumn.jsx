import { useCallback, useMemo, useState } from "react";
import Indicator from "../indicator/Indicator";

const CalculatorColumn = (props) => {

    const {columnId} = props;

    const [dividersConfig, setDividersConfig] = useState({});
    const [goalValue, setGoalValue] = useState(0);

    const onHeaderIndicatorChange = useCallback((id, value) => {
        const numberValue = Number.parseFloat(value);
        setGoalValue(numberValue);
    }, []);

    const onValueChange = useCallback((id, value) => {
        setDividersConfig((prevDividersConfig) => {
            const numberValue = Number.parseFloat(value);
            return {
                ...prevDividersConfig,
                [id]: numberValue
            };
        });
    }, []);

    const renderDividers = useCallback(() => {
        return Object.entries(dividersConfig).map((entry) => {
            const [key, value] = entry;
            return (
                <Indicator key={key} id={key} onChange={onValueChange} value={value}/>
            );
        });
    }, [dividersConfig, onValueChange]);

    const getKey = useCallback((id) => {
        return `${columnId}_${id}`;
    }, [columnId]);

    const onAdd = useCallback(() => {
        setDividersConfig((prevDividersConfig) => {
            const newIndex = Object.keys(prevDividersConfig).length + 1;
            const dividerId = `d${newIndex}`;
            const key = getKey(dividerId);
            return {
                ...prevDividersConfig,
                [key]: 0
            };
        })
    }, [getKey]);

    const dividersSum = useMemo(() => {
        return Object.values(dividersConfig).reduce((acc, curr) => acc + curr, 0);
    }, [dividersConfig]);

    const remainingSum = useMemo(() => {
        return goalValue - dividersSum;
    }, [dividersSum, goalValue]);

    return (
        <div>
            <Indicator onChange={onHeaderIndicatorChange} onAdd={onAdd} value={remainingSum}/>
            <hr></hr>
            {renderDividers()}
        </div>
    );
}

export default CalculatorColumn;