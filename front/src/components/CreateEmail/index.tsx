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
    changeType,
    changeTrans_conf,
    changeTransPassword,
    changeTransUser,
    changeTransHost, changeTransPort, changeTransSecure,
    createNewTask,
    NewMail,
    NewAttachment,
    ResponceEmail, mails_types
} from './@slice';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Button, Checkbox, FormControl, IconButton, Link, MenuItem, TextField} from "@material-ui/core";
import {useStyles} from "../../../style";
import {SvgLogo} from "../Logo/logo";
import {Alert} from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import {
    createCustomConfig,
    createSmtpCampusMephiConfig,
    createSmtpMailRuConfig,
    createSmtpYandexConfig,
    createSmtpGoogleConfig,
    TransporterObject
} from "./transporters";
import { FormControlLabel } from '@material-ui/core';

const CreateEmail: React.FC  = () => {
    const from = useAppSelector(state => state.new_task.from);
    const to = useAppSelector(state => state.new_task.to);
    const subject = useAppSelector(state => state.new_task.subject);
    const body = useAppSelector(state => state.new_task.body);
    const attachments = useAppSelector(state => state.new_task.attachments);
    const ok = useAppSelector(state => state.new_task.ok);
    const trans_type = useAppSelector(state => state.new_task.type);
    const trans_conf = useAppSelector(state => state.new_task.trans_conf);
    const dispatch = useAppDispatch();
    const classes = useStyles();

    // do it by Usesate, because if by dispatch it almost 1 sec delay for every symbol
    const [editor_body, set_editor_body] = useState(RichTextEditor.createEmptyValue());

    const types_of_mails = [
        {
            value: 'yandex',
            label: 'yandex',
        },
        {
            value: 'mail.ru',
            label: 'mail',
        },
        {
            value: 'google.com',
            label: 'google',
        },
        {
            value: 'campus.mephi.ru',
            label: 'mephi',
        },
        {
            value: 'custom',
            label: 'custom',
        },
    ];

    function updateBody(editor_body: EditorValue) {
        dispatch(changeBody(editor_body.toString('html')))
    }

    function updateConf(trans_type: mails_types, trans_conf: TransporterObject):TransporterObject  {
        if (trans_type == 'yandex')
        {
            const tmp_conf = createSmtpYandexConfig(trans_conf.auth.user, trans_conf.auth.pass);
            dispatch(changeTrans_conf(tmp_conf));
            return tmp_conf;
        }
        else if (trans_type == 'mail.ru')
        {
            const tmp_conf = createSmtpMailRuConfig(trans_conf.auth.user, trans_conf.auth.pass);
            dispatch(changeTrans_conf(tmp_conf));
            return tmp_conf;
        }
        else if (trans_type == 'campus.mephi.ru')
        {
            const tmp_conf = createSmtpCampusMephiConfig(trans_conf.auth.user, trans_conf.auth.pass);
            dispatch(changeTrans_conf(tmp_conf));
            return tmp_conf;
        }
        else if (trans_type == 'google.com')
        {
            const tmp_conf = createSmtpGoogleConfig(trans_conf.auth.user, trans_conf.auth.pass);
            dispatch(changeTrans_conf(tmp_conf));
            return tmp_conf;
        }
        return trans_conf;
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
        const new_conf = updateConf(trans_type, trans_conf);

        const final_obj = {from: from,
            to: to,
            subject: subject,
            body: editor_body.toString('html'),
            attachments: attachments,
            ok: false,
            trans_conf: new_conf,
            type: trans_type
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
                <div className={classes.input_type_new_mail}>
                    <TextField
                        id="outlined-select-mail-type"
                        select
                        label="Mail type"
                        value={trans_type}
                        onChange={(event)=> dispatch(changeType(event.target.value))}
                        variant="outlined"
                    >
                        {types_of_mails.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField  id="trans_login" placeholder="Mail" label="Mail" InputLabelProps={{style: { color: 'black' }}}
                                value={trans_conf.auth.user}
                                onChange={(event) => dispatch(changeTransUser(event.target.value))}/>
                    <TextField  id="trans_password" placeholder="Password" label="Password" InputLabelProps={{style: { color: 'black' }}}
                                value={trans_conf.auth.pass}
                                type={'password'}
                                onChange={(event) => dispatch(changeTransPassword(event.target.value))}/>
                </div>
                {trans_type == 'custom' &&
                <div className={classes.input_type_new_mail}>
                    <TextField  id="trans_host" placeholder="Host" label="Host" InputLabelProps={{style: { color: 'black' }}}
                                value={trans_conf.host}
                                onChange={(event) => dispatch(changeTransHost(event.target.value))}/>
                    <TextField  id="trans_port" placeholder="Port" label="Port" InputLabelProps={{style: { color: 'black' },shrink: true}}
                                value={trans_conf.port}
                                type="number"
                                onChange={(event) => dispatch(changeTransPort(parseInt(event.target.value)))}/>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={trans_conf.secure}
                                onChange={(event) => dispatch(changeTransSecure(event.target.checked))}
                                name="Secure"
                                color="primary"
                            />
                        }
                        label="Secure"
                    />
                </div>
                }
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
