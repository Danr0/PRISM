import {makeStyles} from "@material-ui/core/styles"

export const useStyles = makeStyles({
    button: {
        width: '320px',
        height: '38px',
        background: '#0062ff',
        'border-radius': '10px',
        'border': 'none',
        'color': 'white',
        'font-size': '12px',
        'text-align': 'center',
        'cursor': 'pointer',
        'margin-top': '10px',
        ':focus': {
            outline: 'none',
        },
        ':disabled': {
            opacity: 0.7,
            cursor: 'not-allowed',
        }
    },
    logout_button: {
        width: '120px',
        height: '38px',
        background: '#0062ff',
        'border-radius': '10px',
        'border': 'none',
        'color': 'white',
        'font-size': '12px',
        'text-align': 'center',
        'cursor': 'pointer',
        'margin-top': '10px',
        'margin-left': '15px',
        ':focus': {
            outline: 'none',
        },
        ':disabled': {
            opacity: 0.7,
            cursor: 'not-allowed',
        }
    },
    login_form: {
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'center',
        'width': '360px',
        'min-width': '300px',
        'height': '300px',
        'background-color': 'white',
        'border-radius': '20px',
        margin: '35px 10px 25px 10px',
    },
    register_form: {
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'center',
        'width': '370px',
        'min-width': '320px',
        'height': '320px',
        'background-color': 'white',
        'border-radius': '20px',
        margin: '35px 10px 25px 10px',
    },
    profile_form: {
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'width': '250px',
        'min-width': '200px',
        'height': '80px',
        'background-color': 'white',
        'border-radius': '20px',
        margin: '35px 10px 25px 10px',
    },
    login_wrapper: {
        display: 'flex',
        position: 'relative',
        'flex-direction': 'column',
    },
    input: {
        padding: '0 0 1px 20px',
        transition: 'all 200ms',
        opacity: 0.5,
        color: '#92929d',
    },
    input_text: {
        'z-index': 1,
        width: '320px',
        height: '38px',
        border: '1px solid #f1f1f5',
        'box-sizing': 'border-box',
        'border-radius': '15px',
        'background': '#fafafb',
        'padding': '0 20px',
        'margin-bottom': '15px',
        'font-size': '12px',
        'color': '#92929d'
    },
    menu_item: {
        background: 'Gray',
    },
    menu: {
        background: '#D3D3D3',
        display: 'flex'
    },
    bg: {
        background: '#0062ff',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    main_page: {
        background: 'gray',
        'margin-top': '1%',
        'margin-left': '3%',
        'margin-right': '3%',
        'margin-bottom': '1%',
        //'min-height': '90vh'
    },
    text: {
        color: 'blue',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'font-family': 'Roboto, sans-serif',
        'font-weight': 300,
    },
    text_style: {
        color: 'black',
        'font-family': "Roboto",
    },
    list_item: {
        color: 'black',
        background: 'gray',
        display: 'flex',
        'flex-direction': 'column',
    },
    data: {
        'max-width' : '300px',
        'overflow-wrap': 'break-word',
    },
    logoswithtext: {
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
    },
    links: {
        'font-family': 'Roboto, sans-serif',
        'font-size': '15px',
        'color': 'blue',
        'text-decoration': 'none',
        'margin-top': '6px',
    }
})