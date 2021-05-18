import { Button, Form, Col, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import VoteOption from '../VoteOption/VoteOption'
import VoteOptionModel from '../../model/VoteOptionModel';
import "./VoteOptionSection.css"

export default function VoteOptionSection({onChange}) {
    const [optionText, setOptionText] = useState();
    const [lastOptionIndex, setLastOptionIndex] = useState(0);
    const [options, setOptions] = useState([]);

    // useEffect(() => {
    //     console.log(options)
    // }, [options]);

    function addOption() {
        if (optionText) {
            let count = lastOptionIndex + 1;
            setLastOptionIndex(count);
            let newOptions = options.concat(new VoteOptionModel(count, optionText))
            setOptions(newOptions);
            setOptionText("");
            onChange(newOptions);
        }
    }
    function deleteItem(itemId) {
        let list = [...options];
        let newList = list.filter(listItem => { return listItem.id != itemId });
        setOptions(newList);
        onChange(newList);
    }
    return (
        <div className="c-voteOptionSection">
            <Form.Group as={Row} controlId="formHorizontalOptionText">
                <Form.Label column sm={3}>
                    הוספת אופציה
                </Form.Label>
                <Col sm={3}>
                    <Form.Control type="text" placeholder="כתוב אופציה חדשה"
                        value={optionText} onChange={e => setOptionText(e.target.value)} />
                </Col>
                <Button sm={3} variant="primary" onClick={() => addOption()}>הוסף</Button>
            </Form.Group>
            <Form.Group className="optionsList" as={Row} controlId="formHorizontalOptionsList">
                {options.map(item => {
                    return <VoteOption key={item.id} option={item} deleteItem={(itemId) => deleteItem(itemId)}></VoteOption>
                })}
            </Form.Group>
        </div>
    )
}