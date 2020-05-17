import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth-control';
import { Rnd } from 'react-rnd';

const ADD_LOGO = gql`
    mutation AddLogo(
        $height: Int!,
        $width: Int!,
        $text: [logoTextInput]!,
        $backgroundColor: String!,
        $borderColor: String!
        $borderRadius: Int!,
        $borderWidth: Int!,
        $images: [String]!,
        $padding: Int!,
        $margin: Int! ) {
        addLogo(
            height: $height,
            width: $width,
            text: $text,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderRadius: $borderRadius, 
            borderWidth: $borderWidth, 
            images: $images,
            padding: $padding, 
            margin: $margin ) {
            _id
            created_by{
                username
            }
        }
    }
`;

class CreateLogoScreen extends Component {
    constructor(props) {
        super(props);

        //make state to manage css variables and text
        this.state = {
            height: '',
            width: '',
            text: [],
            isEmpty: true,
            backgroundColor: "",
            borderColor: "",
            borderRadius: "",
            borderWidth: "",
            images: [],
            padding: "",
            margin: "",
            focused: null
        }
    }

    static contextType = AuthContext;


    //changes text color
    changeTextColor = (event) => {
        let focus = this.state.focused;
        let newtxt = this.state.text;
        for (let txt of newtxt){
            if(txt.textString === focus.textString){
                console.log(txt.textString);
                txt.textColor = event.target.value;
            }
        }
        this.setState( {focused: focus, text: newtxt} );
    }

    changeBackground = (event) => {
        this.setState( {backgroundColor: event.target.value} );
    }

    changeBorderColor = (event) => {
        console.log("changed border color");
        this.setState( {borderColor: event.target.value} );
    }

