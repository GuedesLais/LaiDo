import styled, { css } from "styled-components"; 

// Added InputContainer style
export const InputContainer = styled.div`
    display: flex;
    width: 100%; /* Make input+button row take full width */
    margin-bottom: 20px; /* Add space below the input row */
`;

export const List = styled.ul`
    background: #ffffff;
    padding: 20px;
    border-radius: 5px;  
    /* Removed margin-top as InputContainer now provides spacing */
    min-width: 300px; /* Ensure minimum width */
    width: 100%; /* Make list take full width */
    list-style: none; /* Remove default list styling */
    padding: 0; /* Remove default padding */
`;

export const Item = styled.li`
    position: relative;
    color: #000000;
    font-size: 15px;
    font-weight: 400; /* Adjusted weight */
    background: #e4e4e4;
    box-shadow: 1px 4px 10px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    min-height: 40px; /* Use min-height */
    list-style-type: none;
    margin-bottom: 15px; /* Adjusted margin */
    align-items: center;
    display: flex;
    justify-content: space-between; /* Changed to space-between */
    padding: 0 10px; /* Added padding */

    /* Style for the div containing checkbox and text */
    div {
        display: flex;
        align-items: center;
        gap: 10px; /* Add space between checkbox and text */
    }

    /* Style for completed tasks */
    ${props => props.completed && css`
        background: #c8e6c9; /* Light green background */
        span {
            text-decoration: line-through;
            color: #555;
        }
    `}
`;


export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right,rgb(5, 5, 5),rgb(3, 56, 98));
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const TodoList = styled.div`
    background: #ffffff;
    padding: 30px 20px; /* Adjusted padding */
    border-radius: 5px; /* Added border-radius */
    display: flex; /* Use flexbox */
    flex-direction: column; /* Stack InputContainer and List vertically */
    align-items: center; /* Center items horizontally */
    width: 80%; /* Control the overall width */
    max-width: 500px; /* Set a max width */

    /* Removed the style for the first div as InputContainer handles it */
`;

export const Input = styled.input`
    flex-grow: 1; /* Allow input to take available space */
    height: 40px;
    border-radius: 5px;
    border: 2px solid rgba(209, 211, 212, 0.4);
    font-weight: 400;
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    outline: none;
    padding: 0 10px; /* Added padding */
`;

export const Button = styled.button`
    background:rgb(17, 90, 208);
    border-radius: 6px;
    height: 40px;
    border: none;
    color: #ffff;
    margin-left: 10px; /* Adjusted margin to create space */
    cursor: pointer;
    padding: 0 15px; /* Added padding */
    font-weight: bold;
    white-space: nowrap; /* Prevent button text wrapping */

    &:hover {
        opacity: 0.8;
    }
`;

// Added DeleteButton style
export const DeleteButton = styled.button`
    background: none;
    border: none;
    color: red;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px; /* Increased size slightly */
    padding: 5px; /* Add some padding for easier clicking */

    &:hover {
        opacity: 0.7;
    }
`;

