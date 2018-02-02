import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import TextEditorSubmit from '../../TextEditorSubmit';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import InteractiveElement from '../../InteractiveElement';

export default class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: createEditorStateWithText(props.initialText),
      editorStateCopy: createEditorStateWithText(props.initialText),
    };

    this.onChange = (editorState) => {
      this.setState({
        editorState,
      });
    };

    this.focus = () => {
      this.editor.focus();
    };

    this.submit = () => {
      // set our primary state and copied state to match
      this.setState({ editorStateCopy: this.state.editorState });
      this.props.onSubmitText(this.state.editorState.getCurrentContent().getPlainText());
    };

    this.cancel = () => {
      // reset our state back to a copy we made when we rendered
      this.setState({
        editorState: this.state.editorStateCopy,
      });
      this.props.cancel();
    };
  }

  render() {
    const { readOnly } = this.props;
    return (
      <div>
        <InteractiveElement
          type="div"
          role="textbox"
          className={readOnly ? '' : 'editor'}
          onClick={this.focus}
        >
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            ref={(element) => { this.editor = element; }}
            readOnly={readOnly}
          />
        </InteractiveElement>
        {
          readOnly ?
          null :
          <TextEditorSubmit submit={this.submit} cancel={this.cancel} />
        }
      </div>
    );
  }
}

TextEditor.propTypes = {
  readOnly: PropTypes.bool,
  initialText: PropTypes.string,
  onSubmitText: PropTypes.func.isRequired,
  cancel: PropTypes.func,
};

TextEditor.defaultProps = {
  readOnly: false,
  initialText: '',
  cancel: EMPTY_FUNCTION,
};