    changeFontSize = (event) => {
        let focus = this.state.focused;
        let newtxt = this.state.text;
        for (let txt of newtxt){
            if(txt.textString === focus.textString){
                txt.textFontSize = parseInt(event.target.value);
            }
        }
        this.setState( {focused: focus, text: newtxt});
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

    addText = (text) => {
        console.log('adding text create');
        let textObject = {
            posX: 10,
            posY: 10,
            textString: text,
            textFontSize: 20,
            textColor: "#000000"
        }
        if(this.state.text){
            let textArray = this.state.text;
            textArray.push(textObject);
            this.setState( {text: textArray} );
        } else{
            let textArray = [];
            textArray.push(textObject);
            this.setState( {text: textArray} );
        } 
    }

    removeText = (text) => {
        console.log('removing text create');
        if(this.state.text){
            let textArray = this.state.text;
            textArray = textArray.filter( textObject => {
                return textObject.textString !== text;
            });
            if(textArray !== this.state.text){ //if the array is not the same after filtering, set the state
                this.setState( {text: textArray} );
            } else{ //if array is the same, notify user
                return <p>The text entered does not exist</p>
            }
        }
    }

    addImage = (url) => {
        console.log('adding image create');
        console.log(url);
        if(this.state.images){
            let imgArray = this.state.images;
            imgArray.push(url);
            this.setState( {images: imgArray} );
        } else{
            let imgArray = [];
            imgArray.push(url);
            this.setState( {images: imgArray} );
        }
    }

    removeImage = (url) => {
        console.log('removing image create');
        console.log(url);
        if(this.state.images){
            let imgArray = this.state.images;
            imgArray = imgArray.filter( imgurl => {
                return imgurl !== url;
            });
            if(imgArray !== this.state.images) {
                this.setState( {images: imgArray} );
            } else {
                return <p>The url entered does not exist</p>
            }
        }
    }

    changeLogoHeight = (event) => {
        this.setState( { height: event.target.value } );
    }

    changeLogoWidth = (event) => {
        this.setState( { width: event.target.value } );
    }

    changeFocusedState = (index) => {
        this.setState( {focused: this.state.text[index]} );
    }

    updateTextPosition = (index, newX, newY) => {
        let textPiece = this.state.text[index];
        textPiece.posX = newX;
        textPiece.posY = newY;
        let newtxt = this.state.text;
        newtxt[index].posX = parseInt(newX);
        newtxt[index].posY = parseInt(newY); 
        this.setState( {focused: textPiece, text: newtxt} );
    }

    enableSubmit = () => {
        this.setState( {isEmpty: false} );
    }
    



    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        let height, width, newText, removeText, addImage, removeImage, images;
        const styles = {
            container: {
                height: this.state.height + 'px',
                width: this.state.width + 'px',
                padding: this.state.padding + "pt",
                borderStyle: "solid",
                backgroundColor: this.state.backgroundColor,
                borderColor: this.state.borderColor,
                borderRadius: this.state.borderRadius + "pt",
                borderWidth: this.state.borderWidth + "pt",
                margin: this.state.margin + "pt"
            }
        }
        console.log(this.state.text);
        console.log(this.state.images);
        if(this.state.height && this.state.width && this.state.backgroundColor && this.state.borderColor && this.state.borderRadius &&
            this.state.borderWidth && this.state.padding && this.state.margin && this.state.isEmpty){
                this.enableSubmit();
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
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-">
                                        <form onSubmit={e => {
                                            e.preventDefault();
                                            addLogo({ variables: { height:parseInt(this.state.height),
                                                width: parseInt(this.state.width),
                                                text: this.state.text,
                                                backgroundColor: backgroundColor.value, 
                                                borderColor: borderColor.value, 
                                                borderRadius: parseInt(borderRadius.value),
                                                borderWidth: parseInt(borderWidth.value), 
                                                images: this.state.images,
                                                padding: parseInt(padding.value),
                                                margin: parseInt(margin.value) } });
                                                text = "";
                                                color = "";
                                                backgroundColor = "";
                                                borderColor = "";
                                                fontSize.value = "";
                                                borderRadius.value = "";
                                                borderWidth.value = "";
                                                padding.value = "";
                                                margin.value = "";
                                        }}>
                                        
                                            {this.state.focused && <div className="form-group">
                                                <label htmlFor="color">Color:</label>
                                                <input type="color" className="form-control" name="color" ref={node => {
                                                    color = node;
                                                }} placeholder="Color" onChange={this.changeTextColor} />
                                            </div>}
                                            
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
                                                <label htmlFor="logoHeight">Logo Height:</label>
                                                <span>  {this.state.height} </span>
                                                <input type="range" min="100" max='3000' className="form-control-range" name="logoHeight" ref={node => {
                                                    height = node;
                                                }} placeholder="Height" onChange={this.changeLogoHeight}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="logoWidth">Logo Width:</label>
                                                <span>  {this.state.width} </span>
                                                <input type="range" min="100" max='3000' className="form-control-range" name="logoWidth" ref={node => {
                                                    width = node;
                                                }} placeholder="Width" onChange={this.changeLogoWidth}/>
                                            </div>
                                            {this.state.focused && <div className="form-group">
                                                <label htmlFor="fontSize">Font Size:</label>
                                                <span> {this.state.focused.textFontSize} </span>
                                                <input type="range" min="2" max="144" className="form-control-range" name="fontSize" ref={node => {
                                                    fontSize = node;
                                                }} placeholder="Font Size"  onChange={this.changeFontSize} />
                                            </div>}
                                            
                                            <div className="form-group">
                                                <label htmlFor="borderRadius">Border Radius:</label>
                                                <span> {this.state.borderRadius} </span>
                                                <input type="range" min="2" max="100" className="form-control-range" name="borderRadius" ref={node => {
                                                    borderRadius = node;
                                                }} placeholder="Border Radius"  onChange={this.changeBorderRadius} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="borderWidth">Border Width:</label>
                                                <span> {this.state.borderWidth} </span>
                                                <input type="range" min="2" max="144" className="form-control-range" name="borderWidth" ref={node => {
                                                    borderWidth = node;
                                                }} placeholder="Border Width"  onChange={this.changeBorderWidth} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="padding">Padding:</label>
                                                <span> {this.state.padding} </span>
                                                <input type="range" min="2" max="144" className="form-control-range" name="padding" ref={node => {
                                                    padding = node;
                                                }} placeholder="Padding" onChange={this.changePadding} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="margin">Margin:</label>
                                                <span> {this.state.margin} </span>
                                                <input type="range" min="2" max="144" className="form-control-range" name="margin" ref={node => {
                                                    margin = node;
                                                }} placeholder="Margin"  onChange={this.changeMargin} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="newText"> Add More Text:</label>
                                                <input type="newText" className="form-control" name="newText" ref={node => {
                                                    //  console.log(node);
                                                    newText = node;
                                                }} placeholder="New Text" onChange={(event) => newText = event.target.value} />
                                                <button type='button' className='btn btn-info' onClick={() => this.addText(newText)} >Add Text</button>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="removeText"> Remove a Text:</label>
                                                <input type="removeText" className="form-control" name="removeText" ref={node => {
                                                    removeText = node;
                                                }} placeholder="Name Of Text To Remove" onChange={(event) => removeText = event.target.value} />
                                                <button type='button' className='btn btn-warning' onClick={() => this.removeText(removeText)} >Remove Text</button>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="addImage"> Add an Image URL:</label>
                                                <input type="url" className="form-control" name="addImage" ref={node => {
                                                    addImage = node;
                                                }} placeholder="Image URL here" onChange={(event) => addImage = event.target.value} />
                                                <button type='button' className='btn btn-info' onClick={() => this.addImage(addImage)} >Insert Image</button>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="removeImage"> Remove an Image:</label>
                                                <input type="removeImage" className="form-control" name="removeImage" ref={node => {
                                                    removeImage = node;
                                                }} placeholder="Img URL here" onChange={(event) => removeImage = event.target.value} />
                                                <button type='button' className='btn btn-warning' onClick={() => this.removeImage(removeImage)} >Remove Image</button>
                                            </div>

                                            <Link to="/" className="btn btn-secondary">Cancel</Link>&nbsp;&nbsp;
                                            <button type="submit" className="btn btn-success" disabled={this.state.isEmpty}>Submit</button>
                                        </form>
                                        </div>
                                            <div className="col"> 
                                                <div style={styles.container}> 
                                                     {this.state.text && this.state.text.map( (str, index) => <Rnd key={index} onDragStart={() => this.changeFocusedState(index)}
                                                        onDragStop={(event, destination) => this.updateTextPosition(index, destination.x, destination.y) } bounds='parent' 
                                                        style={{fontSize: str.textFontSize, color: str.textColor}} default={{x: str.posX, y: str.posY}}>{str.textString}</Rnd> )}

                                                    {this.state.images && this.state.images.map((img, index) => <Rnd key={index}  bounds='parent' 
                                                        style={{backgroundImage: `url(${img})`, backgroundSize: 'cover'}} default={{x: 50, y:0, height: '30%', width:'30%'}} >  </Rnd>)}
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
    }
}

export default CreateLogoScreen;