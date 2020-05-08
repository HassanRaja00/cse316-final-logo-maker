import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
    query getLogo($logoId: String) {
        getLogo(id: $logoId) {
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
            isEmpty: true,
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
        if(event.target.value === "" || !event.target.value.replace(/\s/g, '').length){
            this.setState( {text: event.target.value, isEmpty: true} );
        } else {
            let newstr = event.target.value.replace(/ /g, "\u00a0");
            this.setState( {text: newstr, isEmpty: false} );
        }
    }

    changeTextColor = (event) => {
        this.setState( {color: event.target.value} );
        // console.log("changed text color: " + event.target.value);
    }

    changeBackground = (event) => {
        this.setState( {backgroundColor: event.target.value} );
        // console.log('new background: ' + event.target.value);
    }

    changeBorderColor = (event) => {
        this.setState( {borderColor: event.target.value} );
        // console.log('new border color: ' + event.target.value);
    }

    changeFontSize = (event) => {
        this.setState( {fontSize: event.target.value });
        // console.log('new font size: ' + event.target.value);
    }

    changeBorderRadius = (event) => {
        this.setState( {borderRadius: event.target.value} );
        // console.log('new BR: ' + event.target.value);
    }

    changeBorderWidth = (event) => {
        this.setState( {borderWidth: event.target.value} );
        // console.log('new BW: ' + event.target.value);
    }

    changePadding = (event) => {
        this.setState( {padding: event.target.value} );
        // console.log('new padding: ' + event.target.value);
    }

    changeMargin = (event) => {
        this.setState( {margin: event.target.value} );
        // console.log('new margin: ' + event.target.value);
    }

    //this method sets the initial state
    setLogo(text, color, bckcolor, brdcolor, font, br, bw, pad, marg){
        this.setState( {
            text: text,
            isEmpty: false,
            color: color,
            backgroundColor: bckcolor,
            borderColor: brdcolor,
            fontSize: font,
            borderRadius: br,
            borderWidth: bw,
            padding: pad,
            margin: marg
        } );
        console.log(this.state);
    }


    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        return (
            <Query pollInterval={500} fetchPolicy={"network-only"} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if(this.state.isEmpty){
                        console.log(data.getLogo.text, data.getLogo.color, data.getLogo.backgroundColor, data.getLogo.borderColor, data.getLogo.fontSize,
                            data.getLogo.borderRadius, data.getLogo.borderWidth, data.getLogo.padding, data.getLogo.margin);
                        this.setLogo(data.getLogo.text, data.getLogo.color, data.getLogo.backgroundColor, data.getLogo.borderColor, data.getLogo.fontSize,
                            data.getLogo.borderRadius, data.getLogo.borderWidth, data.getLogo.padding, data.getLogo.margin);
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
                        <Mutation mutation={UPDATE_LOGO} key={data.getLogo._id} onCompleted={() => this.props.history.push(`/`)}>
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
                                        <div className="container-fluid">
                                                    <div className="row">
                                                        <div className="col-sm-">
                                                        <form onSubmit={e => {
                                                                e.preventDefault();
                                                                updateLogo({ variables: { id: data.getLogo._id, text: text.value, color: color.value,
                                                                    backgroundColor: backgroundColor.value, borderColor: borderColor.value, 
                                                                    fontSize: parseInt(fontSize.value), borderRadius: parseInt(borderRadius.value),
                                                                    borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value),
                                                                    margin: parseInt(margin.value) } });
                                                                text.value = "";
                                                                //console.log("before colors")
                                                                color.value = "";
                                                                backgroundColor = "";
                                                                borderColor = "";
                                                                //console.log('after colors')
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
                                                                    }} placeholder="Text" defaultValue={data.getLogo.text} onChange={this.changeText} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="color">Color:</label>
                                                                    <input type="color" className="form-control" name="color" ref={node => {
                                                                        color = node;
                                                                    }} placeholder="Color" defaultValue={data.getLogo.color} onChange={this.changeTextColor} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                                        backgroundColor = node;
                                                                    }} placeholder="Color" defaultValue={data.getLogo.backgroundColor} onChange={this.changeBackground} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="borderColor">Border Color:</label>
                                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                                        borderColor = node;
                                                                    }} placeholder="Color" defaultValue={data.getLogo.borderColor} onChange={this.changeBorderColor} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="fontSize">Font Size:</label>
                                                                    <span>  {this.state.fontSize} </span>
                                                                    <input type="range" min="2" max="144" className="form-control-range" name="fontSize" ref={node => {
                                                                        fontSize = node;
                                                                    }} placeholder="Font Size" defaultValue={data.getLogo.fontSize} onChange={this.changeFontSize}/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                                    <span> {this.state.borderRadius} </span>
                                                                    <input type="range" min="2" max="100" className="form-control-range" name="borderRadius" ref={node => {
                                                                        borderRadius = node;
                                                                    }} placeholder="Border Radius" defaultValue={data.getLogo.borderRadius} onChange={this.changeBorderRadius} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                                    <span> {this.state.borderWidth} </span>
                                                                    <input type="range" min="2" max="144" className="form-control-range" name="borderWidth" ref={node => {
                                                                        borderWidth = node;
                                                                    }} placeholder="Border Width" defaultValue={data.getLogo.borderWidth} onChange={this.changeBorderWidth} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="padding">Padding:</label>
                                                                    <span> {this.state.padding} </span>
                                                                    <input type="range" min="2" max="144" className="form-control-range" name="padding" ref={node => {
                                                                        padding = node;
                                                                    }} placeholder="Padding" defaultValue={data.getLogo.padding} onChange={this.changePadding}/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="margin">Margin:</label>
                                                                    <span> {this.state.margin} </span>
                                                                    <input type="range" min="2" max="144" className="form-control-range" name="margin" ref={node => {
                                                                        margin = node;
                                                                    }} placeholder="Margin" defaultValue={data.getLogo.margin} onChange={this.changeMargin} />
                                                                </div>
                                                                
                                                                <Link to='/' className="btn btn-secondary">Cancel</Link>&nbsp;&nbsp;
                                                                <button type="submit" className="btn btn-success" disabled={this.state.text === ''} >Submit</button>
                                                                
                                                            </form>
                                                        </div>
                                                        <div className="col"> 
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