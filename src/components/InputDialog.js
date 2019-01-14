import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class InputDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: ''
        };
    }

    handleChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    handleSubmit() {
        const {
            state: { name },
            props: { onSubmit }
        } = this;
        onSubmit(name);
    }

    render() {
        const { title, dialogText } = this.props;
        return (
            <Dialog open aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogText}</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="highscoreName"
                        label="Name"
                        type="text"
                        fullWidth
                        onChange={this.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

InputDialog.propTypes = {
    title: PropTypes.string.isRequired,
    dialogText: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default InputDialog;
