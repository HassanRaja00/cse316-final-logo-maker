import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $backgroundColor: String!,
        $borderColor: String!
        $fontSize: Int!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                fontSize: $fontSize,
                borderRadius: $borderRadius, 
                borderWidth: $borderWidth, 
                padding: $padding, 
                margin: $margin ) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {
    constructor(props) {
        super(props);

        //make a state to manage the css variables
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

    //this method sets the initial state
    setLogo(text, color, bckcolor, brdcolor, font, br, bw, pad, marg){
        this.setState( {
            text: text,
            color: color,
            backgroundColor: bckcolor,
            borderColor: brdcolor,
            fontSize: font,
            borderRadius: br,
            borderWidth: bw,
            padding: pad,
            margin: marg
        } );
    }


    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if(this.state.text === ""){
                        this.setLogo(data.logo.text, data.logo.color, data.logo.backgroundColor, data.logo.borderColor, data.logo.fontSize,
                            data.logo.borderRadius, data.logo.borderWidth, data.logo.padding, data.logo.margin);
                    }

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
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/view/${data.logo._id}`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/">Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="panel-body">
                                        <div class="container-fluid">
                                                    <div class="row">
                                                        <div class="col-sm-">
                                                        <form onSubmit={e => {
                                                                e.preventDefault();
                                                                updateLogo({ variables: { id: data.logo._id, text: text.value, color: color.value,
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
                                                                    }} placeholder="Text" defaultValue={data.logo.text} onChange={this.changeText} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="color">Color:</label>
                                                                    <input type="color" className="form-control" name="color" ref={node => {
                                                                        color = node;
                                                                    }} placeholder="Color" defaultValue={data.logo.color} onChange={this.changeTextColor} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                                        backgroundColor = node;
                                                                    }} placeholder="Color" defaultValue={data.logo.backgroundColor} onChange={this.changeBackground} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="borderColor">Border Color:</label>
                                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                                        borderColor = node;
                                                                    }} placeholder="Color" defaultValue={data.logo.borderColor} onChange={this.changeBorderColor} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="fontSize">Font Size:</label>
                                                                    <input type="number" min="2" max="144" className="form-control" name="fontSize" ref={node => {
                                                                        fontSize = node;
                                                                    }} placeholder="Font Size" defaultValue={data.logo.fontSize} onChange={this.changeFontSize}/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                                    <input type="number" min="2" max="100" className="form-control" name="borderRadius" ref={node => {
                                                                        borderRadius = node;
                                                                    }} placeholder="Border Radius" defaultValue={data.logo.borderRadius} onChange={this.changeBorderRadius} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                                    <input type="number" min="2" max="144" className="form-control" name="borderWidth" ref={node => {
                                                                        borderWidth = node;
                                                                    }} placeholder="Border Width" defaultValue={data.logo.borderWidth} onChange={this.changeBorderWidth} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="padding">Padding:</label>
                                                                    <input type="number" min="2" max="144" className="form-control" name="padding" ref={node => {
                                                                        padding = node;
                                                                    }} placeholder="Padding" defaultValue={data.logo.padding} onChange={this.changePadding}/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="margin">Margin:</label>
                                                                    <input type="number" min="2" max="144" className="form-control" name="margin" ref={node => {
                                                                        margin = node;
                                                                    }} placeholder="Margin" defaultValue={data.logo.margin} onChange={this.changeMargin} />
                                                                </div>
                                                                
                                                                <Link to={`/view/${data.logo._id}`} className="btn btn-secondary">Cancel</Link>&nbsp;&nbsp;
                                                                <button type="submit" className="btn btn-success">Submit</button>
                                                                
                                                            </form>
                                                        </div>
                                                        <div class="col"> 
                                                            <div style={styles.container}>
                                                                {this.state.text} 
                                                            </div>
                                                        
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
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;