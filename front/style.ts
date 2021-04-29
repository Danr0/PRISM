import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
    button: {
        background: 'silver',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        height: 48,
        padding: '0 30px',
    },
    input_form: {
        background: 'gray',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        padding: '0 30px',
        width: '300px'
    },
    input: {
        background: 'gray',
        color: 'black',
        "&.Mui-focused": {
            color: "black"
        }
    },
    input_text: {
        background: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        height: 48,
    },
    menu_item: {
        background: 'Gray',
    },
    menu: {
        background: '#D3D3D3',
        display: 'flex'
    },
    bg: {
        background: '#C0C0C0',
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
        color: 'black',
        display: 'flex',
        background: 'gray',
        'justify-content': 'center',
        'align-items': 'center',
        'font-family': "Times New Roman",
    },
    text_style: {
        color: 'black',
        'font-family': "Times New Roman",
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
    logo: {
        'height': '29px',
        'width': '45px',
        'margin-top': '16px',
    }

});