import { useState,useEffect, useCallback } from "react";



const InputFields = ({label,data,updatedData}) => {

    const createEmptyEntry = () => {
    return label.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
    }, {});
};

    const initialList = Array.isArray(data) && data.length > 0 ? data : [createEmptyEntry()];
    
    const [listData, setListData] = useState(initialList);

    useEffect(() => {
        updatedData(listData);
    }, [listData, updatedData]);

    const handleChange = useCallback((index, fieldName, value) => {
        setListData((prevData) => {
            const newData = [...prevData];
            newData[index] = {
                ...prevData[index],
                [fieldName]: value
            };
            return newData;
        });
    }, []);

    const handleAddField = () => {
        setListData((prevData) => ([...prevData, createEmptyEntry(label)]));
    }

    const handleRemoveField = (index) => {
        setListData((prevData) => prevData.filter((_, i) => i !== index));
    }

    return (
        <div>
          {listData.map((item, index) => (
            <div key={index} className="border border-gray-300 rounded-lg shadow-sm bg-gray-50 space-y-3 relative mb-6 p-4">
                {label.map((field, fieldIndex) => (
                    <div key={fieldIndex} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label}
                        </label>
                        <input
                            type={field.type}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-green-600 focus:border-green-600 sm:text-sm transition duration-150"
                            value={item[field.name] || ''}
                            onChange={(e) => handleChange(index, field.name, e.target.value)}
                        />
                    </div>
                    
                ))}
                <span ><p className='text-gray-400' >e.g. 2015-2020</p></span>
                     {listData.length > 1 && (
                        <button
                            type="button"
                            onClick={() => handleRemoveField(index)}
                            className="absolute top-2 right-2 p-1 text-sm text-red-600 hover:text-red-800 transition"
                            aria-label="Remove entry"
                        >
                            &times;
                        </button>
                    )}
            </div>
          ))}
          <div className="flex space-x-4">
                <button
                    type="button"
                    onClick={handleAddField}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    + Add Another
                </button>
            </div>         
        </div>
    );
};
export default InputFields;
