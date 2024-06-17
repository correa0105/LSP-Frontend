import { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

export default createGlobalStyle`
    :root {
        --black: #000706;
        --primary: #0c7e7e;
        --secondary: #134647;
        --others: #bfac8b;
    }

    //BOSTSTRAP REACT

    .custom-table td,
    .custom-table th {
        padding: 1rem 1rem 1rem 1.8rem; /* ou qualquer valor de padding que você desejar */
    }

    .form-check-input {
        width: 1.5rem;
        height: 1.5rem;
    }

    label {
        font-size: 1.3rem;
    }

    .btn-primary {
        background-color: var(--primary);
        border-color: var(--others);
        border: none;
    }

    .btn-primary:hover {
        background-color: #998a70;
        border-color: #998a70;
    }

    .btn-primary:disabled {
        background-color: #998a70;
        border-color: #998a70;
    }

    .nav-link {
        font-size: 1.5rem;
    }

    //BOSTSTRAP REACT


    * {
        box-sizing: border-box;
        padding: 0;
        outline: none;
        font-family: 'Inter';
    }

    html {
        font-size: 62.5%;
    }

    a {
       text-decoration: none; 
    }

    ul {
        list-style: none;
    }

    body {
        background-color: var(--others);
        min-height: 100vh;
    }
`;
