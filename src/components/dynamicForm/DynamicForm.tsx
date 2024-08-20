'use client'
import { ChangeEvent, useState } from 'react';
import { Box, Button, Input, Select } from '@chakra-ui/react';

const DynamicForm = () => {
    const [fields, setFields] = useState([{ type: 'text', value: '' }]);

    const addField = () => {
        setFields([...fields, { type: 'text', value: '' }]);
    };

    const removeField = (index: number) => {
        const updatedFields = fields.filter((_, i) => i !== index);
        setFields(updatedFields);
    };

    const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const updatedFields = fields.map((field, i) =>
            i === index ? { ...field, value: event.target.value } : field
        );
        setFields(updatedFields);
    };

    const handleTypeChange = (index: number, event: ChangeEvent<HTMLSelectElement>) => {
        const updatedFields = fields.map((field, i) =>
            i === index ? { ...field, type: event.target.value } : field
        );
        setFields(updatedFields);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault()
        localStorage.setItem('formData', JSON.stringify(fields));
        console.log('Form data saved:', fields);
    }

    return (
        <Box>
            {fields.map((field, index) => (
                <Box key={index} mb={4}>

                    <form onSubmit={handleSubmit}>
                        <Select
                            value={field.type}
                            onChange={(event) => handleTypeChange(index, event)}
                            mb={2}
                        >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="email">Email</option>
                            <option value="date">Date</option>
                            <option value="textarea">textarea</option>
                        </Select>
                        <Input
                            type={field.type}
                            value={field.value}
                            onChange={(event) => handleInputChange(index, event)}
                            mb={2}
                        />
                        <Button onClick={() => removeField(index)} colorScheme="red">
                            Remove
                        </Button>
                        <Button type="submit" colorScheme="blue">
                            Submit
                        </Button>
                    </form>
                </Box>
            ))}
            <Button onClick={addField} colorScheme="teal">
                Add Field
            </Button>
        </Box>
    );
};

export default DynamicForm;
