import { useCallback, useMemo, useState } from "react";
import Indicator from "../indicator/Indicator";

import './css/calculator.css';

const CalculatorColumn = (props) => {

    const {columnId, title} = props;

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

    const calculateGoalValue = useCallback((prevGoalValue) => {
        const sum = Object.values(dividersConfig).reduce((acc, curr) => acc + curr, 0);
        return prevGoalValue - sum;
    }, [dividersConfig]);

    const onDividerBlur = useCallback((id) => {
        if (id) {
            setGoalValue(prevGoalValue => calculateGoalValue(prevGoalValue));
        }
    }, [calculateGoalValue]);

    const onHeaderIndicatorBlur = useCallback((id, value) => {
        if (id) {
            setGoalValue(calculateGoalValue(value));
        }
    }, [calculateGoalValue]);

    const renderDividers = useCallback(() => {
        return Object.entries(dividersConfig).map((entry) => {
            const [key, value] = entry;
            return (
                <Indicator key={key} id={key} onChange={onValueChange} value={value} onBlur={onDividerBlur}/>
            );
        });
    }, [dividersConfig, onValueChange, onDividerBlur]);

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

    const headerIndicatorId = useMemo(() => {
        return `${columnId}_HEADER_INDICATOR`;
    }, [columnId]);

    return (
        <div className="calculator-column">
            {title}
            <Indicator id={headerIndicatorId} onChange={onHeaderIndicatorChange} onAdd={onAdd} value={goalValue} onBlur={onHeaderIndicatorBlur}/>
            <hr></hr>
            {renderDividers()}
        </div>
    );
}

export default CalculatorColumn;