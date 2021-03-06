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
    button_clear: {
        height: '38px',
        background: '#0062ff',
        'border-radius': '10px',
        'border': 'none',
        'color': 'white',
        'font-size': '12px',
        'text-align': 'center',
        'cursor': 'pointer',
        'margin-left': '15px',
        'margin-right': '15px',
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
        position: 'absolute',
        right: 0,
        'align-items': 'center',
        'width': '250px',
        'min-width': '200px',
        'height': '80px',
        'background-color': 'white',
        'border-radius': '20px',
        margin: '15px 15px 15px 15px',
    },
    mails_form: {
        display: 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'wrap',
        'align-items': 'center',
        'width': '99%',
        'max-height': '60vh',
        'border-radius': '20px',
        'background-color': 'white',
        padding: '1em',
    },
    new_mail_form: {
        display: 'flex',
        'border-radius': '20px',
        'flex-direction': 'column',
        'flex-wrap': 'wrap',
        'align-items': 'center',
        'min-height': '20vh',
        'background-color': 'white',
        padding: '1em',
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
    input_div_new_mail: {
        'z-index': 1,
        width: '90%',
        height: '78px',
        border: '1px solid #f1f1f5',
        'box-sizing': 'border-box',
        'background': '#fafafb',
        'font-size': '12px',
        'color': '#92929d',
        display: "flex",
        'justify-content': 'center',
    },
    input_type_new_mail: {
        'z-index': 1,
        width: '90%',
        height: '78px',
        border: '1px solid #f1f1f5',
        'box-sizing': 'border-box',
        'background': '#fafafb',
        'font-size': '12px',
        'color': '#92929d',
        display: "flex",
        'justify-content': 'space-around',
    },
    input_text_new_mail: {
        width: '95%',
    },
    input_body_new_mail: {
        width: '90%',
        border: '1px solid #f1f1f5',
        'background': '#fafafb',
    },
    attachments_new_mail: {
        'z-index': 1,
        border: '1px solid #f1f1f5',
        'box-sizing': 'border-box',
        'background': '#fafafb',
        'margin-top': '20px',
        'color': '#92929d',
        display: "flex",
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
        'min-height': '100%',
        'min-width': '100%',
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
    text_d: {
        color: 'black',
        'font-family': 'Roboto, sans-serif',
        'font-weight': 300,
    },
    text_bold: {
        color: 'black',
        'font-family': 'Roboto, sans-serif',
        'font-weight': 300,
        'font-size': '110%',
    },
    text_filed: {
        'margin-top': '1.5px',
        'margin-left': '15px',
        color: 'black',
        'font-family': 'Roboto, sans-serif',
        'font-weight': 300,
        overflow: 'auto',
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
    mail_menu: {
        width: '20%',
        height: '100%',
        overflow: 'auto',
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
    },
    mail_view: {
        width: '80%',
        height: '100%',
        overflow: 'auto',
    },
    mail_menu_button: {
        height: '100%',
        width: '100%',
        'border': 'none',
        visibility: 'hidden',
        overflow: 'auto',
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
    },
    table_style: {
        flexShrink: 0,
    },
    logo_profile: {
        'margin-top': '15px',
        'margin-left': '10px',
    },
    profile: {
        display: 'flex',
    },
    field: {
        display: 'flex',
        margin: '15px 15px 15px 15px',
        'border-color': '#A0A0A0',
        'border-style': 'solid',
        'border-width': 'thin',
        padding: '5px',
        background: '#F5F5F5',
    },
    mail_body: {
        display: 'flex',
        'flex-direction': 'column',
        margin: '15px 15px 15px 15px',
        'border-color': '#A0A0A0',
        'border-style': 'solid',
        'border-width': 'thin',
        padding: '5px',
        background: '#F5F5F5',
    },
    mail_menu_table: {
        background: '#F5F5F5',
    },
    mail_menu_attachments: {
        display: 'flex',
    },
    mail_menu_buttons: {
        display: 'flex',
        'flex-grow': 2,
        'justify-content': 'space-between',
    },
    attachments_menu: {
        'margin-left': '15px',
        'font-family': 'Roboto, sans-serif',
        'font-weight': 300,
    },
    update_button: {
        display:'block',
        height: '60px',
        width: '60px',
        'border-radius': '50%',
        'text-align': 'center',
        background: '#0062ff',
        'border': 'none',
        'color': 'white',
        'cursor': 'pointer',
        ':focus': {
            outline: 'none',
        },
        'margin-bottom': '15px',
    },
    button_new_task: {
        width: '150px',
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
    },
    button_back: {
        height: '38px',
        background: '#0062ff',
        'border-radius': '10px',
        'border': 'none',
        'color': 'white',
        'font-size': '12px',
        'text-align': 'center',
        'cursor': 'pointer',
        'margin-top': '10px',
        'margin-right': '40px',
    },
    table_pagination: {
        overflow: 'auto',
        'justify-content': 'start',
    },
    error_table: {
        background: '#ff9f90',
        color: 'black',
    },
    error_table_div: {
        overflow: 'auto',
        margin: '15px 15px 15px 15px',
    },
    attachment_upload_button_div: {
        display: 'flex',
        'flex-grow': 2,
        'justify-content': 'space-between',
        'margin-top': '15px',
    },
    back_button: {
        'display': 'flex',
        'flex-direction': 'row',
        'justify-content': 'space-between',
        width: '100%'
    },

})