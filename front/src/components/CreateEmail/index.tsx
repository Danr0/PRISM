import React, {useEffect, useState} from 'react';
import RichTextEditor, {EditorValue} from 'react-rte';
import {
    changeFrom,
    changeTo,
    changeSubject,
    changeBody,
    addNewAttachments,
    changeNewAttachments,
    changeOk,
    createNewTask,
    NewMail,
    NewAttachment,
    ResponceEmail
} from './@slice';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Button, FormControl, IconButton, Link, TextField} from "@material-ui/core";
import {useStyles} from "../../../style";
import {SvgLogo} from "../Logo/logo";
import {Alert} from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";

const CreateEmail: React.FC  = () => {
    const from = useAppSelector(state => state.new_task.from);
    const to = useAppSelector(state => state.new_task.to);
    const subject = useAppSelector(state => state.new_task.subject);
    const body = useAppSelector(state => state.new_task.body);
    const attachments = useAppSelector(state => state.new_task.attachments);
    const ok = useAppSelector(state => state.new_task.ok);
    const dispatch = useAppDispatch();
    const classes = useStyles();

    // do it by Usesate, because if by dispatch it almost 1 sec delay for every symbol
    const [editor_body, set_editor_body] = useState(RichTextEditor.createEmptyValue());

    function updateBody(editor_body: EditorValue) {
        dispatch(changeBody(editor_body.toString('html')))
    }

    const logo_svg = {
        size: 50,
        color: 'blue'
    };

    const onChange = (e : FileList | null) => {
        if (e !== null) {
            Array.from(e).forEach(file => { getBase64(file) });
        }
    };

    const onLoad = (fileString : string | null | ArrayBuffer, name: string) => {
        if (fileString !== null) {
            const pattern = "base64,";
            let data =  fileString.toString();
            data = data.substring(data.indexOf(pattern) + pattern.length);
            const new_at = {filename: name, content: data, encoding: "base64"} as NewAttachment;
            console.log(new_at);
            dispatch(addNewAttachments(new_at));
        }
    };

    const getBase64 = (file : File) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoad(reader.result, file.name);
        };
    }; const hiddenFileInput = React.useRef() as React.MutableRefObject<HTMLInputElement>;


    async function createBackRequest(){
        updateBody(editor_body);

        const final_obj = {from: from,
            to: to,
            subject: subject,
            body: editor_body.toString('html'),
            attachments: attachments,
            ok: false,
        }
        if (localStorage.getItem('token') !== null){
            const resp = await dispatch(createNewTask(final_obj));
            const data = resp.payload as ResponceEmail;
            console.log(data);
            dispatch(changeOk(true));
        }

    }


    return(
        <div>
            <FormControl className={classes.new_mail_form}>
                <div className={classes.logoswithtext}>
                    <SvgLogo size={logo_svg.size} color={logo_svg.color}></SvgLogo>
                    <h1 className={classes.text}>New task editor</h1>
                </div>
                <div className={classes.input_div_new_mail}>
                    <TextField  className={classes.input_text_new_mail} id="From" placeholder="From" label="From" InputLabelProps={{style: { color: 'black' }}}
                                value={from}
                                onChange={(event) => dispatch(changeFrom(event.target.value))}/>
                </div>
                <div className={classes.input_div_new_mail}>
                            <TextField  className={classes.input_text_new_mail} id="To" placeholder="To" label="To" InputLabelProps={{style: { color: 'black' }}}
                            value={to}
                            onChange={(event) => dispatch(changeTo(event.target.value.replace(/\s+/g, '').split(',')))}/>
                </div>
                <div className={classes.input_div_new_mail}>
                            <TextField  className={classes.input_text_new_mail} id="Subject" placeholder="Subject" label="Subject" InputLabelProps={{style: { color: 'black' }}}
                            value={subject}
                            onChange={(event) => dispatch(changeSubject(event.target.value))}/>
                </div>
                            <RichTextEditor
                                className={classes.input_body_new_mail}
                                value={editor_body}
                                placeholder={'Type here:'}
                                onChange={(value) => {
                                    set_editor_body(value)
                                }}
                    />
                { attachments.length > 0 &&
                <div className={classes.attachments_new_mail}>
                    <div className={classes.text_bold}>
                        Attachments:
                    </div>
                    <div className={classes.text_filed}>
                        <div className={classes.mail_menu_attachments}>
                            {attachments.map((row: NewAttachment) => (
                                <a className={classes.attachments_menu} download={row.filename} href={"data:image/png;base64,"+row.content}>{row.filename}</a>
                            ))}
                        </div>
                    </div>
                </div>
                }
                <div className={classes.attachment_upload_button_div}>
                    <Button className={classes.button_clear}
                        onClick={(event) => {
                        if (hiddenFileInput !== null) {
                            hiddenFileInput.current.click();
                        }
                    }}>
                        Upload a file
                    </Button>
                    <input type="file" style={{display:'none'}} ref={hiddenFileInput} onChange={ (e) => onChange(e.target.files) } />

                    {attachments.length > 0 &&
                        <Button className={classes.button_clear}
                                onClick={() => {
                                    dispatch(changeNewAttachments([]))
                                }}>Clear attachments
                        </Button>
                    }
                </div>
                <div className={classes.back_button}>
                    <Link href="/mail"><Button className={classes.button_back}>Back</Button></Link>
                    <Button className={classes.button_new_task}
                            onClick={createBackRequest}>Create task
                    </Button>
                </div>

            </FormControl>
            { ok && <Alert severity="success"
                           action={
                               <IconButton
                                   aria-label="close"
                                   color="inherit"
                                   size="small"
                                   onClick={() => {
                                       dispatch(changeOk(false));
                                   }}
                               >
                                   <CloseIcon fontSize="inherit" />
                               </IconButton>
                           }
            >Task created!</Alert>}
        </div>
      )
}

export default CreateEmail;
