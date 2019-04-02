/* eslint-disable react/prop-types,react/jsx-key */
import React from 'react';
import '../styles.scss';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class TaskDescriptionComponent extends React.Component {
    handleClose() {
        this.props.closeTaskDescriptionDialog();
    };

    render()
    {
        let text;
        if(this.props.text)
        {
            text = this.props.text;
        }
        else
        {
            text = "Ошибка входных данных";
        }

        const actions = [
            <FlatButton
                label="Закрыть"
                secondary={true}
                onClick={() => this.handleClose()}
            />,
        ];

        return (
            <div>
                <Dialog
                    title={"Задание " + this.props.currentTask}
                    actions={actions}
                    modal={false}
                    open={this.props.isTaskDescDialogOpened}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    {text}
                </Dialog>
            </div>
        );
    }
}
