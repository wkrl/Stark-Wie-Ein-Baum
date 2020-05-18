import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import useGlobal from "../store";

const useStyles = makeStyles( theme => ({
    input: {
        "-webkit-appearance": "none",
        "-moz-appearance": "none",
        "appearance": "none",

        width: "100%",        
        marginBottom: "8px",
        fontFamily: "'Open Sans', sans-serif",
        fontSize: "14px",
        fontWeight: "500",
        color: "#414141",
        background: "#ECECEC",
        borderRadius: "12px",
        border: "8px solid #ECECEC",        
        outline: "none",
        boxSizing: "border-box",  
    },
}))

const InputField = (props) => {
    const classes = useStyles();
    const [globalState, globalActions] = useGlobal();

    const getInputType = () => {
        if (props.hidden) return "password";
        if (props.name === "email") return "email"; 
        return "text"; 
    }

    useEffect(() => {
        let treeId = props.selectedTree ? props.selectedTree.treeId : null;
        if (treeId) {
            globalActions.updateState("nachricht", `Ich interessiere mich für eine Patenschaft für den Baum ${props.selectedTree.treeId}\n${props.selectedTree.treeName} - Reihe ${props.selectedTree.reihe}, Baum ${props.selectedTree.pflanzreihePosition}\nDazu habe ich folgende Anmerkungen oder Fragen:`);
        } else {
            globalActions.updateState("nachricht", `Ich interessiere mich für eine Patenschaft.\nDazu habe ich folgende Anmerkungen oder Fragen:`);
        }
    }, [props.selectedTree])

    return <React.Fragment>        
        {props.textArea ? 
            <textarea 
                className={classes.input}
                rows="5"
                placeholder={props.value}                
                maxLength="800"
                value={globalState[props.name]}
                style={{resize: 'none', }}
                onChange={(e) =>
                    globalActions.updateState(props.name, e.target.value)
                }
            /> : 
            <input type={getInputType()}
                className={classes.input}
                placeholder={props.value}                
                maxLength="240"
                onChange={(e) =>
                    globalActions.updateState(props.name, e.target.value)
                }
            />
        }        
    </React.Fragment>
}

export default InputField;
