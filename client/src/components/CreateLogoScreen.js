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

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
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
                                                }} placeholder="Text" defaultValue="GologoLo"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="color">Color:</label>
                                                <input type="color" className="form-control" name="color" ref={node => {
                                                    color = node;
                                                }} placeholder="Color" defaultValue="#aaaaaa"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="backgroundColor">Background Color:</label>
                                                <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                    backgroundColor = node;
                                                }} placeholder="Color" defaultValue="#bbbbbb"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="borderColor">Border Color:</label>
                                                <input type="color" className="form-control" name="borderColor" ref={node => {
                                                    borderColor = node;
                                                }} placeholder="Color" defaultValue="#ffffff" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="fontSize">Font Size:</label>
                                                <input type="number" min="2" max="144" className="form-control" name="fontSize" ref={node => {
                                                    fontSize = node;
                                                }} placeholder="Font Size" defaultValue="50"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="borderRadius">Border Radius:</label>
                                                <input type="number" min="2" max="100" className="form-control" name="borderRadius" ref={node => {
                                                    borderRadius = node;
                                                }} placeholder="Border Radius" defaultValue="10" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="borderWidth">Border Width:</label>
                                                <input type="number" min="2" max="144" className="form-control" name="borderWidth" ref={node => {
                                                    borderWidth = node;
                                                }} placeholder="Border Width" defaultValue="10" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="padding">Padding:</label>
                                                <input type="number" min="2" max="144" className="form-control" name="padding" ref={node => {
                                                    padding = node;
                                                }} placeholder="Padding" defaultValue="10" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="margin">Margin:</label>
                                                <input type="number" min="2" max="144" className="form-control" name="margin" ref={node => {
                                                    margin = node;
                                                }} placeholder="Margin" defaultValue="10" />
                                            </div>
                                            <button type="submit" className="btn btn-success">Submit</button>
                                        </form>
                                        </div>
                                        <div class="col">Hello</div>
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