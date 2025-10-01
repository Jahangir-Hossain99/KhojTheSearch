import React from 'react';

// A generic component to handle lists of editable items (e.g., Experience)
const EditableList = ({ title, items, onUpdate, onRemove, onAdd, fields }) => {

    const handleItemChange = (e, id) => {
        const { name, value } = e.target;
        // 1. Find the item being edited
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, [name]: value } : item
        );
        // 2. Pass the full, updated array back up to the parent form state
        onUpdate(updatedItems);
    };

    return (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-300">{title}</h2>
            
            <div className="space-y-6">
                {items.map(item => (
                    <div key={item.id} className="p-4 border border-gray-300 rounded-md bg-gray-50 relative">
                        {/* DELETE BUTTON */}
                        <button
                            type="button"
                            onClick={() => onRemove(item.id)}
                            className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold"
                            aria-label={`Remove ${title} item`}
                        >
                            &times;
                        </button>

                        {/* RENDER DYNAMIC INPUT FIELDS based on the 'fields' prop */}
                        {fields.map(field => (
                            <div className="mb-3" key={field.name}>
                                <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        name={field.name}
                                        value={item[field.name] || ''}
                                        onChange={(e) => handleItemChange(e, item.id)}
                                        rows="2"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 p-2 border sm:text-sm"
                                    />
                                ) : (
                                    <input
                                        type={field.type || 'text'}
                                        name={field.name}
                                        value={item[field.name] || ''}
                                        onChange={(e) => handleItemChange(e, item.id)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 p-2 border sm:text-sm"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* ADD NEW ITEM BUTTON */}
            <button
                type="button"
                onClick={onAdd}
                className="mt-4 w-full flex justify-center items-center px-4 py-2 border border-dashed border-purple-400 text-sm font-medium rounded-md text-purple-700 bg-purple-50 hover:bg-purple-100"
            >
                + Add New {title.slice(0, -1)}
            </button>
        </div>
    );
};

export default EditableList;