import { useState, useEffect, useRef } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { 
    Item, 
    Container, 
    Input, 
    Button, 
    List, 
    DeleteButton, 
    SaveButton,
    CancelButton,
    InputContainer, 
    MainLayout,
    TasksContainer,
    CalendarContainer,
    DateInput,
    SectionTitle,
    ItemButtons,
    SubtaskInputWrapper,
    SubtaskInput, 
    SubtaskInputButtons,
    AddSubtaskButton, 
    CloseSubtaskInputButton,
    SubtaskList,
    SubtaskItem,
    AddSubtaskToggleButton,
    ListsWrapper
} from "./styles.js";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = "react-todo-list-tasks";


const formatDateForStorage = (date) => {
    if (!date) return null;
    
    const d = date instanceof Date ? date : new Date(date);
    
    if (isNaN(d.getTime())) return null; 

   
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); 
    const day = String(d.getDate()).padStart(2, '0'); 

    
    return `${year}-${month}-${day}`;
};


const formatDateForDisplay = (dateString) => {
    if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return "Data Inválida";
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

function App() {

    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedTasks) {
          
            return JSON.parse(storedTasks).map(task => ({
                ...task,
                id: task.id || uuidv4(), 
                text: task.text || "",
                completed: task.completed || false,
                dueDate: task.dueDate || null,
                subtasks: (task.subtasks || []).map(sub => ({ 
                    ...sub, 
                    id: sub.id || uuidv4(), 
                    text: sub.text || "",
                    completed: sub.completed || false 
                })) 
            }));
        } 
        return [];
    });
    const [inputValue, setInputValue] = useState("");
   
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        return today;
    }); 
    const [newDueDate, setNewDueDate] = useState(""); 

    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editText, setEditText] = useState("");
    const editInputRef = useRef(null);

    const [editingSubtaskId, setEditingSubtaskId] = useState(null);
    const [editSubtaskText, setEditSubtaskText] = useState("");
    const editSubtaskInputRef = useRef(null);

    const [subtaskInputValues, setSubtaskInputValues] = useState({});
    const [addingSubtaskId, setAddingSubtaskId] = useState(null); 

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        if (editingTaskId && editInputRef.current) {
            editInputRef.current.focus();
        }
    }, [editingTaskId]);

    useEffect(() => {
        if (editingSubtaskId && editSubtaskInputRef.current) {
            editSubtaskInputRef.current.focus();
        }
    }, [editingSubtaskId]);

    const inputChange = (event) => {
        setInputValue(event.target.value)
    }

    const handleDateChange = (event) => {
        setNewDueDate(event.target.value);
    }

    
    const handleCalendarChange = (date) => {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0); 
        setSelectedDate(newDate);
    };

    function buttonClick() {
        if (inputValue.trim()) {
            setTasks(prevTasks => [
                ...prevTasks, 
                { 
                    id: uuidv4(), 
                    text: inputValue, 
                    completed: false, 
                    dueDate: newDueDate || null,
                    subtasks: []
                } 
            ]);
            setInputValue("");
            setNewDueDate("");
        }
    }

    function toggleComplete(id) {
        if (editingTaskId === id) return; 
        setTasks(prevTasks => 
            prevTasks.map(task => 
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    }

    function buttonDelete(id) {
        if (addingSubtaskId === id) {
            setAddingSubtaskId(null);
        }
        if (editingTaskId === id) {
            setEditingTaskId(null);
        }
        if (editingSubtaskId?.taskId === id) {
            setEditingSubtaskId(null);
        }
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }

    function handleStartEditing(task) {
        setEditingTaskId(task.id);
        setEditText(task.text);
        setAddingSubtaskId(null); 
        setEditingSubtaskId(null);
    }

    function handleCancelEdit() {
        setEditingTaskId(null);
    }

    function handleSaveEdit() {
        if (!editingTaskId) return;
        const trimmedText = editText.trim();
        if (trimmedText) {
            setTasks(prevTasks => 
                prevTasks.map(task => 
                    task.id === editingTaskId 
                    ? { ...task, text: trimmedText } 
                    : task
                )
            );
        }
        setEditingTaskId(null);
    }

    function handleEditKeyDown(event) {
        if (event.key === 'Enter') {
            handleSaveEdit();
        }
        if (event.key === 'Escape') {
            handleCancelEdit();
        }
    }

    const handleSubtaskInputChange = (taskId, value) => {
        setSubtaskInputValues(prev => ({ ...prev, [taskId]: value }));
    };

    const handleAddSubtask = (taskId) => {
        const subtaskText = subtaskInputValues[taskId]?.trim();
        if (!subtaskText) return;

        setTasks(prevTasks => 
            prevTasks.map(task => {
                if (task.id === taskId) {
                    const newSubtask = {
                        id: uuidv4(),
                        text: subtaskText,
                        completed: false
                    };
                    return { ...task, subtasks: [...task.subtasks, newSubtask] };
                }
                return task;
            })
        );
        setSubtaskInputValues(prev => ({ ...prev, [taskId]: '' })); 
    };

    const toggleSubtaskComplete = (taskId, subtaskId) => {
        if (editingSubtaskId?.taskId === taskId && editingSubtaskId?.subtaskId === subtaskId) return;
        setTasks(prevTasks => 
            prevTasks.map(task => {
                if (task.id === taskId) {
                    const updatedSubtasks = task.subtasks.map(subtask => {
                        if (subtask.id === subtaskId) {
                            return { ...subtask, completed: !subtask.completed };
                        }
                        return subtask;
                    });
                    return { ...task, subtasks: updatedSubtasks };
                }
                return task;
            })
        );
    };

    const handleToggleAddSubtask = (taskId) => {
        setAddingSubtaskId(prevId => (prevId === taskId ? null : taskId));
        setEditingTaskId(null); 
        setEditingSubtaskId(null);
    };

    const handleCloseSubtaskInput = () => {
        setAddingSubtaskId(null);
    };

    function handleStartEditingSubtask(taskId, subtask) {
        setEditingSubtaskId({ taskId, subtaskId: subtask.id });
        setEditSubtaskText(subtask.text);
        setEditingTaskId(null);
        setAddingSubtaskId(null);
    }

    function handleCancelSubtaskEdit() {
        setEditingSubtaskId(null);
    }

    function handleSaveSubtaskEdit() {
        if (!editingSubtaskId) return;
        const { taskId, subtaskId } = editingSubtaskId;
        const trimmedText = editSubtaskText.trim();

        if (trimmedText) {
            setTasks(prevTasks => 
                prevTasks.map(task => {
                    if (task.id === taskId) {
                        const updatedSubtasks = task.subtasks.map(subtask => {
                            if (subtask.id === subtaskId) {
                                return { ...subtask, text: trimmedText };
                            }
                            return subtask;
                        });
                        return { ...task, subtasks: updatedSubtasks };
                    }
                    return task;
                })
            );
        }
        setEditingSubtaskId(null);
    }

    function handleSubtaskEditKeyDown(event) {
        if (event.key === 'Enter') {
            handleSaveSubtaskEdit();
        }
        if (event.key === 'Escape') {
            handleCancelSubtaskEdit();
        }
    }

    
    const pendingTasks = tasks.filter(task => !task.completed);
    const selectedDateString = formatDateForStorage(selectedDate); 
    const tasksForSelectedDate = tasks.filter(task => 
        task.dueDate === selectedDateString
    );
    const tasksWithoutDate = tasks.filter(task => !task.dueDate);
    // --- End Filters ---

    const renderTaskItem = (task) => {
        const isEditingMainTask = editingTaskId === task.id;
        const isAddingSubtask = addingSubtaskId === task.id;

        return (
            <React.Fragment key={task.id}>
                <Item completed={task.completed}>
                    {isEditingMainTask ? (
                        <>
                            <input 
                                type="checkbox" 
                                checked={task.completed} 
                                readOnly 
                                style={{ marginRight: '10px', cursor: 'not-allowed' }} 
                            />
                            <input 
                                ref={editInputRef} 
                                type="text" 
                                className="edit-input"
                                value={editText} 
                                onChange={(e) => setEditText(e.target.value)} 
                                onBlur={handleSaveEdit} 
                                onKeyDown={handleEditKeyDown} 
                            />
                            <ItemButtons />
                        </>
                    ) : (
                        <>
                            <div className="task-content" onClick={() => handleStartEditing(task)} title="Clique para editar">
                                <input 
                                    type="checkbox" 
                                    checked={task.completed} 
                                    onChange={(e) => {
                                        e.stopPropagation(); 
                                        toggleComplete(task.id);
                                    }} 
                                />
                                <span>{task.text}</span> 
                                {}
                                {task.dueDate && <span style={{fontSize: '0.8em', marginLeft: '10px', color: '#555'}}>({formatDateForDisplay(task.dueDate)})</span>}
                            </div>
                            <ItemButtons>
                                <AddSubtaskToggleButton onClick={() => handleToggleAddSubtask(task.id)}>+</AddSubtaskToggleButton>
                                <DeleteButton onClick={() => buttonDelete(task.id)}>x</DeleteButton>
                            </ItemButtons>
                        </>
                    )}
                </Item>
                
                {isAddingSubtask && (
                    <SubtaskInputWrapper>
                        <SubtaskInput 
                            type="text" 
                            placeholder="Adicionar subtarefa..."
                            value={subtaskInputValues[task.id] || ''}
                            onChange={(e) => handleSubtaskInputChange(task.id, e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleAddSubtask(task.id); if (e.key === 'Escape') handleCloseSubtaskInput(); }}
                            autoFocus 
                        />
                        <SubtaskInputButtons>
                            <AddSubtaskButton onClick={() => handleAddSubtask(task.id)} title="Adicionar">+</AddSubtaskButton>
                            <CloseSubtaskInputButton onClick={handleCloseSubtaskInput} title="Fechar">×</CloseSubtaskInputButton> 
                        </SubtaskInputButtons>
                    </SubtaskInputWrapper>
                )}

                {!isEditingMainTask && task.subtasks && task.subtasks.length > 0 && (
                    <SubtaskList>
                        {task.subtasks.map(subtask => {
                            const isEditingThisSubtask = editingSubtaskId?.taskId === task.id && editingSubtaskId?.subtaskId === subtask.id;
                            return (
                                <SubtaskItem key={subtask.id} completed={subtask.completed}>
                                    {isEditingThisSubtask ? (
                                        <>
                                            <input 
                                                type="checkbox" 
                                                checked={subtask.completed} 
                                                readOnly 
                                                style={{ cursor: 'not-allowed' }} 
                                            />
                                            <input 
                                                ref={editSubtaskInputRef}
                                                type="text" 
                                                className="subtask-edit-input"
                                                value={editSubtaskText} 
                                                onChange={(e) => setEditSubtaskText(e.target.value)} 
                                                onBlur={handleSaveSubtaskEdit}
                                                onKeyDown={handleSubtaskEditKeyDown}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <input 
                                                type="checkbox" 
                                                checked={subtask.completed} 
                                                onChange={(e) => {
                                                    e.stopPropagation();
                                                    toggleSubtaskComplete(task.id, subtask.id)
                                                }}
                                            />
                                            <span onClick={() => handleStartEditingSubtask(task.id, subtask)} title="Clique para editar">
                                                {subtask.text}
                                            </span>
                                        </>
                                    )}
                                </SubtaskItem>
                            );
                        })}
                    </SubtaskList>
                )}
            </React.Fragment>
        );
    };

    return (
        <Container>
            <MainLayout>
                <TasksContainer>
                    <InputContainer>
                        <Input 
                            placeholder="Digite uma tarefa" 
                            onChange={inputChange} 
                            value={inputValue}
                        />
                        <DateInput 
                            type="date" 
                            value={newDueDate} 
                            onChange={handleDateChange} 
                        />
                        <Button onClick={buttonClick}>Adicionar</Button>
                    </InputContainer>

                    <ListsWrapper>
                        <SectionTitle>Pendências</SectionTitle>
                        <List>
                            {pendingTasks.length > 0 ? (
                                pendingTasks.map(renderTaskItem)
                            ) : (
                                <p>Nenhuma tarefa pendente.</p>
                            )}
                        </List>

                        <SectionTitle>Tarefas Sem Data</SectionTitle>
                        <List>
                            {tasksWithoutDate.length > 0 ? (
                                tasksWithoutDate.map(renderTaskItem)
                            ) : (
                                <p>Nenhuma tarefa sem data.</p>
                            )}
                        </List>
                        
                        {}
                        <SectionTitle>Tarefas para {formatDateForDisplay(selectedDateString)}</SectionTitle>
                        <List>
                            {tasksForSelectedDate.length > 0 ? (
                                tasksForSelectedDate.map(renderTaskItem)
                            ) : (
                                <p>Nenhuma tarefa para esta data.</p>
                            )}
                        </List>
                    </ListsWrapper>
                </TasksContainer>

                <CalendarContainer>
                    <Calendar 
                        onChange={handleCalendarChange} 
                        value={selectedDate}
                    />
                </CalendarContainer>
            </MainLayout>
        </Container>
    )
}

import React from 'react'; 
export default App;

