import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $backgroundColor: String!,
        $borderColor: String!
        $fontSize: Int!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int! ) {
        addLogo(
            text: $text,
                color: $color,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                fontSize: $fontSize,
                borderRadius: $borderRadius, 
                borderWidth: $borderWidth, 
                padding: $padding, 
                margin: $margin ) {
            _id
        }
    }
`;

class CreateLogoScreen extends Component {
    constructor(props) {
        super(props);

        //make state to manage css variables and text
        this.state = {
            text: "",
            color: "",
            backgroundColor: "",
            borderColor: "",
            fontSize: "",
            borderRadius: "",
            borderWidth: "",
            padding: "",
            margin: ""
        }
    }

    //method for text change
    changeText = (event) =>{
        this.setState( {text: event.target.value} );
    }

    //changes text color
    changeTextColor = (event) => {
        this.setState( {color: event.target.value} );
        console.log("changed text color");
    }

    changeBackground = (event) => {
        this.setState( {backgroundColor: event.target.value} );
    }

    changeBorderColor = (event) => {
        console.log("changed border color");
        this.setState( {borderColor: event.target.value} );
    }

    changeFontSize = (event) => {
        this.setState( {fontSize: event.target.value });
    }

    changeBorderRadius = (event) => {
        this.setState( {borderRadius: event.target.value} );
    }

    changeBorderWidth = (event) => {
        this.setState( {borderWidth: event.target.value} );
    }

    changePadding = (event) => {
        this.setState( {padding: event.target.value} );
    }

    changeMargin = (event) => {
        this.setState( {margin: event.target.value} );
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        const styles = {
            container: {
                textAlign: "center",
                color: this.state.color,
                fontSize: this.state.fontSize + "pt",
                padding: this.state.padding + "pt",
                borderStyle: "solid",
                backgroundColor: this.state.backgroundColor,
                borderColor: this.state.borderColor,
                borderRadius: this.state.borderRadius + "pt",
                borderWidth: this.state.borderWidth + "pt",
                margin: this.state.margin + "pt"
            }
        }
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link to="/">Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="panel-body">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-sm-">
                                        <form onSubmit={e => {
                                            e.preventDefault();
                                            addLogo({ variables: { text: text.value, color: color.value,
                                                backgroundColor: backgroundColor.value, borderColor: borderColor.value, 
                                                fontSize: parseInt(fontSize.value), borderRadius: parseInt(borderRadius.value),
                                                borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value),
                                                margin: parseInt(margin.value) } });
                                                text.value = "";
                                                color.value = "";
                                                backgroundColor = "";
                                                borderColor = "";
                                                fontSize.value = "";
                                                borderRadius.value = "";
                                                borderWidth.value = "";
                                                padding.value = "";
                                                margin.value = "";
                                        }}>
                                            <div className="form-group">
                                                <label htmlFor="text">Text:</label>
                                                <input type="text" className="form-control" name="text" ref={node => {
                                                    text = node;
                                                }} placeholder="Text"  onChange={this.changeText} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="color">Color:</label>
                                                <input type="color" className="form-control" name="color" ref={node => {
                                                    color = node;
                                                }} placeholder="Color"  onChange={this.changeTextColor} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="backgroundColor">Background Color:</label>
                                                <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                    backgroundColor = node;
                                                }} placeholder="Color"  onChange={this.changeBackground} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="borderColor">Border Color:</label>
                                                <input type="color" className="form-control" name="borderColor" ref={node => {
                                                    borderColor = node;
                                                }} placeholder="Color"  onChange={this.changeBorderColor} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="fontSize">Font Size:</label>
                                                <input type="number" min="2" max="144" className="form-control" name="fontSize" ref={node => {
                                                    fontSize = node;
                                                }} placeholder="Font Size"  onChange={this.changeFontSize} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="borderRadius">Border Radius:</label>
                                                <input type="number" min="2" max="100" className="form-control" name="borderRadius" ref={node => {
                                                    borderRadius = node;
                                                }} placeholder="Border Radius"  onChange={this.changeBorderRadius} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="borderWidth">Border Width:</label>
                                                <input type="number" min="2" max="144" className="form-control" name="borderWidth" ref={node => {
                                                    borderWidth = node;
                                                }} placeholder="Border Width"  onChange={this.changeBorderWidth} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="padding">Padding:</label>
                                                <input type="number" min="2" max="144" className="form-control" name="padding" ref={node => {
                                                    padding = node;
                                                }} placeholder="Padding" onChange={this.changePadding} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="margin">Margin:</label>
                                                <input type="number" min="2" max="144" className="form-control" name="margin" ref={node => {
                                                    margin = node;
                                                }} placeholder="Margin"  onChange={this.changeMargin} />
                                            </div>
                                            <Link to="/" className="btn btn-secondary">Cancel</Link>&nbsp;&nbsp;
                                            <button type="submit" className="btn btn-success">Submit</button>
                                        </form>
                                        </div>
                                            <div class="col"> 
                                                <div style={styles.container}> {this.state.text}   </div>
                                            </div>
                                    </div>
                                </div>
                                
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;