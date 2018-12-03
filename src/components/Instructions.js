import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    card: {
        minWidth: 275
    },
    pos: {
        margin: '18px 0 5px'
    }
};

class Instructions extends React.PureComponent {
    render() {
        const { classes } = this.props;
        return (
            <div className="Component_Instructions-container">
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h5" component="h2" color="textSecondary" gutterBottom>
                            How to Play
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            To Begin
                        </Typography>
                        <Typography component="p">
                            Press Space to start and stop the current game.
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            In Game
                        </Typography>
                        <Typography component="p">
                            Use the arrow keys or W, A, S, D to control the player.
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

Instructions.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Instructions);
