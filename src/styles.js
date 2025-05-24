import styled, { css } from "styled-components"; 


export const MainLayout = styled.div`
    display: flex;
    gap: 30px; 
    width: 90%;
    max-width: 1000px; 
    background: #b397ae;;


    padding: 20px;
    border-radius: 8px;
    box-shadow: #85627e; 
    height: calc(100vh - 100px); 
    max-height: 800px; 
`;


export const TasksContainer = styled.div`
    flex: 1; 
    display: flex;
    flex-direction: column;
    overflow: hidden; 
`;


export const CalendarContainer = styled.div`
    width: 350px; 
    flex-shrink: 0; 
    overflow-y: auto;

   
    .react-calendar {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        opacity: 0.7;
    }
    .react-calendar__tile--active {
        background: #85627e;
        color: white;
    }
     .react-calendar__tile--now {
        background: #f6cdce;
        
    }
`;


export const InputContainer = styled.div`
    display: flex;
    width: 100%;
    gap: 10px; 
    margin-bottom: 20px; 
    flex-shrink: 0; 
`;


export const ListsWrapper = styled.div`
    flex-grow: 1;
    overflow-y: auto; 
    padding-right: 10px; 
    display: flex;
    flex-direction: column;
    gap: 20px; 
`;


export const SectionTitle = styled.h2`
    font-size: 1.2em;
    color: #333;
    margin-bottom: 5px;
    margin-top: 0; 
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    flex-shrink: 0; 
`;

export const List = styled.ul`
    padding: 15px;
    border-radius: 5px;  
    width: 100%; 
    list-style: none;
    padding: 0;
    margin: 0; 
    flex-shrink: 0; 
`;

export const Item = styled.li`
    position: relative;
    color: #000000;
    font-size: 15px;
    font-weight: 400;
    background: #e4e4e4;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    min-height: 40px;
    list-style-type: none;
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    margin-bottom: 15px; 

    .task-content {
        display: flex;
        align-items: center;
        gap: 10px;
        word-break: break-word;
        flex: 1;
        margin-right: 10px;
        cursor: pointer; 
    }

    input[type="checkbox"] {
        flex-shrink: 0;
    }

    .edit-input {
        flex-grow: 1;
        height: 30px;
        border-radius: 3px;
        border: 1px solid #ccc;
        font-size: 15px;
        font-family: "Roboto", sans-serif;
        outline: none;
        padding: 0 5px;
        margin-right: 10px; 
    }

    ${props => props.completed && css`
        background: #f6cdce;
        opacity: 0.7;
        
        .task-content span {
            text-decoration: line-through;
            color: #555;
        }
    `}
`;


export const ItemButtons = styled.div`
    display: flex;
    gap: 5px; 
    flex-shrink: 0;
`;


export const Container = styled.div`
    width: 100vw;
    height: 100vh; 
    background: #85627e;
    display: flex;
    align-items: center; 
    justify-content: center;
    padding: 50px 0; 
`;

export const TodoList = styled.div`
    background: #ffffff;
    padding: 30px 20px; 
    border-radius: 5px; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    width: 80%; 
    max-width: 500px; 
`;

export const Input = styled.input`
    flex-grow: 1;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-weight: 400;
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    outline: none;
    padding: 0 10px;
`;

export const DateInput = styled.input`
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-family: "Roboto", sans-serif;
    outline: none;
    padding: 0 10px;
    width: 150px;
    flex-shrink: 0;
`;

export const Button = styled.button`
    background:#85627e;
    border-radius: 6px;
    height: 40px;
    border: none;
    color: #ffff;
    cursor: pointer;
    padding: 0 15px;
    font-weight: bold;
    white-space: nowrap;
    flex-shrink: 0;

    &:hover {
        opacity: 0.8;
    }
`;


const ItemActionButton = styled.button`
    background: none;
    border: none;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
    padding: 5px;
    flex-shrink: 0;

    &:hover {
        opacity: 0.7;
    }
`;

export const DeleteButton = styled(ItemActionButton)`
    color: red;
`;


export const AddSubtaskToggleButton = styled(ItemActionButton)`
    color:#85627e; 
    font-size: 20px; 
    line-height: 1;
`;

export const SaveButton = styled(Button)`
    background:rgb(142, 167, 40);
    height: 30px;
    padding: 0 10px;
    margin-left: 5px;
`;

export const CancelButton = styled(Button)`
    background: #6c757d; 
    height: 30px;
    padding: 0 10px;
    margin-left: 5px;
`;



export const SubtaskInputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    
    margin-bottom: 10px;
`;

export const SubtaskInput = styled(Input)`
    height: 35px;
    font-size: 14px;
    flex-grow: 1;
    padding-right: 60px; 
`;

export const SubtaskInputButtons = styled.div`
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center; 
    gap: 5px; 
`;

const InputInternalButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 2px 4px; 
    font-size: 16px;
    line-height: 1;
    color: #555;
    display: flex; 
    align-items: center;
    justify-content: center;

    &:hover {
        color: #000;
    }
`;

export const AddSubtaskButton = styled(InputInternalButton)`
    color: #28a745; 
    font-weight: bold; 
    &:hover {
        color: #1f7a33;
    }
`;

export const CloseSubtaskInputButton = styled(InputInternalButton)`
    color: #dc3545; 
    font-weight: bold; 
    &:hover {
        color: #a71d2a;
    }
`;



export const SubtaskList = styled.ul`
    list-style: none;
    padding: 5px 0 5px 40px;
    margin: 0;
`;

export const Paragraph = styled.p`
    margin-left: 15px;
`;

export const SubtaskItem = styled.li`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #333;
    padding: 3px 0;
    border-bottom: 1px dashed #eee;

    &:last-child {
        border-bottom: none;
    }

    input[type="checkbox"] {
        flex-shrink: 0;
    }

    span {
        flex-grow: 1;
        word-break: break-word;
        cursor: pointer;
    }

    .subtask-edit-input {
        flex-grow: 1;
        height: 24px;
        border-radius: 3px;

        border: 1px solid #ccc;
        font-size: 14px;
        font-family: "Roboto", sans-serif;
        outline: none;
        padding: 0 5px;
    }

    ${props => props.completed && css`
        span {
            text-decoration: line-through;
            color: #888;
        }
    `}
`;
