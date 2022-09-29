import { useCallback } from "react";

const Indicator = (props) => {
    const {value = 0, onChange, id, onAdd} = props;

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

    return (
        <div>
            <input type="number"value={value} onChange={handleValueChange}/>
            {renderAddButton()}
        </div>
    );

}

export default Indicator;
