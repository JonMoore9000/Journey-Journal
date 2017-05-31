import React from 'react';
import { connect } from 'react-redux';
import {savePlace} from '../actions';
import {saveData} from '../actions';

class AddForm extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    placeText: '',
    timeText: '',
    noteText: '',
  };
}

render() {
 return(
  <form className="form">
   <h4>Add a Memory</h4><br></br>
    <p className="add-info">Keep track of all the fun and amazing places you
    have been.</p>
     <input  type="text" name="place" placeholder="place" ref={input => {this.textPlace = input}}></input><br></br>
    <input type="text" placeholder="time" ref={input => {this.textDate = input}}></input><br>
    </br>
    <input  className="notes" placeholder="notes" ref={input => {this.textNotes = input}}></input><br></br>
    <button className="save" type="button" onClick=
    {this.handleSave.bind(this)}>Save</button>
  </form>
 );
}
 handleSave() {
  const thePlace = this.textPlace.value;
  const theDate = this.textDate.value;
  const theNotes = this.textNotes.value;
  //this.props.savePlace(thePlace, theDate, theNotes);
  this.props.saveData(thePlace, theDate, theNotes);
 }
}
export default connect(null, { saveData })(AddForm);
