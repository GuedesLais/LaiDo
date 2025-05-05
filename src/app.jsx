import { useState } from "react"
import { Item, Container, TodoList, Input, Button, List, DeleteButton, InputContainer } from "./styles.js" // Added InputContainer
import { v4 as uuidv4 } from 'uuid'; // Import uuid

function App() {

    const [tasks, setTasks] = useState([])
    const [inputValue, setInputValue] = useState("") // Renamed for clarity

    const inputChange = (event) => {
        setInputValue(event.target.value)
    }

    function buttonClick() {
        if (inputValue.trim()) { // Prevent adding empty tasks
            setTasks([...tasks, { id: uuidv4(), text: inputValue, completed: false }])
            setInputValue(""); // Clear input after adding
        }
    }

    function toggleComplete(id) {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    }

    function buttonDelete(id) {
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
    }


    return (
        <Container>
            <TodoList>
                {/* Wrap Input and Button in InputContainer */}
                <InputContainer>
                    <Input 
                        placeholder="Digite uma tarefa" 
                        onChange={inputChange} 
                        value={inputValue} // Controlled component
                    />
                    <Button onClick={buttonClick}>Adicionar tarefa</Button>
                </InputContainer>

                <List>
                    {
                        tasks.map((task) => (
                            <Item key={task.id} completed={task.completed}>
                                <div> {/* Wrapper for checkbox and text */} 
                                   <input 
                                        type="checkbox" 
                                        checked={task.completed} 
                                        onChange={() => toggleComplete(task.id)} 
                                    />
                                    <span>{task.text}</span>
                                </div>
                                <DeleteButton onClick={() => buttonDelete(task.id)}>x</DeleteButton>
                            </Item>                       
                        ))
                    }
                </List>
            </TodoList>
        </Container>
    )
}


export default App

