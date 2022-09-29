import { useCallback } from "react";

const Indicator = (props) => {
    const {value = 0, onChange, id, onAdd, onBlur} = props;

    const handleValueChange = useCallback((event) => {
        onChange?.(id, event?.target?.value);
    }, [id, onChange]);

    const handleAdd = useCallback(() => {
        onAdd?.();
    }, [onAdd]);

    const renderAddButton = useCallback(() => {
        if (onAdd) {
            return (<button onClick={handleAdd}>+</button>);
        }
        return null;
    }, [handleAdd, onAdd]);

    const handleBlur = useCallback(() => {
        onBlur?.(id, value);
    }, [onBlur, id, value]);

    return (
        <div>
            <input type="number"value={value} onChange={handleValueChange} onBlur={handleBlur}/>
            {renderAddButton()}
        </div>
    );

}

export default Indicator;
