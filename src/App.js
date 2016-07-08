import React, {Component} from 'react';
import TextTruncate from './TextTruncate';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ',
            line: 2,
            truncateText: '…',
            showTitle: true,
            appendTextTruncateChild: true
        };
    }

    handleChange = (e) => {
        this.setState({
            line: this.refs.line.value << 0,
            text: this.refs.text.value,
            truncateText: this.refs.truncateText.value,
            showTitle: this.refs.showTitle.checked,
            appendTextTruncateChild: this.refs.appendTextTruncateChild.checked
        });
    };

    onToggle = (e) => {
        var display = this.refs.invisibleBlock.style.display;
        this.refs.invisibleBlock.style.display = display === 'none' ? 'block' : 'none';
        this.refs.invisibleTextTruncate.update();
    };

    render() {
        const {
            appendTextTruncateChild,
            ...props
        } = this.state;

        if (appendTextTruncateChild) {
            props.showMoreText = "Read On";
        }

        props.showAllText = false;
        props.showLessText = "Show less";
        props.onShowMoreClick = () => console.log('click');
        props.onShowLessClick = () => console.log('click');
        props.onActualHeight = (height) => console.log(height);

        return (
            <div className='row'>
                <div className='col-md-6 col-xs-12'>
                    <div className='form-group'>
                        <label htmlFor='line'>Line</label>
                        <input className='form-control' id='line' ref='line' onChange={this.handleChange} type='number' value={this.state.line} min={1} required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='text'>Text</label>
                        <textarea className='form-control' id='text' ref='text' onChange={this.handleChange} rows={5} value={this.state.text}></textarea>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='truncateText'>TruncateText</label>
                        <input className='form-control' id='truncateText' ref='truncateText' onChange={this.handleChange} type='text' value={this.state.truncateText}/>
                    </div>
                    <div className='checkbox'>
                        <label htmlFor='showTitle'>
                            <input id='showTitle' ref='showTitle' onChange={this.handleChange} type='checkbox' checked={this.state.showTitle}/>Show title
                        </label>
                    </div>
                    <div className='checkbox'>
                        <label htmlFor='appendTextTruncateChild'>
                            <input id='appendTextTruncateChild' ref='appendTextTruncateChild' onChange={this.handleChange} type='checkbox' checked={this.state.appendTextTruncateChild}/>Append TextTruncate child
                        </label>
                    </div>
                </div>
                <div className='col-md-6 col-xs-12'>
                    <h4>Result</h4>
                    <div id='sample-1'>
                        <h5>1. Default</h5>
                        <TextTruncate {...props}/>
                    </div>
                    <div id='sample-2'>
                        <h5>2. With floating image</h5>
                        <div className='media'>
                            <div className='media-left'>
                                <img className='media-object' src='http://fakeimg.pl/64' width='64' height='64'/>
                            </div>
                            <div className='media-body'>
                                <TextTruncate {...props}/>
                            </div>
                        </div>
                    </div>
                    <div id='sample-3'>
                        <h5>3. Default hidden</h5>
                        <div ref='invisibleBlock' style={{display: 'none'}}>
                            <TextTruncate  ref='invisibleTextTruncate' {...props}/>
                        </div>
                        <button type='button' className='btn btn-default' onClick={this.onToggle}>Toggle show/hide</button>
                    </div>
                    <div id='sample-4'>
                        <h5>4. Customize class</h5>
                        <TextTruncate {...props} containerClassName='text-danger'/>
                    </div>
                </div>
            </div>
        )
    }
}
